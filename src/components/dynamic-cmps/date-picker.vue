<template>
  <div class="demo-date-picker">
    <div class="block">
      <!-- <label>
      
        {{ task.cols[2].value?.substr(0, 10)}} 
       -->
      <el-date-picker
        v-model="taskDate"
        type="date"
        placeholder="Pick a day"
        @change="setDate"
      ></el-date-picker>
      <!-- </label> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "date-picker",
  emits: ["updateTask"],
  props: {
    task: Object,
    group: Object,
  },
  data() {
    return {
      taskDate: null,
    };
  },
  methods: {
    // clickDP() {
    //   console.log(this.$refs.dp);
    //   document.querySelector("#dp").click();
    // },
    async setDate() {
      const board = this.$store.getters.currBoard;
      // console.log("board");

      /* FROM HERE */
      const currTask = JSON.parse(JSON.stringify(this.task));
      // console.log('board, this.group.id, this.task', board, this.group.id, currTask);
      currTask.cols[2].value = this.taskDate;
      await this.$store.dispatch({
        type: "updateTask",
        boardId: board._id,
        groupId: this.group.id,
        task: currTask,
      });
      this.$emit("updateTask");
    },
  },
  computed: {},
  created() {
    // console.log("this.task", this.task);
    // this.taskDate = JSON.parse(JSON.stringify(this.task.cols[2].value))
    this.taskDate = this.task.cols[2].value;
  },
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
