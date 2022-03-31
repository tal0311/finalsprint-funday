<template>
  <div class="member-modal flex">
    <ul class="clean-list">
      <li
        class="member-in-modal flex"
        v-for="(member, index) in members"
        :key="index"
        :style="{ backgroundColor: member.color }"
      >
        <div class="member-name">
          {{ member.fullname.split(' ')[0] }}
        </div>
        <button @click="removeMember(member)" class="remove">X</button>
      </li>
      <div class="member-input flex">
        <button @click="addMember" class="add">+</button>
        <input type="text" v-model="memberName" placeholder="Member name" />
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
      // console.log('remove')
      this.$emit('removeMember', this.task, member)
    },
    addMember() {
      if (!this.memberName) return
      this.$emit('addMember', this.task, this.memberName)
    },
  },
}
</script>

<style></style>
