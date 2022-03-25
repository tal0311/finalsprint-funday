<template>
  <!-- task title -->
  <div class="task-preview flex space-between">
    <!-- <task-options v-if="isOptions"></task-options> -->
    <div class="task-title-comp">
      <div class="side-indicator" @click="setIsOptions">V</div>

      <router-link
        :to="'/board/b101/task/' + task.id"
        class="title-chat flex space-between"
      >
        <div
          :class="{ 'mark-outline': hover, 'unmark-outline': !hover }"
          class="task-title"
          contenteditable="true"
          ref="title"
          @blur="updateTask(task, $event)"
        >
          {{ task.title }}
        </div>

        <span class="chat ">chat</span>
        <span><button class="edit" @mouseover="hover=true" @mouseleave="hover=false" @click.prevent="editTaskTitle">Edit</button></span>
      </router-link>
            <div class="remove-task btn" @click="removeTask">X</div>

    </div>
    <div class="task-col-comp">
      <div v-for="(cmp, idx) in task.cols" :key="idx">
        <component
          :is="cmp.type"
          :task="task"
          :value="cmp.value"
          @updateStatus="setStatus"
        />
      </div>
    </div>
    <!-- </div> -->
    <!-- dynamic components -->
    <div class="right-indicator"></div>
  </div>
</template>

<script>
import memberPicker from "./dynamic-cmps/member-picker.vue";
import datePicker from "./dynamic-cmps/date-picker.vue";
import statusPicker from "./dynamic-cmps/status-picker.vue";
import taskOptions from "./task-options.vue";

export default {
  name: "task-preview",
  emits: ["updateTask"],
  props: {
    task: Object,
  },
  data() {
    return {
      isOptions: false,
      hover: false,
    };
  },
  methods: {
    setStatus() {
      // this.$emit('updateTask')
    },
    setIsOptions() {
      this.isOptions = !this.isOptions;
    },
    async updateTask(newTask, $event) {
      newTask = JSON.parse(JSON.stringify(newTask));
      const board = this.$store.getters.currBoard;
      const { boardId, groupId, task } = await this.$store.dispatch({
        type: "findTask",
        boardId: board._id,
        taskId: newTask.id,
      });
      task.title = $event.target.innerText;
      await this.$store.dispatch({
        type: "updateTask",
        boardId,
        groupId,
        task,
      });
      this.$emit("updateTask");
    },
    async removeTask() {
      const taskToDelete = this.task;
      const board = this.$store.getters.currBoard;
      const { boardId, groupId, task } = await this.$store.dispatch({
        type: "findTask",
        boardId: board._id,
        taskId: taskToDelete.id,
      });
      await this.$store.dispatch({
        type: "removeTask",
        boardId,
        groupId,
        task,
      });
      this.$emit("updateTask");
    },

    editTaskTitle() {
       this.$refs.title.focus();
    },
  },
  components: {
    datePicker,
    memberPicker,
    statusPicker,
    taskOptions,
  },
  computed: {
    markTitle(){
        this.hover = true
        
}  }
};
</script>

<style></style>
