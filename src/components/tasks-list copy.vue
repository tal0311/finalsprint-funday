<template>
  <section v-for="task in tasks" :key="task.id">
    <task-preview :task="task" :groupColor="groupColor"></task-preview>
  </section>
</template>

<script>
import taskPreview from './task-preview.vue'
export default {
  props: {
    tasks: Array,  
    groupColor: String,
  },
  components: {
    taskPreview,
  },
  created() {
  },
}
</script>

<style></style>
