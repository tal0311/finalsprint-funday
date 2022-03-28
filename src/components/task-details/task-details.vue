<template>
  <section class="task-details">
    <br />
    <button @click="closeTaskDetails">x</button>
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

      <task-updates
        v-if="activeTab === 'taskUpdates'"
        :task="task"
        @addTaskComment="addTaskComment"
      />
      <task-files v-if="activeTab === 'taskFiles'" />
      <activity-log
        v-if="activeTab === 'activityLog'"
        :activities="activities"
      />
    </div>
  </section>
</template>

<script>
import taskUpdates from "./task-updates.vue";
import taskFiles from "./task-files.vue";
import activityLog from "./activity-log.vue";

export default {
  name: "task-details",
  props: {
    task: Object,
    group: Object,
    boardId: String,
  },
  data() {
    return {
      activeTab: "taskUpdates",
    };
  },
  methods: {
    addTaskComment(commentText) {
      if (!this.task.comments) {
        this.task.comments = []
        this.task.comments.push({ creator: "Some User", content: commentText });
      } else {
        this.task.comments.push({ creator: "Some User", content: commentText });
      }
      this.$store.dispatch({
        type: "updateTask",
        boardId: this.boardId,
        groupId: this.group.id,        
        task: JSON.parse(JSON.stringify(this.task)),
      });
    },
    closeTaskDetails() {
      this.$store.commit({ type: "setTaskToShow", task: null });
    },
  },
  computed: {
    activities() {
      return this.$store.getters.boards.activities;
    },
  },
  created() {},
  components: {
    taskUpdates,
    taskFiles,
    activityLog,
  },
};
</script>
