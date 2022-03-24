<template>
  <section @click="toggleShow" class="status-picker">
    <h4>status</h4>
    <div v-if="menuOpen" class="picker-box">
      <div @click="setStatus('working')" class="working">Working on it</div>
      <div @click="setStatus('stuck')" class="stuck">Stuck</div>
      <div @click="setStatus('done')" class="done">Done</div>
      <div @click="setStatus('null')" class="null">.</div>
    </div>
  </section>
</template>

<script>
// import { carService } from '../services/car-service.js'
// import carFilter from '../components/car-filter.vue'

export default {
  name: "status-picker",
  emits: ['updateTask'],
  props: {
    task: Object,
  },
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleShow() {
      this.menuOpen = !this.menuOpen;
    },
    async setStatus(status) {
      // this.$emit('setStatus', status, this.task)
      const board = this.$store.getters.currBoard;
      const { boardId, groupId, task } = await this.$store.dispatch({
        type: "findTask",
        boardId: board._id,
        taskId: this.task.id,
      });
      task.cols[0].value = status;
      await this.$store.dispatch({
        type: "updateTask",
        boardId,
        groupId,
        task,
      });
      this.$emit("updateTask");
    },
  },
  computed: {},
  created() {},
  components: {},
};
</script>
