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
  },
  data() {
    return {}
  },
  methods: {},
  computed: {
    boards(){
      this.$store.getters.boards
    }
  },
  unmounted() {},
}
</script>