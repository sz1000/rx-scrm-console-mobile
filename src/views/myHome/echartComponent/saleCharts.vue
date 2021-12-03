<template>
  <div class="charts_box">
    <div class="type_box">
      <div class="type" v-for="(item,i) in nameList" :key="i">
        <div class="text">{{nameList[i]}}</div>
      </div>
    </div>
    <div class="charts" ref="saleCharts"></div>
  </div>
</template>

<script>
export default {
  name: 'SaleCharts',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      myChart: null,
      color: ['#FB93A7', '#FDCC89', '#B9AFF1', '#85A9FC', '#76D5C6'],
      nameList: [
        '阶段一',
        '阶段二',
        '阶段三',
        '阶段四',
        '阶段五',
        '阶段六',
        '阶段七',
        '阶段八',
        '阶段九',
        '阶段十',
        '成交',
      ],
    }
  },
  computed: {
    // clientWidth(){
    //     return this.$store.getters.clientWidth
    // },
    // minChartHeight(){
    //     return this.$store.getters.dataChartsHeight
    // },
    list() {
      let list = this.data.filter((el) => {
        return el.name != 'total'
      })
      list.forEach((el) => {
        let str = (el.num / this.total) * 100
        let arr = str.toString().split('.')
        el.value = arr.length == 2 && arr[1].length > 1 ? str.toFixed(2) : str
      })
      return list
    },
    total() {
      let arr = this.data.find((el) => {
        return el.name == 'total'
      })
      return arr ? arr.num : 0
    },
    min() {
      let list = this.list,
        num = 0
      if (list.length) {
        num = list[list.length - 1].value
      }
      return num + 1
    },
    max() {
      let list = this.list,
        num = 0
      if (list.length) {
        num = list[1].value
      }
      num = this.total - (this.total - num)
      return num
    },
  },
  mounted() {
    this.$nextTick(() => {
      // console.log(this.data)
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
      var option = {
        title: {
          text: '销售漏斗',
          left: '10',
          top: '20',
        },
        grid: {
          left: 'left',
          bottom: 0,
          top: 70,
          right: 20,
          left: 20,
        },
        tooltip: {
          trigger: 'item',
          formatter: (v) => {
            let i = v.data.id - 1
            // console.log('v',this.nameList[i])
            return this.nameList[i] + '：' + v.data.num
          },
        },
        series: [
          {
            name: '漏斗图',
            type: 'funnel',
            left: '36%',
            right: 50,
            top: 60,
            bottom: 20,
            width: '52%',
            height: 'auto',
            min: this.min,
            max: this.max,
            // min: 2,
            // max: 90,
            minSize: '50',
            gap: 0,
            color: ['#FB93A7', '#FDCC89', '#B9AFF1', '#85A9FC', '#76D5C6'],
            label: {
              show: true,
              position: 'inside',
              fontSize: 12,
              formatter: '{c}%',
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid',
              },
            },
            itemStyle: {
              borderWidth: 0,
            },
            data: this.list,
          },
        ],
      }
      this.myChart = this.$echarts.init(this.$refs.saleCharts)
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
.charts_box {
  width: 100%;
  height: 100%;
  position: relative;
  .type_box {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 20px;
    top: 24%;
    // top: 90px;
    .type {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      position: relative;
      &::before {
        content: '';
        width: 200px;
        height: 1px;
        background: #f0f2f7;
        position: absolute;
        right: -10px;
        top: 50%;
        transform: translate(100%, -50%) scaleY(0.5);
      }
      &:last-child {
        margin-bottom: 0;
      }
      .text {
        font-size: 14px;
        line-height: 20px;
        color: #3c4353;
      }
    }
  }
  .charts {
    width: 100%;
    height: 100%;
  }
}
</style>