<template>
  <section class='task-details'>

  </section>
</template>

<script>
import { taskService } from '../services/'

export default {
  name: 'task-details',
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
  computed: {
    getGroups() {
      return this.$store.getters.groupsForDisplay
    },
  },
  created() {},
  components: {},
}
</script>
