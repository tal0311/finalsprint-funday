<template>
  <section class="app-container container">
    <app-sidebar />
    <router-view class="main-layout" />
  </section>
</template>

<script>
import appSidebar from './components/app-sidebar.vue'

export default {
  name: 'app',
  created() {
    this.$store.dispatch({ type: 'loadBoards' })
  },
  methods: {},
  components: {
    appSidebar,
  },
}
</script>
