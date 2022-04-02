<template>
  <section>
    <h2 class="dash-header">Open/Closed/Overdue tasks per team member</h2>
    <chart-tasks-per-member :data="testData"></chart-tasks-per-member>
    <!-- <h2 class="dash-header">Inventory by Category (%)</h2>
    <toy-chart-inv :data="invData"></toy-chart-inv> -->
  </section>
</template>

<script>
import chartTasksPerMember from "../components/chart-tasks-per-member.vue";
// import toyChartInv from "../components/toy-chart-inv.vue";

export default {
  // props: [''],
  components: {
    chartTasksPerMember,
    // toyChartInv,
  },
  created() {
    // this.getLabelsPrices();
    // this.getLabelsInv();
  },
  data() {
    return {
      testData: {
        // labels: ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"],
        labels: [],
        datasets: [
          {
            data: [0],
            backgroundColor: [
              "#77CEFF",
              "#0079AF",
              "#123E6B",
              "#97B0C4",
              "#A5C8ED",
            ],
          },
        ],
      },
      invData: {
        // labels: ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"],
        labels: [],
        datasets: [
          {
            data: [0],
            backgroundColor: [
              "#77CEFF",
              "#0079AF",
              "#123E6B",
              "#97B0C4",
              "#A5C8ED",
            ],
          },
        ],
      },
    };
  },
  methods: {
    getLabelsPrices() {
      const toys = JSON.parse(JSON.stringify(this.$store.getters.toys));
      var accToys = toys.reduce((acc, toy) => {
        toy.labels.forEach((label) => {
          if (!acc[label]) {
            this.testData.datasets[0].data.push(0);
            this.testData.labels.push(label);
            acc[label] = {
              totalPrice: toy.price,
              qty: 1,
            };
          } else {
            acc[label].totalPrice += toy.price;
            acc[label].qty++;
          }
        });
        return acc;
      }, {});

      // console.log("accToys", accToys);

      for(var label in accToys){
        let idx = this.testData.labels.indexOf(label);
        // console.log('label, idx', label, idx)
        this.testData.datasets[0].data[idx] =
          accToys[label].totalPrice / accToys[label].qty;
      }
    },

    getLabelsInv() {
      const toys = JSON.parse(JSON.stringify(this.$store.getters.toys));
      const labels = {}
      let toysLen = toys.length
      let countToysNotInStock = 0
      /* NOT IN STOCK */
      toys.forEach(toy => {
        if(toy.inStock) return
        countToysNotInStock++
        if(!this.invData.labels.includes('Not in Stock')){
          this.invData.labels.push('Not in Stock')
        } 
      })
      // console.log('countToysNotInStock',countToysNotInStock);
      this.invData.datasets[0].data[0] = countToysNotInStock * 100.0 / toysLen


      var toysInStock = toys.map(toy => {
        if(!toy.inStock) return
        toy.labels.forEach(label => {
          if(!labels[label]){
            labels[label] = 1
            this.invData.labels.push(label)
            this.invData.datasets[0].data.push(0)
          }
          else {
            labels[label]++
          }
        })
      })
        for(var label in labels){
          let idx = this.invData.labels.indexOf(label);
            this.invData.datasets[0].data[idx] = ((labels[label] / toysInStock.length) ) * (countToysNotInStock * 100.0 / toysLen)
        }
      // console.log(toysInStock)
},     


    computed: {},
    unmounted() {},
  },
};
</script>
