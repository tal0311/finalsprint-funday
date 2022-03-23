<template>
  <section class="task-details">
    <button>x</button>
    <!-- <ul>
      <li v-for="person in task.person" :key="person._id">
        {{ person.fullname }}
      </li>
    </ul> -->
    <div class="subscribers">
      <span v-for="person in task.person" :key="person._id">
        {{ person.fullname }}, 
      </span>
    </div>
    <div class="title">
      <h2>{{ task.title }}</h2>
      <br />
      <br />
      <button @click="activeTab = 'taskUpdates'">Task Updates</button>
      <button @click="activeTab = 'taskFiles'">Task Files</button>
      <button @click="activeTab = 'activityLog'">Activity Log</button>
      <hr />
      <!-- dynamic component -->
      <task-updates v-if="activeTab === 'taskUpdates'" />
      <task-files v-if="activeTab === 'taskFiles'" />
      <activity-log v-if="activeTab === 'activityLog'" :activities="activities" />
    </div>
  </section>
</template>

<script>
import { taskService } from "../services/task-service.js";
import taskUpdates from "../components/task-details/task-updates.vue";
import taskFiles from "../components/task-details/task-files.vue";
import activityLog from "../components/task-details/activity-log.vue";

export default {
  name: "task-details",
  props: {},
  data() {
    return {
      activeTab: "taskUpdates",
    };
  },
  methods: {},
  computed: {
    task() {
      return this.$store.getters.boards.groups[0].tasks[0];
    },
    activities() {
      return this.$store.getters.boards.activities
    }
  },
  created() {},
  components: {
    taskUpdates,
    taskFiles,
    activityLog,
  },
};
</script>



