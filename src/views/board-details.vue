<template>
  <section v-if="board" class="board-details">
    <div class="header">
      <h1>{{board.title}}</h1>
      <p class="description">
        {{board.description}}

    <add-group-task @addGroup="currBoard"></add-group-task>

  <section class="view-board">
    <p>Main Table</p>
    <p>Timeline</p>
    <p>Dashboard</p>
    </section>
    <template v-if="board">
        <section  v-for="group in board.groups" :key="group.id">
          
            <group-cmp :group="group"/>

            <br>
        </section>
    </template>
            
      </p>
    </div>
  </section>
</template>

<script>
import addGroupTask from "../components/add-group-task.vue";
import groupCmp from "../components/group.vue";
export default {
 

  name: "board-details",
  components: {
    groupCmp,
    addGroupTask
  },
   created() {
      // let { boardId } = this.$route.params
      const board = this.$store.getters.currBoard
      this.board = JSON.parse(JSON.stringify(board))
      


  },
  data() {
    return {
        board: null
    };
  },
  methods: {
//     currBoard(){
//   this.board = this.$store.getters.currBoard
//   return this.board
// }

  },
  computed: {
        currBoard(){
        this.board = this.$store.getters.currBoard
        return this.board
}

  },
  unmounted() {},
};
</script>
