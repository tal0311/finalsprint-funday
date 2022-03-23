<template>
  <section class="group" v-for="group in getGroups" :key="group">
    <pre>{{ getGroups }}</pre>
    <task-list :tasks="group.tasks" />
  </section>
</template>

<script>
// import { carService } from '../services/car-service.js'
// import carFilter from '../components/car-filter.vue'
import taskList from './task-list.vue'
export default {
  name: 'group',
  props: {},
  components: {
    taskList,
  },
  data() {
    return {
      tasks: null,
    }
  },
  methods: {},
  computed: {},
  created() {},
  components: {},
}
</script>
