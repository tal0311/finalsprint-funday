import { boardService } from '../../services/board-service.js'

export const boardStore = {
  strict: true,
  state: {
    boards: [],
  },
  getters: {
    boards(state) {
      console.log(state.boards)
      return JSON.parse(JSON.stringify(state.boards))
    },
    groupsForDisplay(state) {
     
      return state.boards.groups
    },
  },
  mutations: {
    setBoards(state, { boards }) {
      state.boards = boards
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
    async removeBoard({ commit }, payload) {
      try {
        await boardService.remove(payload._id)
        commit(payload)
      } catch {
        console.log('Couldnt remove board')
        commit({
          type: 'setIsError',
          isError: true,
        })
      }
    },
    async saveBoard({ dispatch }, payload) {
      try {
        await boardService.save(payload.board)
        dispatch('loadBoards')
      } catch (err) {
        console.log('Couldnt save board', err)
        commit({
          type: 'setIsError',
          isError: true,
        })
      }
    },
  },
}
