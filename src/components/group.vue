<template>
  <section class="group">
    <div class="group-dialog flex">
      <button
        class="btn-dialog flex"
        @click="setIsOptions"
        :style="{ backgroundColor: group.groupColor }"
      ></button>
      <div
        :style="{ color: group.groupColor }"
        class="group-title"
        @blur="updateGroup(group, $event)"
        contenteditable="true"
      >
        {{ group.title }}
      </div>

      <group-options
        @update="setGroupUpdate"
        v-if="isOptions"
        :groupColor="group.groupColor"
      />
    </div>

    <tasks-list
      class="task-list"
      :tasks="group.tasks"
      :group="group"
      :groupColor="group.groupColor"
      @updateTask="updateGroup(group, $event)"
    ></tasks-list>
  </section>
  <group-progress :tasks="group.tasks" />
</template>

<script>
import tasksList from './tasks-list.vue'
import groupProgress from './group-progress.vue'
import groupOptions from './group-options.vue'
export default {
  name: 'group-cmp',
  emits: ['updateGroup'],
  props: {
    group: Object,
  },
  components: {
    tasksList,
    groupOptions,
    groupProgress,
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
        this.$store.dispatch({
          type: 'duplicateGroup',
          groupId: this.group.id,
        })
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
      if (!$event.target.innerText) return
      groupToUpdate.title = $event.target.innerText
      this.$store.dispatch({ type: 'updateGroup', groupToUpdate })
      this.$emit('updateGroup')
    },
  },
  computed: {
    getTasks() {
      return this.group.tasks
    },
    // setGroupClr() {
    //   console.log(this.group.groupColor)
    //   return { backGroundColor: group.groupColor }
    // },
  },
}
</script>
<style></style>
