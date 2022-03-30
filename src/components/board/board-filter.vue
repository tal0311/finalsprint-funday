<template>
  <section class="filter flex">
    <!-- <label @click="isSearch = true" class="btn search"
      >Search
      <div v-if="setSearch">
        <input @enter="setSearchTerm" type="text" name="search" id="" />
      </div>
    </label> -->
    <input type="text" v-model="filterBy" @input="onFilter" />
    <button class="btn person">Person</button>

    <button class="btn filter">Filter</button>

    <button class="btn sort">Sort</button>
  </section>
</template>

<script>
export default {
  name: "board-filter",
  data() {
    return {
      isSearch: false,
      filterBy: "",
    };
  },
  methods: {
    onFilter() {
      console.log(this.filterBy);
      return this.$emit("filter", this.filterBy);
    },
  },
  computed: {
    // setSearch() {
    //   console.log(this.isSearch)
    //   return this.isSearch
    // },
  },
};
</script>

<style></style>
