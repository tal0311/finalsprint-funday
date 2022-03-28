<template>
  <section class="task-list">
    <Container
      group-name="eltasks"
      :get-child-payload="getChildPayloadEltasks"
      orientation="vertical"
      @drop="onDrop($event, 'eltasks')"
    >
      <Draggable v-for="eltask in eltasks" :key="eltask.id">
        <task-preview
          :task="eltask"
          :groupColor="groupColor"
          :group="group"
        ></task-preview>
      </Draggable>
    </Container>
    <new-inline-task @add-task="add" />
    <group-Progress :tasks="group.tasks" />
  </section>
</template>

<script>
import newInlineTask from './new-inline-task.vue'
import groupProgress from './group-progress.vue'
import taskPreview from './task-preview.vue'
import { Container, Draggable } from 'vue3-smooth-dnd'
export default {
  props: {
    tasks: Array,
    group: Object,
    groupColor: String,
  },
  emits: ['add-inline'],
  data() {
    return {
      eltasks: this.tasks,
    }
  },
  methods: {
    add(value) {
      this.$emit('add-inline', value, this.group)
    },
    getChildPayloadEltasks(index) {
      return this.eltasks[index]
    },
    onDrop(dropResult) {
      this.eltasks = this.applyDrag(this.eltasks, dropResult)
    },
    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult

      if (removedIndex === null && addedIndex === null) return arr
      const result = [...arr]
      let taskToAdd = payload

      if (removedIndex !== null) {
        taskToAdd = result.splice(removedIndex, 1)[0]
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, taskToAdd)
      }
      return result
    },
    // updateGroup(result) {
    //   const newGroup = JSON.parse(JSON.stringify(this.group))
    //   newGroup.tasks = JSON.parse(JSON.stringify(result))
    //   this.$store.dispatch({
    //     type: 'updateGroup',
    //     groupToUpdate: newGroup,
    //   })
    // },
    updateBoard(newGroup) {
      $store.emit('updateBoardAfterDnd', newGroup)
    },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
  },
  components: {
    taskPreview,
    Container,
    Draggable,
    groupProgress,
    newInlineTask,
  },
  created() {
    // this.currBoard = JSON.parse(JSON.stringify(this.$store.getters.currBoard))
    // this.eltasks = this.tasks
  },
}
</script>

<style></style>
