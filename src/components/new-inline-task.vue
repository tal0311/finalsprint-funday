<template>
  <input type="text" v-model="value" placeholder="+ Add task" />
  <button @click="add">add</button>
</template>

<script>
export default {
  name: 'newInlineTask',
  emits: ['add-task'],
  data() {
    return {
      value: '',
    }
  },
  methods: {
    add() {
      console.log(this.value)
      this.$emit('add-task', this.value)
    },
  },
}
</script>

<style></style>
