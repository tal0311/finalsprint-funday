<template>
  <section class="group">
    <div class="group-title" @blur="updateGroup(group, $event)" contenteditable="true">{{group.title}}</div>
    <tasks-list :tasks="group.tasks"></tasks-list>
  </section>
</template>

<script>
// import { carService } from '../services/car-service.js'
// import carFilter from '../components/car-filter.vue'
import tasksList from './tasks-list.vue'
export default {
  name: 'group-cmp',
  props: {
    group: Object,
  },
  components: {
    tasksList,
  },

  data() {
    return {
    }
  },
  methods:{
    updateGroup(group, $event){
      const groupToUpdate = JSON.parse(JSON.stringify(group))
      groupToUpdate.title = $event.target.innerText
      this.$store.dispatch({type: 'updateGroup', groupToUpdate} )
      this.$emit('updateGroup')
    }
  },
  computed: {
    getTasks() {
      return this.group.tasks
    },
  },
}
</script>
<style></style>
