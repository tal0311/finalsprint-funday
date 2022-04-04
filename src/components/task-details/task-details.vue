<template>
  <section class="task-details">
    <button @click="closeTaskDetails"><i class="fa-solid fa-xmark"></i></button>

    <br />

    <div class="title">
      <h3>{{ task.title }}</h3>
    <br>
      <button @click="activeTab = 'taskUpdates'">Task Updates</button>
      <button @click="activeTab = 'taskFiles'">Task Files</button>
      <button @click="activeTab = 'activityLog'">Activity Log</button>
      <hr />
      <task-updates
        v-if="activeTab === 'taskUpdates'"
        :msgs="msgs"
        @addTaskComment="addTaskComment"
        @updateToSocket="updateToSocket"
      />
      <!-- <task-updates
        v-if="activeTab === 'taskUpdates'"
        :task="task"
        @addTaskComment="addTaskComment"
        @updateToSocket="updateToSocket"
      /> -->
      <task-files v-if="activeTab === 'taskFiles'" />
      <activity-log
        v-if="activeTab === 'activityLog'"
        :activities="task.activities"
      />
    </div>
  </section>
</template>

<script>
import { socketService } from '../../services/socket-service.js'
import taskUpdates from './task-updates.vue'
import taskFiles from './task-files.vue'
import activityLog from './activity-log.vue'

export default {
  name: 'task-details',
  props: {
    task: Object,
    group: Object,
    boardId: String,
  },
  data() {
    return {
      activeTab: 'taskUpdates',
      updates: [],
      taskToSave: {},
      commentText: null,
      isSender: false,
    }
  },
  methods: {
    updateToSocket(commentText) {
      this.isSender = true
      this.commentText = commentText
      socketService.emit('update added', commentText)
    },
    addTaskComment(commentText) {
      this.addActivity(commentText)

      this.updates.unshift({ creator: 'Tal', content: commentText })

      this.taskToSave.comments = JSON.parse(JSON.stringify(this.updates))
      this.$store.dispatch({
        type: "updateTaskAfterComment",
        boardId: this.boardId,
        groupId: this.group.id,
        task: this.taskToSave,
      });
      // if (this.isSender) {
      // }
      this.isSender = false;
    },
    closeTaskDetails() {
      socketService.off('push updated', this.addTaskComment)
      this.$store.commit({ type: 'setTaskToShow', task: null })
      this.$store.dispatch({
        type: 'getBoardById',
        boardId: this.boardId,
      })
    },
    addActivity(commentText) {
      if (!this.taskToSave.activities) this.taskToSave.activities = []
      this.taskToSave.activities.unshift({
        createdAt: Date(),
        byMember: 'Tal',
        txt: commentText,
      })
    },
  },
  computed: {
    msgs() {
      return this.updates
    },
    activities() {
      return this.$store.getters.boards.activities
    },
  },
  created() {
    this.taskToSave = JSON.parse(JSON.stringify(this.task))
    socketService.on('push updated', this.addTaskComment)
    if (!this.task.comments) this.updates = []
    else this.updates = [...this.task.comments]
  },
  components: {
    taskUpdates,
    taskFiles,
    activityLog,
  },
}
</script>
