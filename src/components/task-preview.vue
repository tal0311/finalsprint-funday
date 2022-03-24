<template>
  <!-- task title -->
  <div class="task-preview">
    <div class="side-indicator">V</div>
    <div class="conversation"></div>
    <div>{{ task.title }}</div>

    <div>chat</div>
    <div v-for="(cmp, idx) in task.cols" :key="idx">
      <component :is="cmp.type" :value="cmp.value"></component>
    </div>
    <!-- </div> -->
    <!-- dynamic components -->
  </div>
</template>

<script>
import memberPicker from './member-picker.vue'
import datePicker from './date-picker.vue'
import statusPicker from './status-picker.vue'

export default {
  name: 'task-preview',

  props: {
    task: Object,
  },
  components: {
    datePicker,
    memberPicker,
    statusPicker,
  },
}
</script>

<style>
.task-preview {
  background-color: #c3c3c3;
  display: flex;
  justify-content: space-between;
  margin: 0.2rem;
  align-items: center;
}

.task-preview > * {
  margin-inline: 1rem;
}
.side-indicator {
  width: 10px;
  height: 100%;
  background: red;
}
i {
  color: black;
}
</style>
