<template>
  <section class="task-updates">
    <input
      v-if="!writing"
      @click="writing = true"
      type="text"
      placeholder="Write an update..."
    />
    <textarea
      v-if="writing"
      v-model="updateText"
      name=""
      id=""
      cols="30"
      rows="10"
    /><br />
    <button @click="update">Update</button>
    <ul class="updates-list">
      <li>update 1</li>
      <li>update 2</li>
      <li>update 3</li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "task-updates",
  props: {},
  data() {
    return {
      updateText: null,
      writing: false,
    };
  },
  methods: {
    async update() {
      await this.$store.dispatch({
        type: "saveUpdate",
        text: this.updateText,
      });
    },
  },
  computed: {},
  created() {},
  components: {},
};
</script>