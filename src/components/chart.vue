<template>
  <DoughnutChart :chartData="testData" />
</template>

<script>
import { DoughnutChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default {
  name: 'chart',
  props: {
    status: Object,
  },
  components: { DoughnutChart },
  created() {
    console.log(status)
  },
  data() {
    return {
      testData: {
        labels:[],
        datasets: [
          {
            data: [],
            backgroundColor: [
              '#77CEFF',
              '#0079AF',
              '#123E6B',
              '#97B0C4',
              '#A5C8ED',
            ],
          },
        ],
      },
    }
  },
}
</script>
