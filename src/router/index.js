import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import boardDetails from '../views/board-details.vue'
import boardList from '../views/board-list.vue'
import taskDetails from '../views/task-details.vue'


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // { //TODO: change to board id
    //   path: '/board/:id',
    //   name: 'board-details',
    //   component: boardDetails,
    // },
    {
      path: '/board/',
      name: 'board-list',
      component: boardList,
    },
    {
      path: '/board/:boardId?',
      name: 'board-details',
      component: boardDetails,
    },
    {
      path: '/board/b101/task/:taskId?',
      // path: '/task/details',
      name: 'task-details',
      component: taskDetails,
    },
  ],
})

export default router
