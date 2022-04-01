<template>
  <section class="group" @click="setCurrGroup">
    <div class="group-dialog flex">
      <button
        class="btn-dialog flex"
        @click="setIsOptions"
        :style="{ backgroundColor: group.groupColor }"
      >
        <i class="fa-solid fa-sort-down"></i>
      </button>
      <div class=" title-wrapper flex">
        <p
          contenteditable="true"
          v-if="group"
          :style="{ color: group.groupColor }"
          class="group-title sticky"
          @blur="updateGroup(group, $event)"
        >
          {{ group.title }}
        </p>

        <div class="col-headers flex">
          <div class="label status-picker" @click="sortTasks('status')">Status</div>
          <div class="label member-picker" @click="sortTasks('member-picker')">Person</div>
          <div class="label date-picker" @click="sortTasks('date-picker')">Date</div>
          <div class="label priority-picker" @click="sortTasks('priority')">Priority</div>
        </div>
      </div>

      <!-- <group-labels /> -->
      <group-options
        @update="setGroupUpdate"
        v-if="isOptions"
        :groupColor="group.groupColor"
      />
    </div>
    <tasks-list
      @add-inline="addTask"
      @updateGroupAfterDnd="updateGroupAfterDnd"
      :tasks="group.tasks"
      :group="group"
      :groupColor="group.groupColor"
      style="margin-top:5px"
    ></tasks-list>
  </section>
</template>
<script>
import tasksList from '../task/tasks-list.vue'
import groupProgress from './group-progress.vue'
import groupOptions from './group-options.vue'
import groupLabels from '../group/group-labels.vue'
export default {
  name: 'group-cmp',
  emits: ['updateGroup', 'setCurrGroup'],
  props: {
    group: Object,
    board: Object,
  },
  components: {
    tasksList,
    groupOptions,
    groupProgress,
    groupLabels,
  },

  data() {
    return {
      isOptions: false,
      ascDesc: 1,
    }
  },
  methods: {
    sortTasks(col){
      // let idx ;
      // if(col==='status') idx = 0
      // // if(col==='status') idx = 0
      // this.group.tasks = this.group.tasks.sort((t1,t2) => ((t1.cols[idx].value > t2.cols[idx].value) * this.ascDesc))
      // this.ascDesc *= -1;
      console.log(this.group.tasks)
    },
    addTask(value, groupId) {
      // console.log(value)
      const idx = this.board.groups.findIndex((group) => group.id === groupId)
      this.$store.dispatch({
        type: 'addTask',
        groupIdx: idx,
        value,
      })
    },
    setIsOptions() {
      this.isOptions = !this.isOptions
    },

    setGroupUpdate(value) {
      if (value === 'remove') {
        this.$store.dispatch({ type: 'removeGroup', groupId: this.group.id })
      }
      if (value === 'duplicate') {
        this.$store.dispatch({
          type: 'duplicateGroup',
          groupId: this.group.id,
        })
      }
      if (value.startsWith('#')) {
        const groupToUpdate = JSON.parse(JSON.stringify(this.group))
        groupToUpdate.groupColor = value
        this.$store.dispatch({ type: 'updateGroup', groupToUpdate })
      }
    },
    updateGroup(group, ev) {
      const groupToUpdate = JSON.parse(JSON.stringify(group))
      if (!ev.target.innerText) return
      groupToUpdate.title = ev.target.innerText
      this.$store.dispatch({ type: 'updateGroup', groupToUpdate })
    },
    async updateGroupAfterDnd(tasksAfterDnd) {
      this.group.tasks = tasksAfterDnd
      // this.$store.commit({ type: "updateGroup", updatedGroup: this.group });
      this.$store.dispatch({
        type: 'updateGroup',
        groupToUpdate: JSON.parse(JSON.stringify(this.group)),
      })
    },
    setCurrGroup() {
      this.$emit('setCurrGroup', this.group)
    },
  },
  computed: {
    getTasks() {
      return this.group.tasks
    },
    currBoard() {
      return this.$store.getters.currBoard
    },
  },
}
</script>
<style></style>
