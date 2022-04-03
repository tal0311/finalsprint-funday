<template>
  <DoughnutChart
    :chart-options="chartOptions"
    :chart-data="chartData"
    :width="width"
    :height="height"
  />
</template>

<script>
import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: "high-risk-chart",
  components: { DoughnutChart },
  props: {
    chartData : Object,
    
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
  },
  created() {
  },

  data() {
    return {
      chartData: {
        labels: ['Stuck', 'Working on it', 'Not started', 'Overdue'],
        datasets: [
          {
            label: "Done",
            data: this.chartData,
            backgroundColor: ["#f62b54","#00ca72",'gray', 'maroon']
          },
        ],
      },
     
    };
  },
  methods: {
    
  },

  computed: {
    board() {
      return this.$store.getters.currBoard;
    },
  },
};
</script>
