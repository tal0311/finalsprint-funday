<template>
  <!-- task title -->
  <div class="task-preview flex space-between">
    <task-options v-if="isOptions"></task-options>
    <div class="side-indicator" @click="setIsOptions">V</div>
      <div class="task-title" contenteditable="true" @blur="updateTask(task, $event)">{{ task.title }}</div>
    <router-link :to="'/board/b101/task/' + task.id" class="title-chat flex space-between">
      <div>chat</div>
    </router-link>
    <div v-for="(cmp, idx) in task.cols" :key="idx">
      <component :is="cmp.type" :task="task" :value="cmp.value" @updateStatus="setStatus" />
    </div>
    <!-- </div> -->
    <!-- dynamic components -->
  </div>
</template>

<script>
import memberPicker from './member-picker.vue'
import datePicker from './date-picker.vue'
import statusPicker from './status-picker.vue'
import taskOptions from './task-options.vue'

export default {
  name: 'task-preview',
  emits: ['updateTask'],
  props: {
    task: Object,
  },
  data(){
    return {
      isOptions: false
    }
  },
  methods: {
    setStatus() {
      // this.$store.dispatch({
      //   type: "setStatus",
      //   status,
      //   task,
      // });
      this.$emit('updateTask')
    },
     setIsOptions() {
      this.isOptions = !this.isOptions
    },
    async updateTask(newTask, $event){
      newTask = JSON.parse(JSON.stringify(newTask))
      const board = this.$store.getters.currBoard
      const {boardId, groupId, task} = await this.$store.dispatch({type: 'findTask', boardId: board._id, taskId: newTask.id})
      task.title = $event.target.innerText
      await this.$store.dispatch({type: 'updateTask', boardId, groupId, task})
      this.$emit('updateTask')
    }

  },
  components: {
    datePicker,
    memberPicker,
    statusPicker,
    taskOptions
  },
}
</script>

<style>



</style>
