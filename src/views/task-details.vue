<template>
  <section v-if="task" class="task-details">
    <br />
    <router-link :to="'/board/' + boardId">
      <button>x</button>
    </router-link>
    <br />
    <br />

    <div class="title">
      <h3>{{ task.title }}</h3>
      <br />
      <br />
      <button @click="activeTab = 'taskUpdates'">Task Updates</button>
      <button @click="activeTab = 'taskFiles'">Task Files</button>
      <button @click="activeTab = 'activityLog'">Activity Log</button>
      <hr />

      <!-- dynamic component -->
      <task-updates v-if="activeTab === 'taskUpdates'" :task="task" />
      <task-files v-if="activeTab === 'taskFiles'" />
      <activity-log
        v-if="activeTab === 'activityLog'"
        :activities="activities"
      />
    </div>
  </section>
</template>

<script>
import { taskService } from '../services/task-service.js'
import taskUpdates from '../components/task-details/task-updates.vue'
import taskFiles from '../components/task-details/task-files.vue'
import activityLog from '../components/task-details/activity-log.vue'

export default {
  name: 'task-details',
  props: {},
  data() {
    return {
      task: null,
      boardId: null,
      activeTab: 'taskUpdates',
    }
  },
  methods: {},
  computed: {
    task() {
      return this.$store.getters.currTask
    },
    activities() {
      return this.$store.getters.boards.activities
    },
  },
  created() {
    const { boardId, taskId } = this.$route.params
    this.boardId = boardId
    // console.log(boardId, taskId)
    const task = this.$store.dispatch({
      type: 'findTask',
      boardId,
      taskId,
    })
    this.$store.commit({ type: 'setCurrTask', task })
  },
  components: {
    taskUpdates,
    taskFiles,
    activityLog,
  },
}
</script>
