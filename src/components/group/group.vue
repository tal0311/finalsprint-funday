<template>
  <section class="group" @click="setCurrGroup">
    <div class="group-dialog flex">
      <button
        class="btn-dialog flex"
        @click="setIsOptions"
        :style="{ backgroundColor: group.groupColor }"
      >
        <i class="fa-solid fa-sort-down"></i>
      </button>
      <div class=" title-wrapper flex">
        <p
          contenteditable="true"
          v-if="group"
          :style="{ color: group.groupColor }"
          class="group-title"
          @blur="updateGroup(group, $event)"
        >
          {{ group.title }}
        </p>

        <div class="col-headers flex">
          <div class="label">Status</div>
          <div class="label">Person</div>
          <div class="label">Date</div>
          <div class="label">Priority</div>
        </div>
      </div>

      <!-- <group-labels /> -->
      <group-options
        @update="setGroupUpdate"
        v-if="isOptions"
        :groupColor="group.groupColor"
      />
    </div>
    <tasks-list
      @add-inline="addTask"
      @updateGroupAfterDnd="updateGroupAfterDnd"
      :tasks="group.tasks"
      :group="group"
      :groupColor="group.groupColor"
      style="margin-top:15px"
    ></tasks-list>
  </section>
</template>
<script>
import tasksList from '../task/tasks-list.vue'
import groupProgress from './group-progress.vue'
import groupOptions from './group-options.vue'
import groupLabels from '../group/group-labels.vue'
export default {
  name: 'group-cmp',
  emits: ['updateGroup', 'setCurrGroup'],
  props: {
    group: Object,
    board: Object,
  },
  components: {
    tasksList,
    groupOptions,
    groupProgress,
    groupLabels,
  },

  data() {
    return {
      isOptions: false,
    }
  },
  methods: {
    addTask(value, groupId) {
      // console.log(value)
      const idx = this.board.groups.findIndex((group) => group.id === groupId)
      this.$store.dispatch({
        type: 'addTask',
        groupIdx: idx,
        value,
      })
    },
    setIsOptions() {
      this.isOptions = !this.isOptions
    },

    setGroupUpdate(value) {
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
        const groupToUpdate = JSON.parse(JSON.stringify(this.group))
        groupToUpdate.groupColor = value
        this.$store.dispatch({ type: 'updateGroup', groupToUpdate })
      }
    },
    updateGroup(group, ev) {
      const groupToUpdate = JSON.parse(JSON.stringify(group))
      if (!ev.target.innerText) return
      groupToUpdate.title = ev.target.innerText
      this.$store.dispatch({ type: 'updateGroup', groupToUpdate })
    },
    async updateGroupAfterDnd(tasksAfterDnd) {
      this.group.tasks = tasksAfterDnd
      // this.$store.commit({ type: "updateGroup", updatedGroup: this.group });
      this.$store.dispatch({
        type: 'updateGroup',
        groupToUpdate: JSON.parse(JSON.stringify(this.group)),
      })
    },
    setCurrGroup() {
      this.$emit('setCurrGroup', this.group)
    },
  },
  computed: {
    getTasks() {
      return this.group.tasks
    },
    currBoard() {
      return this.$store.getters.currBoard
    },
  },
}
</script>
<style></style>
