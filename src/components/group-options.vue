<template>
  <div class="group-options">
    <div class="input-container">
      <label for="remove">
        remove
        <input
          class="d-none"
          @change="setUpdateValue"
          type="radio"
          name="options"
          id="remove"
          value="remove"
          v-model="optionsValue"
        />
      </label>
    </div>
    <div class="input-container">
      <label for="duplicate">
        duplicate
        <input
          class="d-none"
          @change="setUpdateValue"
          type="radio"
          name="options"
          id="duplicate"
          value="duplicate"
          v-model="optionsValue"
        />
      </label>
    </div>
    <div class="input-container color-input flex">
      <input
        @change="setUpdateValue"
        type="color"
        name="options"
        id="color"
        v-model="optionsValue"
      />
      <label for="color"> color </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'group-options',
  emits: ['update'],
  props: {
    groupColor: String,
  },
  data() {
    return {
      optionsValue: '',
      newColor: `"${this.groupColor}"`
    }
  },
  methods: {
    setUpdateValue() {
      this.$emit('update', this.optionsValue)
    },
  },
}
</script>

<style></style>
