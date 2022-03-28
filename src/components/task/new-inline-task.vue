<template>
  <section class="inline-task">
    <div class="add-task">
      <input
        @focus="isOnFocus = true"
        @blur="isOnFocus = false"
        type="text"
        v-model="value"
        placeholder="+ Add task"
      />
      <button :class="addFocus" @click="addTask">add</button>
    </div>
    <button @click="addTask">ok</button>
  </section>
</template>

<script>
export default {
  name: 'newInlineTask',
  emits: ['add-task'],
  data() {
    return {
      value: '',
      isOnFocus: false,
    }
  },
  methods: {
    add() {
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
