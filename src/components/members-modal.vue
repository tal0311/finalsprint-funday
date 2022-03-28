<template>
  <div class="member-modal flex">
    <ul>
      <li
        class="member-in-modal flex"
        v-for="(member, index) in members"
        :key="index"
      >
        <div class="member-name" :style="{ backgroundColor: member.color }">
          {{ member.fullname.split(' ')[0] }}
        </div>
        <button @click="removeMember(member)" class="remove">X</button>
      </li>
      <div>
        <button @click="addMember" class="add">+</button>
        <input type="text" v-model="memberName" />
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'membersModal',
  emits: ['remove', 'addMember'],
  props: {
    members: Array,
    task: Object,
  },
  data() {
    return {
      memberName: '',
    }
  },

  methods: {
    removeMember(member) {
      console.log('remove');
      this.$emit('removeMember', this.task, member)
    },
    addMember() {
      this.$emit('addMember', this.task, this.memberName)
    },
  },
}
</script>

<style></style>
