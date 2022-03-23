<template>
  <section>
    <h1>hello</h1>
    {{boards}}
  </section>
</template>

<script>

export default {
  // props: [''],
  components: {},
  created() {},
  data() {
    return {}
  },
  methods: {},
  computed: {
    boards() {
      return this.$store.getters.boards

    }
  },
  unmounted() {},
}
</script>