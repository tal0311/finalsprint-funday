import { boardService } from '../../services/board-service.js'
import { utilService } from '../../services/util-service.js'
export const boardStore = {
  strict: true,
  state: {
    boards: [],
    currBoard: {},
    currGroup: {},
    currTask: {},
    taskToShow: null,
  },
  getters: {
    boards(state) {
      return JSON.parse(JSON.stringify(state.boards))
    },
    currBoard(state) {
      return JSON.parse(JSON.stringify(state.currBoard))
    },
    currTask(state) {
      return JSON.parse(JSON.stringify(state.currTask))
    },
    taskToShow(state) {
      return JSON.parse(JSON.stringify(state.taskToShow))
    },
  },
  mutations: {
    // GROUP

    updateBoard({ currBoard }, { group, task }) {
      console.log('update Board:', task)
      var newGroup = JSON.parse(JSON.stringify(group))
      const groupIdx = currBoard.groups.findIndex((g) => g.id === group.id)

      if (group && !task) {
        console.log('updating group')

        currBoard.groups.splice(groupIdx, 1, newGroup)
        //  setCurrBoardboard
      }
      if (task) {
        console.log('updating task')
        const taskIdx = newGroup.tasks.findIndex((t) => t.id == task.id)
        newGroup.tasks.splice(taskIdx, 1, task)
        console.log(group.tasks)

        // setCurrBoard
      }

      currBoard.groups.splice(groupIdx, 1, newGroup)

      console.log(currBoard)
    },
    // !not in use
    addGroupToBoard({ state }, { boardToUpdate }) {
      const idx = state.boards.findIndex(
        (board) => board._id === boardToUpdate._id
      )
      state.boards.splice(idx, 1, boardToUpdate)
    },
    updateGroupAfterDnd(state, { updatedGroup }) {
      const idx = state.currBoard.groups.findIndex(
        (grp) => grp.id === updatedGroup.id
      )
      state.currBoard.groups.splice(idx, 1, updatedGroup)
    },
    // TASK
    taskFromBoard(state, { taskId }) {
      return state.currBoard.groups.tasks.filter((task) => task.id === taskId)
    },

    // BOARD
    setBoards(state, { boards }) {
      state.boards = boards
      // console.log('setboard:', state.boards)
    },
    removeBoard(state, { boardId }) {
      const idx = state.boards.findIndex((board) => board._id === boardId)
      state.boards.splice(idx, 1)
    },
    saveBoard(state, { savedBoard }) {
      const idx = state.boards.findIndex(
        (board) => board._id === savedBoard._id
      )
      if (idx !== -1) state.boards.splice(idx, 1, savedBoard)
      else state.boards.unshift(savedBoard)
    },
    setCurrBoard(state, { board }) {
      state.currBoard = board
    },

    setCurrTask(state, { task }) {
      state.currTask = task
      // console.log(state.currTask)
    },
    setTaskToShow(state, { task }) {
      state.taskToShow = task
    },
  },
  actions: {
    // BOARDS
    async loadBoards({ commit, state }) {
      try {
        commit({
          type: 'setIsLoading',
          isLoading: true,
        })
        const boards = await boardService.query()
        commit({
          type: 'setBoards',
          boards,
        })
        commit({
          type: 'setIsLoading',
          isLoading: false,
        })
      } catch {
        commit({
          type: 'setIsError',
          isError: true,
        })
      }
    },
    async addBoard({ commit }, { value, boards }) {
      try {
        // update model
        let boardToAdd = boardService.getEmptyBoard()
        boardToAdd.title = value
        const addedBoard = await boardService.save(boardToAdd)
        const newBoards = JSON.parse(JSON.stringify(boards))
        console.log('boards', boards)
        if (addedBoard) boards.push(addedBoard)
        commit({ type: 'setBoards', boards })
        // dispatch({ type: 'loadBoards' });
        commit({ type: 'setCurrBoard', board: boardToAdd })
      } catch (err) {
        console.log('error during adding board', err)
      }
    },
    // !here
    async removeBoard({ dispatch, commit }, { boardId }) {
      try {
        // const newBoards = JSON.parse(JSON.stringify(boards))
        commit({ type: 'removeBoard', boardId })
        await boardService.remove(boardId)
        // commit({type: 'setBoards', boards: newBoards})
        dispatch({ type: 'loadBoards' })
      } catch (err) {
        console.log('error during removing board', err)
      }
    },
    // !here
    async saveBoard({ dispatch, commit }, { board }) {
      try {
        await boardService.save(board)

        // !
        dispatch({ type: 'loadBoards' })
        commit({ type: 'setCurrBoard', board })
      } catch (err) {
        console.log("Couldn't save board", err)
        commit({
          type: 'setIsError',
          isError: true,
        })
      }
    },
    // !here
    async getBoardById({ commit }, { boardId }) {
      try {
        let board = await boardService.getById(boardId)
        board = JSON.parse(JSON.stringify(board))
        commit({ type: 'setCurrBoard', board })
      } catch (err) {
        console.log('', err)
        commit({
          type: 'setIsError',
          isError: true,
        })
      }
    },

    // GROUP

    // !here
    async addGroup({ commit }, { board }) {
      try {
        // update model
        board = JSON.parse(JSON.stringify(board))
        let emptyGroup = boardService.getEmptyGroup()
        emptyGroup.tasks.push(boardService.getEmptyTask())

        board.groups.unshift(emptyGroup)
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
        emptyGroup.title = 'Duplicate of ' + emptyGroup.title
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
      // console.log('group id :', groupId, 'currBoard:', state.currBoard)

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
      const board = JSON.parse(JSON.stringify(state.currBoard))
      const idx = board.groups.findIndex(
        (boardGroup) => boardGroup.id === groupToUpdate.id
      )
      if (idx === -1) {
        board.groups.push(groupToUpdate)
      } else {
        board.groups.splice(idx, 1, groupToUpdate)
      }
      commit({ type: 'updateGroupAfterDnd', updatedGroup: groupToUpdate })
      try {
        const newBoard = await boardService.save(board)
        commit({ type: 'setCurrBoard', board: newBoard })
      } catch (err) {
        console.log('Problem with saving group', err)
      }
    },
    //TASK
    // !here
    async addTask({ commit }, { board, groupIdx, value }) {
      try {
        // update model
        board = JSON.parse(JSON.stringify(board))
        const len = board.groups[groupIdx].tasks.push(
          boardService.getEmptyTask(value)
        )
        const task = board.groups[groupIdx].tasks[len - 1]
        await boardService.save(board)
        commit({ type: 'setCurrBoard', board })
        commit({ type: 'setCurrTask', task })
        // state.currTask = task
        // console.log(state.currTask)
      } catch (error) {
        console.log('error during adding task to board', error)
      }
    },
    async addTaskInline({ commit }, { value, group }) {
      console.log('addinlinestore:', value, group)
    },
    // !here
    async findTask({ commit }, { boardId, taskId }) {
      try {
        let board = await boardService.getById(boardId)
        board = JSON.parse(JSON.stringify(board))
        const group = board.groups.find((group) =>
          group.tasks.find((task) => task.id === taskId)
        )
        const task = group.tasks.find((task) => task.id === taskId)
        commit({ type: 'setCurrTask', task })
        // console.log('{ boardId: board._id, groupId: group.id, taskId: task.id }',board._id, group.id, task.id);
        return { boardId: board._id, groupId: group.id, task }
      } catch (err) {
        console.log('error finding task', err)
      }
    },
    // !here
    async updateTask({ commit }, { boardId, groupId, task }) {
      try {
        // console.log('boardId, groupId, task', boardId, groupId, task);
        // ! state.currBoard

        let board = await boardService.getById(boardId)
        // console.log(board)
        // board = JSON.parse(JSON.stringify(board))
        let gIdx = board.groups.findIndex((dbGroup) => dbGroup.id === groupId)
        const tIdx = board.groups[gIdx].tasks.findIndex(
          (dbTask) => dbTask.id === task.id
        )
        board.groups[gIdx].tasks.splice(tIdx, 1, task)
        await boardService.save(board)
        // console.log('task', task);
        // console.log(board.groups[gIdx].tasks)
        commit({ type: 'setCurrBoard', board })
      } catch (err) {
        console.log('Problem with updating task', err)
      }
      // async updateTask({ commit, state }, { group, task }) {
      //   console.log(state.currBoard)
      //   try {
      //     // var taskToUpdate = group.tasks.find((t) => t.id === task.id)
      //     // taskToUpdate = JSON.parse(JSON.stringify(taskToUpdate))
      //     // taskToUpdate = task
      //     const updatedBoard = JSON.parse(JSON.stringify(state.currBoard))
      //     const updatedGrp = updatedBoard.groups.find(
      //       (grp) => grp.id === group.id
      //     )
      //     const idx = updatedGrp.tasks.findIndex((t) => t.id === task.id)
      //     updatedGrp.tasks.splice(idx, 1, task)
      //     const newBoard = await boardService.save(updatedBoard)
      //     /// commit to update this specific board in our borad array in the state, and perhaps to update currBoard aswell
      //     console.log('taskToUpdate:', taskToUpdate, 'task:', task)

      //     // updateBoard({ state }, { group, task })
      //     commit({ type: 'updateBoard', group, task: taskToUpdate })

      //     // console.log(state.currBoard)
      //   } catch (err) {
      //     console.log('Problem with updating task', err)
      //   }
    },
    // !here
    async removeTask({ commit }, { boardId, groupId, task }) {
      try {
        let board = await boardService.getById(boardId)
        board = JSON.parse(JSON.stringify(board))
        let gIdx = board.groups.findIndex((dbGroup) => dbGroup.id === groupId)
        const tIdx = board.groups[gIdx].tasks.findIndex(
          (dbTask) => dbTask.id === task.id
        )
        board.groups[gIdx].tasks.splice(tIdx, 1)
        // console.log('gIdx, tIdx', gIdx, tIdx);
        await boardService.save(board)
        commit({ type: 'setCurrBoard', board })
      } catch (err) {
        console.log('Problem with removing task', err)
      }
    },
    async setStatus({ commit }, { status, task }) {
      task
      // task.cols.map(col => )
      try {
        const newStatus = await boardService.save()
      } catch (error) {
        console.log(error)
      }
    },
  },
}
