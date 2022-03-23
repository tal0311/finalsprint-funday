<template>
  <section v-if="board" class="board-details">
    <div class="header">
      <h1>{{board.title}}</h1>
      <p class="description">
        {{board.description}}
  <section class="view-board">
    <p>Main Table</p>
    <p>Timeline</p>
    <p>Dashboard</p>
    </section>
    <section v-for="group in board.groups" :key="group">
            {{group.title}}
        </section>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  // props: [''],
  name: "board-details",
  components: {},
  async created() {
      let { boardId } = this.$route.params
      const board = this.$store.getters.currBoard
      this.board = JSON.parse(JSON.stringify(board))
      console.log('boardId', boardId);


  },
  data() {
    return {
        board: null
    };
  },
  methods: {},
  computed: {
    boards() {
    }
  },
  unmounted() {},
};
</script>
