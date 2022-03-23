import { boardService } from '../../services/board-service.js'

export const boardStore = {
  strict: true,
  state: {
    boards: [],
    currBoard: {},
  },
  getters: {
    boards(state) {
      console.log(state.boards)
      return JSON.parse(JSON.stringify(state.boards))
    },
    currBoard(state) {
      return JSON.parse(JSON.stringify(state.currBoard))
    },
  },
  mutations: {
    // GROUP
    setCurrGroup() {},
    removeGroup() {},
    addGroupToBoard({ state, commit }, { boardToUpdate }) {
      const idx = state.boards.findIndex(
        (board) => board._id === boardToUpdate._id
      )

      state.boards.splice(idx, 1, boardToUpdate)
      commit({ type: 'setCurrBoard', boardToUpdate })
      console.log('currboard:', state.currBoard)
    },

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
      console.log(state.currBoard)
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
    async addGroup({ state, dispatch, commit }, { boardId }) {
      console.log(boardId)
      try {
        let board = await boardService.getById(boardId)
        // update model
        board = JSON.parse(JSON.stringify(board))
        let emptyGroup = boardService.getEmptyGroup()

        board.groups.push(emptyGroup)
        const boardToUpdate = await boardService.add(board)
        // mutate state

        commit({ type: 'addGroupToBoard', boardToUpdate })
        // dispatch({ type: 'loadBoards' })
      } catch (error) {
        console.log('error during adding group to board', error)
      }
    },

    async addTask({ commit }) {
      console.log('add task')
      try {
        // update model
        // mutate state
      } catch (error) {}
    },
  },
}
