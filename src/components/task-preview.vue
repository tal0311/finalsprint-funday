<template>
  <!-- task title -->
  <div class="task-preview">
    <div class="side-indicator"></div>
    <div class="conversation"></div>

    <component :is="datePicker"></component>
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

<style></style>
