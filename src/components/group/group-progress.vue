<template>
  <section class="status-bar">
    <ul class="clean-list flex">
      <li v-for="(status, idx) in sortStatus" :key="idx">
        <div
          :style="{ width: (1 / sortStatus.length) * 100+'px' }"
          :class="[status, 'bar']"
        >
          &nbsp;
        </div>
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
    sortStatus() {
      // this.tasks.map(task=> console.log(task.cols[0]))
      return this.tasks.map((task) => task.cols[0].value.toLowerCase()).sort()
    },
  },
}
</script>

<style></style>
