<template>
  <div class="group-options">
    <label for="remove">
      remove
      <input
        @change="setUpdateValue"
        type="radio"
        name="options"
        id="remove"
        value="remove"
        v-model="optionsValue"
      />
    </label>
    <label for="duplicate">
      duplicate
      <input
        @change="setUpdateValue"
        type="radio"
        name="options"
        id="duplicate"
        value="duplicate"
        v-model="optionsValue"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'group-options',
  emits: ['update'],
  date() {
    return {
      optionsValue: '',
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
