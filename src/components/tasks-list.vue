<template>
  <section v-for="task in tasks" :key="task.id">
    <task-preview :task="task"></task-preview>
  </section>
</template>

<script>
import taskPreview from './task-preview.vue'
export default {
  props: {
    tasks: Array,
  },
  components: {
    taskPreview,
  },
  created() {
  },
}
</script>

<style></style>
