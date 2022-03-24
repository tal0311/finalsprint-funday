// import { httpService } from './http.service'
import { utilService } from './util-service'
import { storageService } from './async-storage.service'
// import { userService } from './user-service-local'
// import { socketService, SOCKET_EVENT_board_ADDED } from './socket-service'
console.log('board service')
const KEY = 'board'

export const boardService = {
  add,
  query,
  remove,
  getById,
  save,
  // saveGroup,
  getEmptyGroup
}

// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}})

async function query(filterBy) {
  console.log('query board')
  // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  // return httpService.get(`board${queryStr}`)
  return await storageService.query(KEY)
}

async function getById(boardId) {
  const group = await storageService.get(KEY, boardId)
  // const user = await httpService.get(`user/${userId}`)
  // gWatchedUser = user;
  return group
}

async function add(board) {
  if (board._id) {
    const updatedBoard = await storageService.put('board', board)
    return updatedBoard
  }
  // const addedboard = await httpService.post(`board`, board)

  // board.byUser = userService.getLoggedinUser()
  // board.aboutUser = await userService.getById(board.aboutUserId)
  const addedboard = await storageService.post(KEY, board)

  return addedboard
}

async function save(board) {
  if (board._id) return storageService.put(KEY, board)
  return await storageService.post(KEY, board)
}

async function remove(boardId) {
  // return httpService.delete(`board/${boardId}`)
  return await storageService.delete(KEY, boardId)
}

// NOT IN USE
// async function saveGroup(board, group){
//     // const board = await getById(boardId)
//     const idx = board.groups.findIndex(boardGroup => boardGroup.id === group.id)
//     if (idx === -1) {
//       board.groups.push(group)
//       return storageService.post(KEY, board)
//     }
//     else {
//       board.groups.splice(idx, 1, group)
//         return storageService.put(KEY, board)
//     }
// }

function getEmptyGroup() {
  return {
    id: 'g' + utilService.makeId(),
    title: 'new group',
    tasks: [
      {
        id: 't' + utilService.makeId(),
        title: 'new task',
        cols: [
          {
            type: 'status-picker',
            value: null,
          },
          {
            type: 'member-picker',
            value: [],
          },
          {
            type: 'date-picker',
          },
        ],
      },
    ],
  }
}

// This IIFE functions for Dev purposes
// It allows testing of real time updates (such as sockets) by listening to storage events
// (async () => {
//   var boards = await storageService.query('board')

//   // Dev Helper: Listens to when localStorage changes in OTHER browser
//   window.addEventListener('storage', async () => {
//     console.log('Storage updated');
//     const freshboards = await storageService.query('board')
//     if (freshboards.length === boards.length + 1 ){
//       console.log('board Added - localStorage updated from another browser')
//       socketService.emit(SOCKET_EVENT_board_ADDED, freshboards[freshboards.length-1])
//     }
//     boards = freshboards
//   });
// })()
