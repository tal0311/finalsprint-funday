<template>
  <section class="dashboard flex space-between">
    <article class="bar-tasks-per-member">
    <h3 class="dash-header">Open/Closed/Overdue tasks per team member</h3>
    <chart-tasks-per-member
      :members="members"
      :membersData="getData"
      :doneTasks="doneTasks"
      :openTasks="openTasks"
      :overdueTasks="overdueTasks"
    ></chart-tasks-per-member>
</article>
  <article class="bar-tasks-per-member">
    <h3 class="dash-header">High Risk Tasks</h3>
    <chart-high-risk
      :members="members"
      :membersData="getData"
      :doneTasks="doneTasks"
      :openTasks="openTasks"
      :overdueTasks="overdueTasks"
    ></chart-high-risk>
    </article>
  </section>
</template>

<script>
import chartTasksPerMember from "../components/chart-tasks-per-member.vue";
import chartHighRisk from "../components/chart-high-risk.vue";

export default {
  props: { board: Object },
  name: "dashboard",
  components: {
    chartTasksPerMember,
    chartHighRisk,
  },
  created() {
    // this.getLabelsPrices();
    // this.getLabelsInv();
  },
  data() {
    return {
      doneTasks: [],
      openTasks: [],
      overdueTasks: [],
    };
  },
  methods: {},

  computed: {
    getData() {
      const memberCount = []; // [{member: 'Shiran Elad', done: 20, open: 10, overdue: 2 }, {}]
      console.log(this.members);
      this.members.map((m) =>
        memberCount.push({
          member: m,
          doneTasks: 0,
          openTasks: 0,
          overdueTasks: 0,
        })
      );
      console.log(memberCount);
      memberCount.map((member) =>
        this.board.groups.map((group) =>
          group.tasks.map((task) => {
            task.cols[1].value.map((person) => {
              if (
                person.fullname === member.member &&
                task.cols[0].value.toLowerCase() === "done"
              ) {
                // console.log(task.title, person.fullname)
                member["doneTasks"]++;
              }
              if (
                person.fullname === member.member &&
                task.cols[0].value.toLowerCase() !== "done"
              )
                member["openTasks"]++;
              if (
                person.fullname === member.member &&
                task.cols[0].value.toLowerCase() !== "done" &&
                new Date(task.cols[2].value) < Date.now()
              )
                member["overdueTasks"]++;
            });
          })
        )
      );
      // DO NOT TOUCH //
      this.doneTasks = memberCount.map((m) => m.doneTasks);
      this.openTasks = memberCount.map((m) => m.openTasks);
      this.overdueTasks = memberCount.map((m) => m.overdueTasks);
    },

    members() {
      return this.board.members.map((member) => member.fullname);
    },
  },
  unmounted() {},
};
</script>
