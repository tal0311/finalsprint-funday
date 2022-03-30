<template>
  <div class="board-options">
    <div class="input-container">
      <label for="remove-board" @click="setUpdateValue('remove')">
        Remove Board
        <!-- <input
          class="d-none"
          @change="setUpdateValue(optionsValue)"
          type="radio"
          name="options"
          id="remove-board"
          value="remove"
          v-model="optionsValue"
        /> -->
      </label>
    </div>
    <div class="input-container">
      <label for="duplicate-board" @click="setUpdateValue('duplicate')">
        Duplicate Board 
        <!-- <input
          class="d-none"
          @change="setUpdateValue(optionsValue)"
          type="radio"
          name="options"
          id="duplicate-board"
          value="duplicate"
          v-model="optionsValue"
        /> -->
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "board-options",
  emits: ["setBoardUpdate"],
  props: {},
  data() {
    return {
      optionsValue: "",
    };
  },
  mounted() {},
  methods: {
    setUpdateValue(val) {
      this.$emit("setBoardUpdate", val);
    },
  },
};
</script>

<style></style>
