<template>
  <h4>task list</h4>
  <pre>{{ tasks }} </pre>
  <task-preview />
</template>

<script>
import taskPreview from './task-preview.vue'

export default {
  name: 'task-list',
  props: {
    tasks: Object,
  },
  components: {
    taskPreview,
  },
}
</script>

<style></style>
