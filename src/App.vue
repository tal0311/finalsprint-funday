<template>
  <section class="app-container container">
    <app-sidebar />
    <router-view class="main-layout" />
  </section>
</template>

<script>
import appSidebar from './components/app-sidebar.vue'
import group from './components/group/group.vue'
export default {
  name: 'app',
  created() {
    this.$store.dispatch({ type: 'loadBoards' })
  },
  methods: {},
  components: {
    appSidebar,
    group,
  },
}
</script>
