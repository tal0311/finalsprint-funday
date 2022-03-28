<template>
  <span class="actual-date">
    {{ task.cols[2]?.value?.substr(0, 10) }}
  </span>
  <div class="demo-date-picker">
    <div class="block">
      <el-date-picker
        v-model="taskDate"
        type="date"
        placeholder="Pick a day"
        format="YYYY-MM-DD"
        @change="setDate"
        class="date-input"
      ></el-date-picker>
    </div>
  </div>
</template>
<script>
export default {
  name: 'date-picker',
  emits: ['updateTask', 'add', 'remove'],
  props: {
    task: Object,
    group: Object,
    value: String,
  },
  data() {
    return {
      taskDate: null,
    }
  },
  methods: {
    async setDate() {
      const board = this.$store.getters.currBoard

      /* FROM HERE */
      const currTask = JSON.parse(JSON.stringify(this.task))

      currTask.cols[2].value = this.taskDate
      await this.$store.dispatch({
        type: 'updateTask',
        boardId: board._id,
        groupId: this.group.id,
        task: currTask,
      })
      this.$emit('updateTask')
    },
  },

  created() {
    this.taskDate = this.task.cols[2].value
  },
}
</script>

<style scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0;
  flex-wrap: wrap;
  /* position: absolute; */
  opacity: 0;
}
.demo-date-picker .block {
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}

.actual-date {
  position: absolute;
}
</style>
