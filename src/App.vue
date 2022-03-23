<template>
  <section class="app-container container">
    <app-sidebar />
    <router-view/>
  </section>
</template>

<script>
import appSidebar from "./components/app-sidebar.vue"
export default {
  name: 'app',
  created() {
    
  },
  methods: {
   
  },
  components: {
    appSidebar,
  },
}
</script>
