<template>
  <section class="status-bar">
    <ul class="clean-list flex">
      <li v-for="(status, idx) in sortStatus" :key="idx">
        <div :class="[status, 'bar']">&nbsp;</div>
      </li>
    </ul>
  </section>
</template>

<script>
// import chart from './chart.vue'

export default {
  name: 'group-progress',
  props: {
    tasks: Array,
  },
 

  computed: {
    setCount() {
      console.log(this.tasksStatus)
      return this.tasksStatus.reduce((acc, curr) => {
        console.log(
          acc[curr]
            ? (acc[curr] = acc[curr] + 1)
            : (acc[curr] = Math.ceil((1 * this.tasksStatus.length) / 100))
        )
        return acc
      }, {})
    },
    sortStatus() {
      return this.tasks.map((task) => task.cols[0].value).sort()
    },
  },
}
</script>

<style></style>
