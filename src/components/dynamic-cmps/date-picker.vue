<template>
  <div class="demo-date-picker">
    <div class="block">
      <div>{{task.cols[2].value}}</div>
      <el-date-picker
        v-model="date"
        type="date"
        placeholder="Pick a day"
        @change="setDate"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "date-picker",
  emits: ['updateTask'],
  props: {
    task: Object,
    group: Object
  },
  data() {
    return {
      date: null,
    };
  },
  methods: {

    async setDate() {
      // this.$emit('setStatus', status, this.task)
      const board = JSON.parse(JSON.stringify(this.$store.getters.currBoard))
      // const { boardId, groupId, task } = await this.$store.dispatch({
      //   type: "findTask",
      //   boardId: board._id,
      //   taskId: this.task.id,
      // });
      this.task.cols[2].value = this.date;
      await this.$store.dispatch({
        type: "updateTask",
        boardId: board,
        groupId: this.group.id,
        task: this.task,
      });
      this.$emit("updateTask");
    },
  },
  computed: {},
  created() {},
  components: {},
};
</script>

<style scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-date-picker .block {
  padding: 30px 0;
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
</style>
