<template>
  <section class="task-details">
    <br />
    <button  @click="closeTaskDetails">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <br />
    <br />

    <div class="title">
      <h2 >{{ task.title }}</h2>
      <br />
      <br />
      <div class="task-actions-container">
        <button @click="activeTab = 'taskUpdates'">Task Updates</button>
        <button @click="activeTab = 'taskFiles'">Task Files</button>
        <button @click="activeTab = 'activityLog'">Activity Log</button>
      </div>
      <hr />
      <task-updates
        v-if="activeTab === 'taskUpdates'"
        :task="task"
        @addTaskComment="addTaskComment"
      />
      <task-files v-if="activeTab === 'taskFiles'" />
      <activity-log
        v-if="activeTab === 'activityLog'"
        :activities="task.activities"
      />
    </div>
  </section>
</template>

<script>
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
    }
  },
  methods: {
    addTaskComment(commentText) {
      this.addActivity(commentText)
      if (!this.task.comments) {
        this.task.comments = []
        this.task.comments.push({ creator: 'Guest', content: commentText })
      } else {
        this.task.comments.push({ creator: 'Guest', content: commentText })
      }
      this.$store.dispatch({
        type: 'updateTask',
        boardId: this.boardId,
        groupId: this.group.id,
        task: JSON.parse(JSON.stringify(this.task)),
      })
    },
    closeTaskDetails() {
      this.$store.commit({ type: 'setTaskToShow', task: null })
    },
    addActivityArr() {
      if (!this.task.activities) {
        this.task.activities = []
      }
    },
    addActivity(commentText) {
      this.task.activities.push({
        createdAt: Date(),
        byMember: 'Guest',
        txt: commentText,
      })
    },
  },
  computed: {
    activities() {
      return this.$store.getters.boards.activities
    },
  },
  created() {
    this.addActivityArr()
  },
  components: {
    taskUpdates,
    taskFiles,
    activityLog,
  },
}
</script>
