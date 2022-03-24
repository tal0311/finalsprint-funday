<template>
  <section @click="toggleShow" class="status-picker">
    <h4>status</h4>    
    <div v-if="menuOpen" class="picker-box">
      <div @click="setStatus('working')" class="working">Working on it</div>
      <div @click="setStatus('stuck')" class="stuck">Stuck</div>
      <div @click="setStatus('done')" class="done">Done</div>
      <div @click="setStatus('null')" class="null">.</div>
    </div>
  </section>
</template>

<script>
// import { carService } from '../services/car-service.js'
// import carFilter from '../components/car-filter.vue'

export default {
  name: "status-picker",
  props: {
    task: Object,
  },
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleShow() {
      this.menuOpen = !this.menuOpen
    },
    setStatus(status) {
      this.$emit('setStatus', status, this.task.id)
    }
  },
  computed: {},
  created() {},
  components: {},
};
</script>







