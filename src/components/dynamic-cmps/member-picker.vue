<template>
  <div class="member-picker">
    <ul v-if="value.length" class="members-container clean-list flex">
      <li
        @click="updateMemberList"
        v-for="member in value"
        :key="member.id"
        class="member"
        :style="{ backgroundColor: member.color }"
      >
        {{ member.fullname?.charAt(0).toUpperCase() }}
      </li>
    </ul>
    <div class="no-members-container flex" v-else @click="addMember">
      <div class="no-members"></div>
    </div>
  </div>

  <!-- MEMBERS MODAL CMP -->

  <div v-if="updateMember" class="update-members">
    <members-modal
      :task="task"
      :members="value"
      @removeMember="removeMember"
      @addMember="addMember"
    />
  </div>
</template>

<script>
import miniMember from '../mini-member.vue'
import membersModal from './../members-modal.vue'
export default {
  name: 'memberPicker',
  emits: ['add', 'remove'],
  props: {
    value: Array,
    group: Object,
    task: Object,
  },
  created(){
    
  },
  components: {
    miniMember,
    membersModal,
  },
  data() {
    return {
      isMiniMember: false,
      updateMember: false,
    }
  },
  methods: {
    displayMini() {
      this.isMiniMember = !this.isMiniMember
    },

    updateMemberList() {
      this.updateMember = true
    },
    removeMember(task, member) {
      this.$emit('remove', task, member)
    },
    addMember(task, memberName) {
      console.log('memberName', memberName);
      this.$emit('add', task, memberName)
    },
  },
}
</script>

<style></style>
