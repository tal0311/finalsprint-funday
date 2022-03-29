<template>
  <section class="inline-task">
    <div class="add-task">
      <input
        type="text"
        @focus="isOnFocus = true"
        @blur="isOnFocus = false"
        v-model="value"
        placeholder="+ Add task"
      />
      <button v-if="isOnFocus" @mousedown="addTask">add</button>
    </div>
    <!-- <button :class="addFocus" @click="addTask">ok</button> -->
  </section>
</template>

<script>
export default {
  name: 'newInlineTask',
  emits: ['add-task'],
  data() {
    return {
      value: '',
      isOnFocus: true,
    }
  },
  methods: {
    add() {
      this.isOnFocus = false
      console.log('ok')
    },
    addTask() {
      console.log(this.value)
      this.$emit('add-task', this.value)
    },
  },
  computed: {
    addFocus() {
      return this.isOnFocus ? 'focused' : ''
    },
  },
}
</script>

<style></style>
