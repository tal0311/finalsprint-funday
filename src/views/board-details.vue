<template>
  <section v-if="board" class="board-details">
    <div class="header">
      <div class="">
        <div class="board-header-top flex">
          <h1 class="board-title">{{ board.title }}</h1>
          <div class="board-actions flex">
            <button>i</button>
            <button>i</button>
            <button>i</button>
            <button>i</button>
          </div>
        </div>
        <p class="description">
          {{ board.description }}
        </p>
        <hr />
        <div class="btn-container">
          <button>Main Table</button>
          <button type="primary">Timeline</button>
          <button type="success">More</button>
          <button type="info">Add View</button>
        </div>
      </div>
      <hr />

      <div class="flex flex-wrap items-center">
        <el-dropdown split-button type="primary" @click="addNewTask">
          New Task
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="addGroup"
                >New group of Tasks</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <add-group-task
        @updateGroup="currBoard"
        @updateTask="currBoard"
      ></add-group-task>

      <section class="view-board">
        <p>Main Table</p>
        <p>Timeline</p>
        <p>Dashboard</p>
      </section>
    </div>
    <section class="group-list" v-if="board">
      <section v-for="group in board.groups" :key="group.id">
        <group-cmp :group="group" />
        <br />
      </section>
    </section>
  </section>
</template>
<style scoped>
.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
<script>
import addGroupTask from '../components/add-group-task.vue'
import groupCmp from '../components/group.vue'
import { ArrowDown } from '@element-plus/icons-vue'

export default {
  name: 'board-details',
  components: {
    groupCmp,
    addGroupTask,
    ArrowDown,
  },
  created() {
    let { boardId } = this.$route.params
    const board = this.$store.dispatch({ type: 'getBoardById', boardId })
    this.$store.commit({ type: 'setCurrBoard', board })
    // const board = this.$store.getters.currBoard
    this.board = JSON.parse(JSON.stringify(board))
  },
  data() {
    return {
      board: null,
    }
  },
  methods: {
    addNewTask() {
      this.$store.dispatch({ type: 'addTask', board: this.board, groupId: 0 })
    },
    addGroup() {
      this.$store.dispatch({ type: 'addGroup', board: this.board })
    },
  },
  computed: {
    currBoard() {
      this.board = this.$store.getters.currBoard
      return this.board
    },
  },
  unmounted() {},
}
</script>
