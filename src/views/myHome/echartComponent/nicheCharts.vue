<template>
  <div class="charts_box">
    <div class="type_box">
      <div class="type" v-for="(item,i) in color" :key="i">
        <div class="dot" :style="{'background':item}"></div>
        <div class="text">{{nameList[i]}}</div>
      </div>
    </div>
    <div class="charts" ref="nicheCharts"></div>
  </div>
</template>

<script>
export default {
  name: 'NicheCharts',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    time: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      myChart: null,
      color: ['#81E5A4', '#F15050', '#E9ECEF'],
      nameList: ['成交', '输单', '无效'],
    }
  },
  computed: {},
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
      let seriesData = [],
        data = {
          0: [], //dealCount 成交
          1: [], //lostCount 输单
          2: [], //invalidCount 失效
        }
      this.time.forEach((el) => {
        data[0].push(this.data[el].dealCount)
        data[1].push(this.data[el].lostCount)
        data[2].push(this.data[el].invalidCount)
      })
      let areaStyle = {
        color: 'rgba(241,80,80,0.04)',
      }
      this.color.forEach((el, i) => {
        let obj = {
          name: this.nameList[i],
          type: 'line',
          smooth: true,
          color: el,
          symbolSize: 6,
          itemStyle: {
            borderWidth: 2,
          },
          lineStyle: {
            width: 4,
          },
          areaStyle: el == '#F15050' ? areaStyle : null,
          data: data[i],
        }
        seriesData.push(obj)
        // console.log('---seriesData---', seriesData)
      })
      var option = {
        title: {
          text: '商机报告',
          left: '10',
          top: '20',
        },
        grid: {
          left: 'left',
          bottom: 20,
          top: 80,
          right: 45,
          left: 20,
          containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
          // axisPointer: {
          //     type: 'line',
          //     lineStyle: {
          //         type: 'dashed',
          //         color: '#eee'
          //     },
          // }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#eee',
              type: 'dashed',
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#eee',
              type: 'dashed',
            },
          },
          axisLabel: {
            color: '#838a9d',
          },
          data: this.time,
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#838a9d',
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#eee',
              type: 'dashed',
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#eeeeee',
              type: 'dotted',
            },
          },
          minInterval: 1,
        },
        series: seriesData,
      }
      this.myChart = this.$echarts.init(this.$refs.nicheCharts)
      this.myChart.resize()
      if (this.time) {
        this.myChart.setOption(option)
      } else {
        this.myChart.clear()
      }
    },
  },
}
</script>

<style lang="less" scoped>
.charts_box {
  width: 100%;
  height: 100%;
  position: relative;
  .type_box {
    display: flex;
    position: absolute;
    left: 50%;
    top: 80px;
    transform: translateX(-50%);
    .type {
      margin-right: 32px;
      display: flex;
      align-items: center;
      &:last-child {
        margin-right: 0;
      }
      .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #81adf8;
        margin-right: 4px;
      }
      .text {
        font-size: 20px;
        line-height: 16px;
        color: #838a9d;
      }
    }
  }
  .charts {
    width: 100%;
    height: 100%;
  }
}
</style>