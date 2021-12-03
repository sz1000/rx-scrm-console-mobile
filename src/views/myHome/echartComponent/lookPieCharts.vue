<template>
  <div class="charts" ref="lookPieCharts"></div>
</template>

<script>
export default {
  name: 'LookPieCharts',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      color: ['#25F3E6', '#9F81E5', '#FFC107', '#FD8383', '#4285F4'],
      myChart: null,
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  watch: {
    data() {
      this.initChart()
    },
    // clientWidth() {
    //   this.initChart()
    // },
    // minChartHeight() {
    //   this.initChart()
    // },
  },
  methods: {
    initChart() {
      // console.log(this.data, '-----')
      var option = {
        title: {
          text: '内容浏览效果图',
          left: '10',
          top: '20',
        },
        grid: {
          left: 50,
          right: 20,
          bottom: 40,
          top: 100,
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/> {b} : {c} ({d}%)',
        },
        toolbox: {
          show: true,
        },
        series: [
          {
            name: '浏览时长',
            type: 'pie',
            radius: [20, 90],
            center: ['50%', '56%'],
            color: this.color,
            roseType: 'area',
            label: {
              color: '#3C4353',
            },
            labelLine: {
              length: 1,
              length2: 10,
            },
            data: this.data,
          },
        ],
      }
      this.myChart = this.$echarts.init(this.$refs.lookPieCharts)
      this.myChart.resize()
      if (this.data) {
        this.myChart.setOption(option)
      } else {
        this.myChart.clear()
      }
    },
  },
}
</script>

<style lang="less" scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>