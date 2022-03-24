import { boardService } from '../../services/board-service.js'
import { utilService } from '../../services/util-service.js'
export const boardStore = {
  strict: true,
  state: {
    boards: [],
    currBoard: {},
    currTask: {},
  },
  getters: {
    boards(state) {
      // console.log(state.boards)
      return JSON.parse(JSON.stringify(state.boards))
    },
    currBoard(state) {
      return JSON.parse(JSON.stringify(state.currBoard));
    },
    currTask(state) {
      return JSON.parse(JSON.stringify(state.currTask));
    },
  },
  mutations: {
    // GROUP
    setCurrGroup() { },
    removeGroup() { },

    // !not in use
    addGroupToBoard({ state }, { boardToUpdate }) {
      const idx = state.boards.findIndex(
        (board) => board._id === boardToUpdate._id
      );
      state.boards.splice(idx, 1, boardToUpdate);
    },

    // BOARD
    setBoards(state, { boards }) {
      state.boards = boards
      // console.log('setboard:', state.boards)
    },
    removeBoard(state, { _id }) {
      const idx = state.boards.findIndex((board) => board._id === _id);
      state.boards.splice(idx, 1);
    },
    saveBoard(state, { savedBoard }) {
      const idx = state.boards.findIndex(
        (board) => board._id === savedBoard._id
      );
      if (idx !== -1) state.boards.splice(idx, 1, savedBoard);
      else state.boards.unshift(savedBoard);
    },
    setCurrBoard(state, { board }) {
      state.currBoard = board;
      console.log(state.currBoard);
    },

    setCurrTask(state, { task }) {
      state.currTask = task
      // console.log(state.currTask)
    },

  },
  actions: {
    // BOARDS
    async loadBoards({ commit, state }) {
      try {
        commit({
          type: 'setIsLoading',
          isLoading: true,
        });
        const boards = await boardService.query();
        commit({
          type: 'setBoards',
          boards,
        });
        commit({
          type: 'setIsLoading',
          isLoading: false,
        });
      } catch {
        commit({
          type: 'setIsError',
          isError: true,
        });
      }
    },
    async removeBoard({ commit }, { _id }) {
      try {
        await boardService.remove(_id);
        commit(payload);
      } catch {
        console.log('Couldnt remove board');
        commit({
          type: 'setIsError',
          isError: true,
        });
      }
    },
    async saveBoard({ dispatch }, { board }) {
      try {
        await boardService.save(board);
        dispatch('loadBoards');
      } catch (err) {
        console.log("Couldn't save board", err);
        commit({
          type: 'setIsError',
          isError: true,
        });
      }
    },
    async getBoardById({ commit }, { boardId }) {
      try {
        let board = await boardService.getById(boardId)
        board = JSON.parse(JSON.stringify(board))
        commit({ type: 'setCurrBoard', board })
      } catch (err) {
        console.log('', err);
        commit({
          type: 'setIsError',
          isError: true,
        });
      }
    },

    // GROUP

    async addGroup({ commit }, { board }) {
      try {
        // update model
        board = JSON.parse(JSON.stringify(board))
        let emptyGroup = boardService.getEmptyGroup()

        board.groups.push(emptyGroup)
        await boardService.save(board)
        commit({ type: 'setCurrBoard', board })
      } catch (error) {
        console.log('error during adding group to board', error)
      }
    },

    async duplicateGroup({ dispatch, state, commit }, { groupId }) {
      try {
        const board = await boardService.getById(state.currBoard._id)
        var toDuplicate = board.groups.find((group) => group.id === groupId)
        const idx = board.groups.findIndex((group) => group.id === groupId)
        var emptyGroup = boardService.getEmptyGroup()
        emptyGroup = JSON.parse(JSON.stringify(toDuplicate))
        emptyGroup.id = utilService.makeId()
        board.groups.splice(idx, 0, emptyGroup)

        const updatedBoard = await boardService.save(board)
        dispatch({
          type: 'saveBoard',
          board: JSON.parse(JSON.stringify(updatedBoard)),
        })
        commit({ type: 'setCurrBoard', board: updatedBoard })
      } catch (error) {
        console.log('problem with duplicating board', error)
      }
    },

    async removeGroup({ dispatch, state, commit }, { groupId }) {
      console.log('group id :', groupId, 'currBoard:', state.currBoard)

      try {
        const board = await boardService.getById(state.currBoard._id)
        const idx = board.groups.findIndex((group) => group.id === groupId)
        board.groups.splice(idx, 1)

        const savedBoard = await boardService.save(board)

        dispatch({
          type: 'saveBoard',
          board: JSON.parse(JSON.stringify(savedBoard)),
        })
        commit({ type: 'setCurrBoard', board })
      } catch (error) {
        console.log('problem removing board', error)
      }
    },

    async updateGroup({ commit, state }, { groupToUpdate }) {
      try {
        const board = JSON.parse(JSON.stringify(state.currBoard))
        const idx = board.groups.findIndex(boardGroup => boardGroup.id === groupToUpdate.id)
        if (idx === -1) {
          board.groups.push(groupToUpdate)
        }
        else {
          board.groups.splice(idx, 1, groupToUpdate)
        }
        await boardService.save(board)
        commit({ type: 'setCurrBoard', board })
      }
      catch (err) {
        console.log('Problem with saving group', err)
      }
    },
    //TASK

    async addTask({ commit }, { board, groupId }) {
      console.log('add task', board, groupId)
      try {
        // update model
        board = JSON.parse(JSON.stringify(board))
        const len = board.groups[groupId].tasks.push(boardService.getEmptyTask())
        const task = board.groups[groupId].tasks[len - 1]
        await boardService.save(board)
        commit({ type: 'setCurrBoard', board })
        state.currTask = task
        console.log(state.currTask)
      }
      catch (error) {
        console.log('error during adding group to board', error)
      }
    },

    async findTask({commit}, { boardId, taskId }) {
      try {

      let board = await boardService.getById(boardId);
      board = JSON.parse(JSON.stringify(board))
      const group = board.groups.find(group =>
        group.tasks.find(task => task.id === taskId)
      );
      const task = group.tasks.find(task => task.id === taskId)
      commit({type: 'setCurrTask', task})
      }
      catch(err){
        console.log('error finding task', err);
      }
    },

    async saveTaskUpdate({ dispatch }, { updateText }) {
      try {
        await boardService.save(updateText);
        dispatch('loadBoards');
      } catch (err) {
        console.log('Couldnt save board', err);
        commit({
          type: 'setIsError',
          isError: true,
        });
      }
    },


  },
};
