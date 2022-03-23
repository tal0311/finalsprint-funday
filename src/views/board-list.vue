<template>
  <section>
    <h1>Workspace</h1>
    <button>+ Add</button>
    <button>V Filter</button>
    <button>Q Search</button>
    <hr>
    <ul>
      <li v-for="board in boards" :key="board">
        <router-link :to="'/board/'+ board._id" @click="setCurrBoard(board)">{{board.title}}</router-link></li>
    </ul>
  </section>
</template>

<script>

export default {
  // props: [''],
  components: {},
  created() {
  },
  data() {
    return {
      boards: this.$store.getters.boards
    }
  },
  methods: {
    setCurrBoard(board){
      this.$store.commit({type:'setCurrBoard', board})
    }
  },
  computed: {
    boards(){
      return this.$store.getters.boards
    }
  },
  unmounted() {},
}
</script>