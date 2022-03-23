<template>
  <section class="group">
    <tasks-list :tasks="group.tasks"></tasks-list>
  </section>
</template>

<script>
// import { carService } from '../services/car-service.js'
// import carFilter from '../components/car-filter.vue'
import tasksList from './tasks-list.vue'
export default {
  name: 'group-cmp',
  props: {
    group: Object,
  },
  components: {
    tasksList,
  },

  data() {
    return {}
  },
  computed: {
    getTasks() {
      return this.group.tasks
    },
  },
}
</script>
<style></style>
