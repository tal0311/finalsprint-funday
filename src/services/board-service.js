// import { httpService } from './http.service'
import { utilService } from './util-service'
import { storageService } from './async-storage.service'
// import { userService } from './user-service-local'
// import { socketService, SOCKET_EVENT_board_ADDED } from './socket-service'

// loadItemsToStorage()
console.log('board service')
const KEY = 'board'

export const boardService = {
  add,
  query,
  remove,
  getById,
  save,
  // saveGroup,
  getEmptyGroup,
  getEmptyTask,
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
    title: 'New Group',
    tasks: [
      {
        id: 't' + utilService.makeId(),
        title: 'New Task',
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

function getEmptyTask() {
  return {
    id: 't' + utilService.makeId(),
    title: 'New Task',
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
        value: null,
      },
    ],
  }
}

const board = [
  {
    _id: 'b101',
    title: 'Robot dev proj',
    description: ' this board....',
    createdAt: 1589983468418,
    createdBy: {
      _id: 'u101',
      fullname: 'Abi Abambi',
      imgUrl: 'http://some-img',
    },
    members: [
      {
        id: 'u101',
        fullname: 'Tal amit',
        imgUrl: 'https://www.google.com',
      },
      {
        id: 'u102',
        fullname: 'guy shimon',
        imgUrl: 'https://www.google.com',
      },
      {
        id: 'u103',
        fullname: 'shiran elad',
        imgUrl: 'https://www.google.com',
      },
    ],
    activities: [
      {
        id: 'a101',
        txt: 'Changed Color',
        createdAt: 154514,
        byMember: {
          _id: 'u101',
          fullname: 'Abi Abambi',
          imgUrl: 'http://some-img',
        },
        task: {
          id: 'c101',
          title: 'Replace Logo',
        },
      },
    ],
    groups: [
      {
        id: 'dfg56',
        title: 'Group 1',
        tasks: [
          {
            id: 't101',
            title: 'replace items',
            cols: [
              {
                type: 'status-picker',
                value: 'Status',
              },
              {
                type: 'member-picker',
                value: [
                  {
                    id: 'fhrf*^%hfdg',
                    username: 'Lili',
                    fullname: 'Lili Abambi',
                    imgUrl: 'http://some-img.jpg',
                    color: 'FFF833',
                  },
                ],
              },
              {
                type: 'date-picker',
                value: null,
              },
            ],
          },
          {
            id: 't102',
            title: 'implement D&D',
            cols: [
              {
                type: 'status-picker',
                value: 'working on it',
              },
              {
                type: 'member-picker',
                value: [
                  {
                    _id: 'fhrf*^%hfdg',
                    username: 'Meir',
                    fullname: 'Meir Abambi',
                    imgUrl: 'https://randomuser.me/api/portraits/women/38.jpg',
                  },
                ],
              },
              {
                type: 'date-picker',
                value: null,
              },
            ],
          },
        ],
        groupColor: '#579bfc',
      },
      {
        id: 'jkjsdf45',
        title: 'Group 2',
        tasks: [
          {
            id: 't101',
            title: 'learn scss',
            cols: [
              {
                type: 'status-picker',
                value: 'done',
              },
              {
                type: 'member-picker',
                value: [
                  {
                    _id: 'fhrf*^%hfdg',
                    username: 'meir',
                    fullname: 'Meir Abambi',
                    imgUrl: 'https://randomuser.me/api/portraits/men/38.jpg',
                  },
                ],
              },
              {
                type: 'date-picker',
                value: null,
              },
            ],
          },
          {
            id: 't101',
            title: 'replace logo',
            cols: [
              {
                type: 'status-picker',
                value: 'Status',
              },
              {
                type: 'member-picker',
                value: [
                  {
                    _id: 'fhrf*^%hfdg',
                    username: 'Meir',
                    fullname: 'Meir Abambi',
                    imgUrl: 'https://randomuser.me/api/portraits/men/28.jpg',
                  },
                ],
              },
              {
                type: 'date-picker',
                value: null,
              },
            ],
          },
          {
            id: 't101',
            title: 'learn js logo',
            cols: [
              {
                type: 'status-picker',
                value: 'done',
              },
              {
                type: 'member-picker',
                value: [
                  {
                    _id: 'fhrf*^%hfdg',
                    username: 'Meir',
                    fullname: 'Meir Abambi',
                    imgUrl: 'http://some-img.jpg',
                  },
                ],
              },
              {
                type: 'date-picker',
                value: null,
              },
            ],
          },
        ],
        groupColor: '#a25ddc',
      },
      {
        id: 'jkjsdf78',
        title: 'Group 3',
        tasks: [
          {
            id: 't101',
            title: 'nake it happen',
            cols: [
              {
                type: 'status-picker',
                value: 'done',
              },
              {
                type: 'member-picker',
                value: [
                  {
                    _id: 'fhrf*^%hfdg',
                    username: 'tal',
                    fullname: 'tal amit',
                    imgUrl: 'http://some-img.jpg',
                  },
                ],
              },
              {
                type: 'date-picker',
                value: null,
              },
            ],
          },
          {
            id: 't101',
            title: 'nake it happen',
            cols: [
              {
                type: 'status-picker',
                value: 'working on it',
              },
              {
                type: 'member-picker',
                value: [
                  {
                    _id: 'fhrf*^%hfdg',
                    username: 'shiran',
                    fullname: 'shiran elad',
                    imgUrl: 'http://some-img.jpg',
                  },
                ],
              },
              {
                type: 'date-picker',
                value: null,
              },
            ],
          },
          {
            id: 't103',
            title: 'make it happen again',
            cols: [
              {
                type: 'status-picker',
                value: 'stuck',
              },
              {
                type: 'member-picker',
                value: [
                  {
                    _id: 'fhrf*^%hfdg',
                    username: 'guy',
                    fullname: 'guy shimon',
                    imgUrl: 'http://some-img.jpg',
                  },
                ],
              },
              {
                type: 'date-picker',
                value: null,
              },
            ],
          },
        ],
        groupColor: '##9cd326',
      },
    ],
    cmpsOrder: ['status-picker', 'member-picker', 'date-picker'],
  },
]

// loadItemsToStorage()
function loadItemsToStorage() {
  console.log('loading')
  localStorage.setItem('board', JSON.stringify(board))
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
