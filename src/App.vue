<template>
  <section class="app-container container">
    <app-sidebar />
    <board-details />
    <router-view/>
  </section>
</template>

<script>
import appSidebar from "./components/app-sidebar.vue"
import boardDetails from "./views/board-details.vue"

export default {
  name: 'app',
  created() {
    
  },
  methods: {
   
  },
  components: {
    appSidebar,
    boardDetails
  },
}
</script>
