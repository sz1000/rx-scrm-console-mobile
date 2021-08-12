<template>
  <div>
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad">
      <!-- <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"> -->
      <van-cell v-for="item in list"
                :key="item"
                :title="item" />
    </van-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, //请求第几页
      pageSize: 10, //每页请求的数量
      total: 0, //总共的数据条数
    }
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      console.log(111111111)
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
  },
}
</script>