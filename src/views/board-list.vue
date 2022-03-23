<template>

  <section class="board-list is-expanded flex col">
    <div class="title-box-container flex col">
      <div class="title-container flex space-between">
        <h1>Workspace</h1>
        <button class="btn"><i class="ellipsis">...</i></button>
        </div>
      <button>+ Add</button>
      <button>V Filter</button>
      <button>Q Search</button>
    </div>
    
    <h1>hello</h1>
    <ul>
      <li v-for="board in boards" :key="board">
        <router-link :to="'/board/' + board._id" @click="setCurrBoard(board)">{{
          board.title
        }}</router-link>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  // props: [''],
  components: {},
  created() {},
  data() {
    return {
<<<<<<< HEAD
      // boards: this.$store.getters.boards
    }
  },
  methods: {
    setCurrBoard(board) {
      this.$store.commit({ type: 'setCurrBoard', board })
=======
    };
  },
  methods: {
    setCurrBoard(board) {
      this.$store.commit({ type: "setCurrBoard", board });
>>>>>>> 60015e496540e14aca3bee8055d5a622ea1a7667
    },
  },
  computed: {
    boards() {
<<<<<<< HEAD
      return this.$store.getters.boards
    },
  },
  unmounted() {},
}
=======
      return this.$store.getters.boards;
    },
  },
  unmounted() {},
};
>>>>>>> 60015e496540e14aca3bee8055d5a622ea1a7667
</script>
