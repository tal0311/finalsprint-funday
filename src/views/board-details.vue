<template>
  <section v-if="currBoard" class="board-details" :key="currBoard">
    <div class="header">
      <div class="">
        <div class="board-header-top flex">
          <h1
            class="board-title"
            @keydown.enter="setBoardTitle"
            @blur="setBoardTitle"
            contenteditable="true"
          >
            {{ currBoard.title }}
          </h1>
          <div class="info-star flex">
            <button class="info"></button>
            <button class="star">Star</button>
          </div>

          <div class="board-actions flex">
            <!-- LAST SEEN CMP -->
            <div class="last-seen flex">
              <button class="btn last">Last seen</button>
              <last-seen :members="currBoard.members" />
            </div>
            <button class="btn invite">
              Invite / <span>{{ currBoard.members?.length }}</span>
            </button>
            <button class="btn activity">Activity</button>
            <button class="btn add">Add to board</button>
          </div>
        </div>
        <p
          class="description"
          @blur="setBoardTitle"
          @keydown.enter="setBoardTitle"
          contenteditable="true"
          data-placeholder="Add board description"
        >
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
      <Container orientation="vertical" @drop="onDrop">
        <Draggable v-for="group in currBoard.groups" :key="group.id">
          <group-cmp
            :group="group"
            :board="currBoard"
            @setCurrGroup="setCurrGroup"
          />
          <br />
        </Draggable>
      </Container>
    </section>

    <!-- TASK DETAILS -->
    <task-details
      v-if="taskToShow"
      :task="taskToShow"
      :group="currGroup"
      :boardId="currBoard._id"
    />
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
import { ArrowDown } from '@element-plus/icons-vue'
import { Container, Draggable } from 'vue3-smooth-dnd'
import lastSeen from '../components/board/last-seen.vue'
import groupCmp from '../components/group/group.vue'
import addGroupTask from '../components/add-group-task.vue'
import appFilter from '../components/board/board-filter.vue'
import taskDetails from '../components/task-details/task-details.vue'

export default {
  name: 'board-details',
  components: {
    groupCmp,
    addGroupTask,
    appFilter,
    Container,
    Draggable,
    lastSeen,
    taskDetails,
  },
  created() {
    let { boardId } = this.$route.params
    const board = this.$store.dispatch({ type: 'getBoardById', boardId })
    this.$store.commit({ type: 'setCurrBoard', board })
  },
  data() {
    return {
      board: null,
      currGroup: null,
    }
  },
  methods: {
    addNewTask() {
      this.$store.dispatch({
        type: 'addTask',
        groupIdx: 0,
      })
    },
    addGroup() {
      this.$store.dispatch({ type: "addGroup"});
    },
    setBoardTitle(event) {
      if (event.target.nodeName === 'H1') {
        var title = event.target.innerText
      }
      if (event.target.nodeName === 'P') {
        var description = event.target.innerText
      }
      console.log('title, description', title, description);
      this.$store.dispatch({ type: 'saveBoard', title, description})
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
      this.updateGroupsOrder(result)

      return result
    },
    updateGroupsOrder(result) {
      // const savedBoard = JSON.parse(JSON.stringify(this.currBoard))
      // savedBoard.groups = JSON.parse(JSON.stringify(groupsAfterDnd))
      const groupsAfterDnd = JSON.parse(JSON.stringify(result))
      console.log('result', groupsAfterDnd)
      this.$store.dispatch({
        type: 'updateGroupsOrder',
        newGroups: groupsAfterDnd,
      })
    },
    setCurrGroup(group) {
      JSON.parse(JSON.stringify(group))
      this.currGroup = group
    },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
    taskToShow() {
      return this.$store.getters.taskToShow
    },
    currgroup() {
      return this.currGroup
    },
  },
}
</script>
