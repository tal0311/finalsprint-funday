<template>
  <div class="member-picker">
    <ul v-if="value.length > 0" class="members-container clean-list flex">
      <li
        @click="displayMini"
        v-for="member in value"
        :key="member.id"
        class="member"
        :style="{ backgroundColor: userColor }"
      >
        {{ member.username.substring(0, 1).toUpperCase() }}
      </li>
    </ul>
    <div class="no-members" v-else @click="addMember"></div>
  </div>
</template>

<script>
import { utilService } from '../../services/util-service.js'
import miniMember from '../mini-member.vue'
export default {
  name: 'memberPicker',
  props: {
    value: Array,
  },
  components: {
    miniMember,
  },
  data() {
    return {
      isMiniMember: false,
    }
  },
  methods: {
    displayMini() {
      console.log('displaymini')
      this.isMiniMember = !this.isMiniMember
    },
    addMember() {
      console.log('add member')
    },
  },
  computed: {
    userColor() {
      return utilService.getRandomColor()
    },
  },
}
</script>

<style></style>
