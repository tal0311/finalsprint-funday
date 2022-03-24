<template>
  <section class="group">
    <button @click="setIsOptions">V</button>
    <group-options @update="setGroupUpdate" v-if="isOptions" />
    <div
      class="group-title"
      @blur="updateGroup(group, $event)"
      contenteditable="true"
    >
      {{ group.title }}
    </div>
    <tasks-list :tasks="group.tasks"></tasks-list>
  </section>
</template>

<script>
import tasksList from './tasks-list.vue'
import groupOptions from './group-options.vue'
import GroupOptions from './group-options.vue'
export default {
  name: 'group-cmp',
  emits: ['updateGroup'],
  props: {
    group: Object,
  },
  components: {
    tasksList,
    groupOptions,
    GroupOptions,
  },

  data() {
    return {
      isOptions: false,
    }
  },
  methods: {
    setIsOptions() {
      this.isOptions = !this.isOptions
    },

    setGroupUpdate(value) {
      console.log('setGroupUpdate', value, this.group.id)
      if (value === 'remove') {
        this.$store.dispatch({ type: 'removeGroup', groupId: this.group.id })
      }
      if (value === 'duplicate') {
        this.$store.dispatch({ type: 'duplicateGroup', groupId: this.group.id })
      }
      if (value.startsWith('#')) {
        console.log(value, this.group)
        const groupToUpdate = JSON.parse(JSON.stringify(this.group))
        groupToUpdate.groupColor = value
        this.$store.dispatch({ type: 'updateGroup', groupToUpdate })
        this.$emit('updateGroup')
      }
    },

    updateGroup(group, $event) {
      const groupToUpdate = JSON.parse(JSON.stringify(group))
      groupToUpdate.title = $event.target.innerText
      this.$store.dispatch({ type: 'updateGroup', groupToUpdate })
      this.$emit('updateGroup')
    },
  },
  computed: {
    getTasks() {
      return this.group.tasks
    },
  },
}
</script>
<style></style>
