<template>
  <div class="board-options">
    <div class="input-container">
      <label for="rename-board">
        Rename Board
        <input
          class="d-none"
          @change="setUpdateValue(optionsValue)"
          type="radio"
          name="options"
          id="rename-board"
          value="rename"
          v-model="optionsValue"
        />
      </label>
    </div>
    <div class="input-container">
      <label for="remove-board">
        Remove Board
        <input
          class="d-none"
          @change="setUpdateValue(optionsValue)"
          type="radio"
          name="options"
          id="remove-board"
          value="remove"
          v-model="optionsValue"
        />
      </label>
    </div>
    <div class="input-container">
      <label for="duplicate-board">
        Duplicate Board
        <input
          class="d-none"
          @change="setUpdateValue(optionsValue)"
          type="radio"
          name="options"
          id="duplicate-board"
          value="duplicate"
          v-model="optionsValue"
        />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'board-options',
  emits: ['update'],
  props: {},
  data() {
    return {
      optionsValue: '',
    }
  },
  mounted(){
  },
  methods: {
    setUpdateValue(val) {
      this.optionsValue = val
      this.$emit('update', this.optionsValue)
    },
  },
}
</script>

<style></style>
