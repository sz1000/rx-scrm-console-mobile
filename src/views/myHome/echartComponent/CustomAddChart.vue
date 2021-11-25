<template>
  <div ref="moreLine" style="height: 100%; width: 100%"></div>
</template>

<script>
export default {
  // name: 'moreLine',
  props: {
    // options: {
    //   type: Object,
    //   default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // },
    // monthData: {
    //   type: Array,
    //   default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // },
  },
  data() {
    return {
      monthData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      // console.log(this.monthData, this.options)
      this.initEchart()
    })
  },
  methods: {
    initEchart() {
      this.myChart = this.$echarts.init(this.$refs.moreLine)
      this.myChart.setOption(
        {
          title: {
            text: '客户增长',
            left: '0',
            top: '20',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
            },
          },
          grid: {
            left: 50,
            right: 20,
            bottom: 40,
            top: 100,
          },
          legend: {
            show: false,
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: [
                '1月',
                '2月',
                '3月',
                '4月',
                '5月',
                '6月',
                '7月',
                '8月',
                '9月',
                '10月',
                '11月',
                '12月',
              ],
              axisLine: {
                // lineStyle: {
                //   color: '#cecece',
                // },
              },
              axisLabel: {
                color: '#666',
                interval: 2,
              },
              axisTick: {
                show: false,
              },
              axisPointer: {
                snap: true,
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
              axisTick: {
                show: false,
              },
              axisLine: {
                lineStyle: {
                  color: '#cecece',
                },
              },
              axisLabel: {
                color: '#666',
              },
              splitLine: {
                lineStyle: {
                  // 使用深浅的间隔色
                  color: '#eee',
                  type: 'dashed',
                },
              },
              axisPointer: {
                snap: false,
              },
            },
          ],
          series: [
            {
              name: '客户数',
              type: 'line',
              data: [32, 34, 39, 35, 20, 36, 34, 38, 36, 34, 20, 40],
              // data: this.monthData,
              smooth: false,
              showSymbol: true,
              symbol: 'circle', //标记的图形为实心圆
              lineStyle: {
                normal: {
                  width: 2,
                  color: '#5985EE ', // 线条颜色
                },
              },
              areaStyle: {
                normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: 'rgba(89,133,238, 0.5)', // 0% 处的颜色
                      },
                      // {
                      //   offset: 0.5,
                      //   color: 'rgba(89,133,238, 0.5)', // 0% 处的颜色
                      // },
                      {
                        offset: 1,
                        color: 'rgba(255, 255, 255, 0)', // 100% 处的颜色
                      },
                    ],
                  },
                  shadowColor: '#5985EE',
                  shadowBlur: 5,
                },
              },

              itemStyle: {
                normal: {
                  color: '#5985EE',
                  borderColor: '#fff', //边框
                  borderWidth: 1,
                },
              },
            },
          ],
        },
        true
      )
    },
  },
}
</script>
