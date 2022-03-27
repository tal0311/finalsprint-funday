<template>
  <ul>
    <li v-for="(status, idx) in tasksStatus" :key="idx">
      <div>{{ status }}</div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'group-progress',

  data() {
    return {
      tasksStatus: [
        { status: 'done' },
        { status: 'stuck' },
        { status: 'done' },
        { status: 'done' },
        { status: 'stuck' },
        { status: 'done' },
        { status: 'done' },
        { status: 'working' },
        { status: 'stuck' },
      ],
    }
  },
}
</script>

<style></style>
