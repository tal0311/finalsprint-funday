// import { boardService } from '../../services/board-service.js';

// export default {
//     strict: true,
//     state: {
//         boards: [],
//         filterBy: null,

//     },
//     getters: {
//         boardsForDisplay(state) {
//             return state.boards;
//         },
//         currBoardDisplay({ currBoard }) {
//             return currBoard;
//         },
//     },
//     mutations: {
//         setFilter(state, { filterBy }) {
//             state.filterBy = filterBy;
//         },
//         setBoards(state, { boards }) {
//             state.boards = boards;
//         },
//         setCurrBoard(state, { board }) {
//             state.currBoard = board;
//         },
//         addBoard(state, { board }) {
//             const boardToSave = board;
//             state.boards.unshift(boardToSave);
//             state.filterBy = null;
//         },
//         saveBoard(state, { board }) {
//             console.log(board);
//             const idx = state.boards.findIndex((currBoard) => currBoard._id === board._id);
//             if (idx !== -1) state.boards.splice(idx, 1, board);
//             else state.boards.push(board);
//         },
//         removeBoard(state, { id }) {
//             const idx = state.boards.findIndex((board) => board._id === id);
//             state.boards.splice(idx, 1);
//         },
//         setReviews(state, payload) {
//             state.reviews = payload.reviews
//         }
//     },
//     actions: {
//         filter({ commit, dispatch }, { filterBy }) {
//             boardService.query(filterBy).then((boards) => {
//                 commit({ type: 'setBoards', boards });
//             });
//             commit({ type: 'setFilter', filterBy });
//             dispatch({ type: 'loadBoards' });
//         },
//         loadBoards(context) {
//             return boardService.query(context.state.filterBy)
//                 .then(boards => {
//                     context.commit({ type: 'setBoards', boards });
//                 })
//                 .catch(err => console.error(err));
//         },
//         boardDetails(context, { id }) {
//             boardService.getById(id)
//                 .then((board) => {
//                 context.commit({ type: 'setCurrBoard', board });})
//                 .then((() => context.dispatch({ type: 'loadReviews' })))
//         },
//         async saveBoard({ commit }, { board }) {
//             console.log('yay')
//             try {
//                 const newBoard = await boardService.save(board);
//                 commit({ type: 'saveBoard', board: newBoard });
//                 $route.push("/board/")
//             } catch (err) {
//                 console.log(err);
//             }
//         },
//         removeBoard({ commit }, { id }) {
//             boardService.remove(id).then(() => {
//                 commit({ type: 'removeBoard', id });
//             });
//         },
//         async addReview(context, {text, id}) {
//             try {
//                 const newReview = await reviewService.add({text, boardId:id})
//             } catch (err) {
//                 console.log(err)
//             }
//         },
//         async loadReviews({commit}) {
//             try {
//                 const reviews = await reviewService.query()
//                 commit({type: 'setReviews', reviews})
//             } catch (error) {
                
//             }
//         }

//     },
//     modules: {

//     }
// };