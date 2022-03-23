<template>
  <h4>task list</h4>
  <task-preview />
</template>

<script>
import taskPreview from './task-preview.vue'

export default {
  name: 'task-list',
  components: {
    taskPreview,
  },
}
</script>

<style></style>
