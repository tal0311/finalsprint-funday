<template>
  <div class="member-picker">
    <ul class="members-container clean-list flex">
      <li v-for="member in members" :key="member.id" class="member">
        <div v-if="member.imgUrl" class="member-img">
          <img :src="member.imgUrl" alt="" />
        </div>
        <div v-else :style="{ backgroundColor: member.color }" class="member">
          {{ member.fullname[0] }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'last-seen',
  props: {
    members: Array,
  },
}
</script>

<style>

</style>
