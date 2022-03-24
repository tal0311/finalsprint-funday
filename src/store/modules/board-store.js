import { boardService } from '../../services/board-service.js'

export const boardStore = {
  strict: true,
  state: {
    boards: [],
    currBoard: {},
    currTask: {},
  },
  getters: {
    boards(state) {
      console.log(state.boards)
      return JSON.parse(JSON.stringify(state.boards))
    },
    currBoard(state) {
      return JSON.parse(JSON.stringify(state.currBoard))
    },
    currTask(state) {
      return JSON.parse(JSON.stringify(state.currTask))
    },
  },
  mutations: {
    // GROUP
    setCurrGroup() {},
    removeGroup() {},
    addGroup() {},

    // BOARD
    setBoards(state, { boards }) {
      console.log(boards)
      state.boards = boards
      console.log('setboard:', state.boards)
    },
    removeBoard(state, { _id }) {
      const idx = state.boards.findIndex((board) => board._id === _id)
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
    setCurrTask(state, {task}) {
      // console.log(task)
      state.currTask = task
      console.log('yay', state.currTask)
    }
  },
  actions: {
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
    async removeBoard({ commit }, { _id }) {
      try {
        await boardService.remove(_id)
        commit(payload)
      } catch {
        console.log('Couldnt remove board')
        commit({
          type: 'setIsError',
          isError: true,
        })
      }
    },
    async saveBoard({ dispatch }, { board }) {
      try {
        await boardService.save(board)
        dispatch('loadBoards')
      } catch (err) {
        console.log("Couldn't save board", err)
        commit({
          type: 'setIsError',
          isError: true,
        })
      }
    },
    async getBoardById({ commit }, { boardId }) {
      try {
        const board = await boardService.getBoardById(boardId)
        commit({ type: 'setCurrBoard', board })
      } catch (err) {
        console.log('', err)
        commit({
          type: 'setIsError',
          isError: true,
        })
      }
    },
    async saveUpdate({ dispatch }, payload) {
      try {
        await boardService.save(payload.updateText)
        dispatch('loadBoards')
      } catch (err) {
        console.log('Couldnt save board', err)
        commit({
          type: 'setIsError',
          isError: true,
        })
      }
    },
    setCurrTask({commit}, {task}) {
      console.log(task)
      commit({type: 'setCurrTask', task})
    }
  },
}
