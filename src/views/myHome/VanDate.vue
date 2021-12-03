<template>
  <van-picker :title="title" :show-toolbar="showToolbar" :columns="columns" @confirm="onConfirm" @cancel="onCancel" @change="onChange"
              :confirm-button-text="confirmButtonText" :cancel-button-text="cancelButtonText" :loading="loading" :readonly="readonly"
              :item-height="itemHeight" :visible-item-count="visibleItemCount" :swipe-duration="swipeDuration">
    <template slot="default">
      <slot name="default"></slot>
    </template>
    <template slot="title">
      <slot name="title"></slot>
    </template>
    <template slot="confirm">
      <slot name="confirm"></slot>
    </template>
    <template slot="cancel">
      <slot name="cancel"></slot>
    </template>
    <template slot="option">
      <slot name="option"></slot>
    </template>
    <template slot="columns-top">
      <slot name="columns-top"></slot>
    </template>
    <template slot="columns-bottom">
      <slot name="columns-bottom"></slot>
    </template>
  </van-picker>
</template>

<script>
import Vue from 'vue'
import { Field, Picker, Popup } from 'vant'
Vue.use(Field).use(Picker).use(Popup)

export default {
  name: 'VanDatePicker',
  props: {
    value: {
      type: Date,
      default: () => new Date(),
    },
    minDate: {
      type: Date,
      default: () => new Date(new Date().getFullYear() - 5, 0, 1),
    },
    maxDate: {
      type: Date,
      default: () => new Date(new Date().getFullYear() + 5, 0, 1),
    },
    showToolbar: {
      type: Boolean,
      default: () => false,
    },
    title: {
      type: String,
      default: () => '',
    },
    confirmButtonText: {
      type: String,
      default: () => '确认',
    },
    cancelButtonText: {
      type: String,
      default: () => '取消',
    },
    loading: {
      type: Boolean,
      default: () => false,
    },
    readonly: {
      type: Boolean,
      default: () => false,
    },
    itemHeight: {
      type: Number || String,
      default: () => 44,
    },
    visibleItemCount: {
      type: Number || String,
      default: () => 6,
    },
    swipeDuration: {
      type: Number || String,
      default: () => 1000,
    },
  },
  data() {
    return {
      monthArr: [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
      ],
      dayArr: [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
        '31',
      ],
    }
  },

  computed: {
    columns: function () {
      let minYear = this.minDate.getFullYear()
      let maxYear = this.maxDate.getFullYear()
      let year = this.value.getFullYear()
      let month = this.value.getMonth()
      let day = this.value.getDate()
      let yearArr = []
      let i = 0
      while (i < maxYear - minYear + 1) {
        yearArr.unshift(maxYear - i + '')
        i++
      }
      let columns = [
        {
          values: yearArr,
          defaultIndex: Math.floor(year) - minYear,
        },
        {
          values: this.monthArr,
          defaultIndex: Math.floor(month),
        },
        {
          values: this.dayArr,
          defaultIndex: Math.floor(day - 1),
        },
        {
          values: ['-'],
        },
        {
          values: yearArr,
          defaultIndex: Math.floor(year) - minYear,
        },
        {
          values: this.monthArr,
          defaultIndex: Math.floor(month),
        },
        {
          values: this.dayArr,
          defaultIndex: Math.floor(day - 1),
        },
      ]
      return columns
    },
  },

  watch: {},

  methods: {
    onConfirm(value, index) {
      // console.log(`当前值：${value}, 当前索引：${index}`);
      this.$emit('confirm', value, index)
    },
    onChange(picker, value, index) {
      // console.log(`当前值：${value}, 当前索引：${index}`);
      let _this = this

      let minMonth = this.minDate.getMonth()
      let minDay = this.minDate.getDate()
      let maxMonth = this.maxDate.getMonth()
      let maxDay = this.maxDate.getDate()
      let d = new Date(value[0], value[1], 0)

      setDate(0)
      setDate(4)
      function setDate(i) {
        //最小年份
        if (value[i] - 0 === _this.minDate.getFullYear()) {
          picker.setColumnValues(i + 1, _this.monthArr.slice(minMonth))
          let strMinM = ''
          if (minMonth < 9) {
            strMinM = '0' + (minMonth + 1)
          } else {
            strMinM = strMinM + 1 + ''
          }
          picker.setColumnValue(
            i + 1,
            value[i + 1] - 1 < minMonth ? strMinM : value[i + 1]
          )

          if (index === i && value[i + 1] - 1 < minMonth) {
            picker.setColumnValues(
              i + 2,
              _this.dayArr.slice(minDay - 1, d.getDate())
            )
            picker.setColumnValue(
              i + 2,
              value[i + 2] < minDay ? minDay.toString() : value[i + 2]
            )
          } else {
            if (value[i + 1] - 1 === _this.minDate.getMonth()) {
              picker.setColumnValues(
                i + 2,
                _this.dayArr.slice(minDay - 1, d.getDate())
              )
              picker.setColumnValue(
                i + 2,
                value[i + 2] < minDay ? minDay.toString() : value[i + 2]
              )
            } else {
              picker.setColumnValues(i + 2, _this.dayArr.slice(0, d.getDate()))
              picker.setColumnValue(
                i + 2,
                value[i + 2] > d.getDate()
                  ? d.getDate().toString()
                  : value[i + 2]
              )
            }
          }
        }
        //最大年份
        else if (value[i] - 0 === _this.maxDate.getFullYear()) {
          picker.setColumnValues(i + 1, _this.monthArr.slice(0, maxMonth + 1))
          let strManM = ''
          if (maxMonth < 9) {
            strManM = '0' + (maxMonth + 1)
          } else {
            strManM = maxMonth + 1 + ''
          }
          picker.setColumnValue(
            i + 1,
            value[i + 1] - 1 > maxMonth ? strManM : value[i + 1]
          )
          if (index === i && value[i + 1] - 1 > maxMonth) {
            picker.setColumnValues(i + 2, _this.dayArr.slice(0, maxDay))
            picker.setColumnValue(
              i + 2,
              value[i + 2] > maxDay ? maxDay.toString() : value[i + 2]
            )
          } else {
            if (value[i + 1] - 1 === _this.maxDate.getMonth()) {
              picker.setColumnValues(i + 2, _this.dayArr.slice(0, maxDay))
              picker.setColumnValue(
                i + 2,
                value[i + 2] > maxDay ? maxDay.toString() : value[i + 2]
              )
            } else {
              picker.setColumnValues(i + 2, _this.dayArr.slice(0, d.getDate()))
              picker.setColumnValue(
                i + 2,
                value[i + 2] > d.getDate()
                  ? d.getDate().toString()
                  : value[i + 2]
              )
            }
          }
        }
        //其他年份
        else {
          picker.setColumnValues(i + 1, _this.monthArr)
          picker.setColumnValue(i + 1, value[i + 1])
          picker.setColumnValues(i + 2, _this.dayArr.slice(0, d.getDate()))
          picker.setColumnValue(
            i + 2,
            value[i + 2] > d.getDate() ? d.getDate().toString() : value[i + 2]
          )
        }
      }

      let finallyVal = picker.getValues()
      let len = Math.floor(finallyVal.length / 2)
      //开始时间不大于结束时间
      if (
        finallyVal.slice(0, len).join('') > finallyVal.slice(len + 1).join('')
      ) {
        picker.setValues([
          ...finallyVal.slice(0, len),
          '-',
          ...finallyVal.slice(0, len),
        ])
        if (
          new Date(
            finallyVal.slice(0, len).join('-') + ' 00:00:00'
          ).getTime() === this.maxDate.getTime()
        ) {
          // console.log(111)
          picker.setColumnValues(5, _this.monthArr.slice(0, maxMonth + 1))
          picker.setColumnValues(6, _this.dayArr.slice(0, maxDay))
        }
      }

      this.$emit('change', picker, finallyVal, index)
    },
    onCancel() {
      // console.log('取消');
      this.$emit('cancel')
    },
  },
}
</script>

<style scoped>
</style>