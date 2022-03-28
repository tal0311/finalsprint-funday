<template>
  <section class="group" @click="setCurrGroup">
    <div class="group-dialog flex">
      <button
        class="btn-dialog flex"
        @click="setIsOptions"
        :style="{ backgroundColor: group.groupColor }"
      ></button>
      <div
        v-if="group"
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
      @add-inline="addTask"
      :tasks="group.tasks"
      :group="group"
      :groupColor="group.groupColor"
    ></tasks-list>
  </section>
</template>

<script>
import tasksList from '../task/tasks-list.vue'
import groupProgress from './group-progress.vue'
import groupOptions from './group-options.vue'
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
  },

  data() {
    return {
      isOptions: false,
    }
  },
  methods: {
    addTask(value, groupId) {
      console.log(value)
      const idx = this.board.groups.findIndex(
        (group) => group.id === groupId
      )
      this.$store.dispatch({
        type: 'addTask',
        board: this.board,
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
    upateGroupAfterDnd(newGroup) {
      const newBoard = JSON.parse(JSON.stringify(this.currBoard))
      newBoard.groups = JSON.parse(JSON.stringify(newGroup))
      this.$store.dispatch({
        type: 'saveBoard',
        board: newBoard,
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
  },
}
</script>
<style></style>
