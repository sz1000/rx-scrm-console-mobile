<template>
  <div class="charts" ref="topBarCharts"></div>
</template>

<script>
export default {
  name: 'TopBarCharts',
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
  },
  methods: {
    initChart() {
      var echarts = this.$echarts
      let yLabel = [
        '幼儿园奥术大师多',
        '小四奥术大师多',
        '小五奥术大师多',
        '小六奥术大师多',
        '初一奥术大师多',
        '初二奥术大师多',
        '初三',
        '高一',
        '高二',
        '高三',
      ]
      let yData = [90, 80, 70, 68, 59, 46, 34, 28, 20, 11]
      let bgData = []
      ;(yData = []), (yLabel = [])
      this.data.forEach((el) => {
        yData.push(el.value)
        yLabel.push(el.name)
      })
      for (let i in yData) {
        bgData.push(100)
      }
      var option = {
        title: {
          text: '优质内容TOP10',
          left: '10',
          top: '20',
        },
        grid: {
          left: 'left',
          bottom: 0,
          top: 70,
          right: 20,
          left: 20,
          containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
          },
          formatter: function (params) {
            return (
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
              params[0].name
            )
          },
        },
        xAxis: {
          show: false,
          type: 'value',
        },
        yAxis: [
          {
            type: 'category',
            inverse: true,
            axisLabel: {
              show: true,
              margin: 15,
              fontSize: 14,
              color: '#3C4353',
              formatter: function (value) {
                return value.length > 4 ? value.substring(0, 4) + '...' : value
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            data: yLabel,
          },
          {
            type: 'category',
            inverse: true,
            axisTick: 'none',
            axisLine: 'none',
            show: true,
            axisLabel: {
              margin: 20,
              textStyle: {
                color: '#3C4353',
                fontSize: '16',
              },
              formatter: '{value}%',
            },
            data: yData,
          },
        ],
        series: [
          {
            type: 'bar',
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: [30, 30, 30, 30],
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: '#81ADF8',
                  },
                  {
                    offset: 1,
                    color: '#4285F4',
                  },
                ]),
                shadowBlur: 0,
                shadowColor: 'rgba(87,220,222,0.7)',
              },
            },
            barWidth: 14,
            data: yData,
          },
          {
            name: '背景',
            type: 'bar',
            barWidth: 14,
            barGap: '-100%',
            data: bgData,
            itemStyle: {
              normal: {
                color: '#F0F2F7',
                barBorderRadius: [30, 30, 30, 30],
              },
            },
            emphasis: {
              itemStyle: {
                color: '#F0F2F7',
              },
            },
          },
        ],
      }
      this.myChart = this.$echarts.init(this.$refs.topBarCharts)
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