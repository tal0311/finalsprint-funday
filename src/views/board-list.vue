<template>
  <section>
    <h1>board</h1>
  </section>
</template>

<script>

export default {
  // props: [''],
  components: {},
  created() {
    this.$store.dispatch({type: "loadBoards"})
  },
  data() {
    return {}
  },
  methods: {},
  computed: {},
  unmounted() {},
}
</script>