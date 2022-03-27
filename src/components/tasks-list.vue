<template>
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
</template>

<script>
import taskPreview from "./task-preview.vue";
import { Container, Draggable } from "vue3-smooth-dnd";
export default {
  props: {
    tasks: Array,
    group: Object,
    groupColor: String,
  },
  data() {
    return {
      eltasks: this.tasks,
    };
  },
  methods: {
    getChildPayloadEltasks(index) {
      console.log(index);
      return this.eltasks[index];
    },
    onDrop(dropResult) {
      this.eltasks = this.applyDrag(this.eltasks, dropResult);
    },
    applyDrag(arr, dragResult) {
      console.log('currBoard:', this.currBoard)
      const { removedIndex, addedIndex, payload } = dragResult;

      if (removedIndex === null && addedIndex === null) return arr;
      const result = [...arr];
      let taskToAdd = payload;

      if (removedIndex !== null) {
        taskToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, taskToAdd);
      }
      // this.updateGroup(result);
      // console.log(this.currBoard)
      // this.updateBoard(result)
      console.log(result)

      return result;
    },
    updateGroup(result) {
      const newGroup = JSON.parse(JSON.stringify(this.group));
      newGroup.tasks = JSON.parse(JSON.stringify(result));
      this.$store.dispatch({
        type: "updateGroup",
        groupToUpdate: newGroup,
      });
    },
    updateBoard(result) {
      const newBoard = JSON.parse(JSON.stringify(this.currBoard));
      newBoard.groups = JSON.parse(JSON.stringify(result));
        console.log('newBoard:', newBoard)
      this.$store.dispatch({
        type: "saveBoard",
        board: newBoard,
      });
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
  },
  created() {
    // this.currBoard = JSON.parse(JSON.stringify(this.$store.getters.currBoard))
    // this.eltasks = this.tasks
  },
};
</script>

<style>
</style>