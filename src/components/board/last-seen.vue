<template>
  <div class="member-picker">
    <ul class="members-container clean-list flex">
      <li v-for="member in members" :key="member.id" class="member">
         <img v-if="member.imgUrl" class="member-img" :src="member.img" :alt="member.fullname" />
        <div v-else :style="{ backgroundColor: member.color }" class="member">
      
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
