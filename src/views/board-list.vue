<template>
  <section class="board-list is-expanded flex col">
    <div class="title-box-container flex col">
      <div class="title-container flex space-between">
        <h1>Workspace</h1>
        <button class="btn"><i class="ellipsis">...</i></button>
      </div>
      <div class="ws-name"><span class="ws-icon">M</span> Main Workspace</div>
    </div>
    <div class="menu-buttons flex col">
      <a
        class="bl-btn btn flex justify-start"
        @click="dialogFormVisible = true"
      >
        <svg width="19" height="19">
          <path
            d="M10.75 3C10.75 2.58579 10.4142 2.25 10 2.25C9.58579 2.25 9.25 2.58579 9.25 3V9.25H3C2.58579 9.25 2.25 9.58579 2.25 10C2.25 10.4142 2.58579 10.75 3 10.75H9.25V17C9.25 17.4142 9.58579 17.75 10 17.75C10.4142 17.75 10.75 17.4142 10.75 17V10.75H17C17.4142 10.75 17.75 10.4142 17.75 10C17.75 9.58579 17.4142 9.25 17 9.25H10.75V3Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
          <span>Add</span>
        </svg>
      </a>
      <button>V Filter</button>
      <button>Q Search</button>

    </div>

    <div class="boards">
      <ul>
        <li v-for="board in boards" :key="board">
          <router-link :to="'/board/' + board._id">{{
            board.title
          }}</router-link>
          <!-- @click="setCurrBoard(board)" -->
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  // props: [''],
  components: {},
  created() {},
  data() {
    return {
      // boards: this.$store.getters.boards
    };
  },
  methods: {
    addBoard() {},
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
  },
  unmounted() {},
};
</script>
