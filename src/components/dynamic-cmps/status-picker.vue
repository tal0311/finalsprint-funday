<template>
  <section @click="toggleShow" :class="statusClass" class="status-picker">
    <div class="status">
      {{ task.cols[0].value === '' ? '&nbsp;' : task.cols[0].value }}
    </div>
    <div v-if="menuOpen" class="picker-box">
      <!-- TODO - change back to working on it -->
      <div @click="setStatus('Working on it')" class="working">
        Working on it
      </div>
      <div @click="setStatus('Stuck')" class="stuck">Stuck</div>
      <div @click="setStatus('Done')" class="done">Done</div>
      <div @click="setStatus('&nbsp;')" class="null">&nbsp;</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'status-picker',
  emits: ['updateTask', 'add', 'remove'],
  props: {
    task: Object,
    group: Object,
  },
  data() {
    return {
      menuOpen: false,
      currStatus: null,
    }
  },
  methods: {
    toggleShow() {
      this.menuOpen = !this.menuOpen
    },
    async setStatus(status) {
      // this.$emit('setStatus', status, this.task)
      const board = this.$store.getters.currBoard
      // const { boardId, groupId, task } = await this.$store.dispatch({
      //   type: "findTask",
      //   boardId: board._id,
      //   taskId: this.task.id,
      // });
      this.task.cols[0].value = status
      await this.$store.dispatch({
        type: 'updateTask',
        boardId: board._id,
        groupId: this.group.id,
        task: this.task,
      })
      this.$emit('updateTask')
    },
  },
  computed: {
    statusClass() {
      if (this.task.cols[0].value === 'Working on it') return 'working'
      if (this.task.cols[0].value === '&nbsp;') return 'null'
      // if(this.task.cols[0].value === 'null') return 'null'
      return this.task.cols[0].value.toLowerCase()
    },
  },
  created() {
    if (!this.task.cols[0].value) this.task.cols[0].value = ''
  },
  components: {},
}
</script>
