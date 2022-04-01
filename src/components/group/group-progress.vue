<template>
  <section class="status-bar">
    <div class="left-side"></div>
    <div class="right-side">
      <div class="status-container">
        <ul class="clean-list flex">
          <li v-for="(status, idx) in sortStatus" :key="idx">
            <div
              :style="{
                width: (1 / sortStatus.length) * 100 + 'px',
                height: '30px',
              }"
              :class="[status, 'bar']"
            >
              &nbsp;
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
// import chart from './chart.vue'

export default {
  name: "group-progress",
  props: {
    tasks: Array,
  },

  computed: {
    sortStatus() {
      return this.tasks
        .map((task) => {
          console.log(task.cols);
          return task.cols[0].value.toLowerCase();
        })
        .sort();
    },
  },
};
</script>

<style></style>
