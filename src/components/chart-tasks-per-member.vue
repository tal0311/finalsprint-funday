<template>
  <DoughnutChart :chartData="testData" />
</template>

<script>
import { DoughnutChart, BarChart, useBarChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { ref, computed, defineComponent } from '@vue/composition-api';
import { shuffle } from 'lodash';


Chart.register(...registerables)

export default {
  name: 'chart',
  props: {
    data: Object,
  },
  components: { BarChart},
  created() {
    console.log(this.board.members)
  },
  data() {
    return {
      testData: {
      labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
        datasets: [
          {
            data: ref([30,40,60,7,5]),
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
