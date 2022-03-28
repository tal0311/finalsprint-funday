<template>
  <section v-if="currBoard" class="board-details" :key="currBoard">
    <div class="header">
      <div class="">
        <div class="board-header-top flex">
          <h1 class="board-title" @blur="setBoardTitle" contenteditable="true">
            {{ currBoard.title }}
          </h1> 
          <div class="info-star flex">
            <button class="info"></button>
            <button class="star">Star</button>
          </div>

          <div class="board-actions flex">
            <button class="btn last">Last seen</button>
            <button class="btn invite">
              Invite / <span>{{ currBoard.members?.length }}</span>
            </button>
            <button class="btn activity">Activity</button>
            <button class="btn add">Add to board</button>
          </div>
        </div>
        <p class="description" @blur="setBoardTitle" contenteditable="true" data-placeholder="Add board description">
          {{ currBoard.description }}
        </p>

        <div class="btn-container">
          <button class="main">Main Table</button>
          <button class="timeline">Timeline</button>
          <button class="more">More</button>
          <button class="add">Add View</button>
        </div>
      </div>
      <hr />

      <div class="board-filter flex flex-wrap items-center">
        <el-dropdown
          class="btn-new-task"
          split-button
          type="primary"
          width="104.63px"
          height="32px"
          @click="addNewTask"
        >
          New Task
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="addGroup"
                >New group of Tasks</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <app-filter />
      </div>

      <add-group-task
        @addGroup="addGroup"
        @addTask="currBoard"
      ></add-group-task>
    </div>

    <!-- GROUP -->
    <section class="group-list" v-if="currBoard">
      <Container
        orientation="vertical"
        @drop="onDrop"
      >
        <Draggable v-for="group in currBoard.groups" :key="group.id">
          <group-cmp :group="group" />
          <br />
        </Draggable>
      </Container>
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
import groupCmp from '../components/group/group.vue'
import { ArrowDown } from '@element-plus/icons-vue'
import appFilter from '../components/board/board-filter.vue'
import { Container, Draggable } from 'vue3-smooth-dnd'

export default {
  name: 'board-details',
  components: {
    groupCmp,
    addGroupTask,
    appFilter,
    Container,
    Draggable,
  },
  created() {
    let { boardId } = this.$route.params
    const board = this.$store.dispatch({ type: 'getBoardById', boardId })
    this.$store.commit({ type: 'setCurrBoard', board })
  },
  data() {
    return {
      board: null,
    }
  },
  methods: {
    addNewTask() {
      this.$store.dispatch({
        type: 'addTask',
        board: this.currBoard,
        groupIdx: 0,
      })
    },
    addGroup() {
      this.$store.dispatch({ type: 'addGroup', board: this.currBoard })
    },
    setBoardTitle(event) {
      const board = JSON.parse(JSON.stringify(this.currBoard))
      if (event.target.nodeName === 'H1') {
        const value = event.target.innerText
        board.title = value
      }
      if (event.target.nodeName === 'P') {
        const value = event.target.innerText
        board.description = value
      }

      this.$store.dispatch({ type: 'saveBoard', board })
    },
    onDrop(dropResult) {
      const board = JSON.parse(JSON.stringify(this.currBoard))
      board.groups = this.applyDrag(board.groups, dropResult)
    },
    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult

      if (removedIndex === null && addedIndex === null) return arr
      const result = [...arr]
      let taskToAdd = payload

      if (removedIndex !== null) {
        taskToAdd = result.splice(removedIndex, 1)[0]
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, taskToAdd)
      }

      this.updateBoard(result)

      return result
    },
    updateBoard(result) {
      const updatedBoard = JSON.parse(JSON.stringify(this.currBoard))
      updatedBoard.groups = JSON.parse(JSON.stringify(result))
      this.$store.dispatch({
        type: 'saveBoard',
        board: updatedBoard,
      })
    },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
  },
  watch:{
    
  }
}
</script>
