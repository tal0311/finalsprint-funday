<template>
  <section class="task-updates">
    <input
      v-if="!writing"
      @click="writing = true"
      type="text"
      placeholder="Write an update..."
    />
    <input
      type="text"
      v-if="writing"
      v-model="updateText"
      name=""
      id=""
      cols="30"
      rows="10"
    /><br />

    <button @click="update">Update</button>
    <ul class="update-list clean-list">
      <li v-for="(comment, idx) in task.comments" :key="idx">
        <h4>{{ comment.creator }}</h4>
        <p>{{ comment.content }}</p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'task-updates',
  props: {
    task: Object,
  },
  data() {
    return {
      updateText: null,
      writing: false,
    }
  },
  methods: {
    async update() {
      await this.$store.dispatch({
        type: 'saveTaskUpdate',
        text: this.updateText,
      })
    },
  },
  computed: {},
  created() {},
  components: {},
}
</script>
