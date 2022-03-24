<template>
  <hr />
  <div v-if="isOptions">
    <ul>
      <li @click="addGroup">new group</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOptions: false,
      boardId: this.$route.params.id,
    }
  },
  methods: {
    addNewTask() {
      console.log('new task')
      this.$store.dispatch({ type: 'addTask' })
    },
    openOptions() {
      this.isOptions = !this.isOptions
    },
    addGroup() {
      console.log('add group')
      this.$store.dispatch({ type: 'addGroup', boardId: this.boardId })
      this.$emit('addGroup')
      this.openOptions()
    },
  },
}
</script>

<style>
ul li,
button {
  cursor: pointer;
}
</style>
