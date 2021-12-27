<template>
  <div class="group_wrap">
    <TitleBack title="SOP"></TitleBack>
    <div class="content">
      <div class="item" v-for="(item, index) in sopList" :key="index">
        <div class="item_top">
          <p>{{ item.groupNames }}</p>
          <div>
            定时推送：<span>{{ item.createTimeStr }}</span>
          </div>
        </div>
        <div
          class="customer_card"
          v-for="(item, index) in item.sopContentVOS"
          :key="index"
        >
          <div class="card_li">
            <span class="lable">内容名称</span>
            <div class="rightInfo">{{ item.name }}</div>
          </div>
          <div class="card_li">
            <span class="lable">推送时间</span>
            <div class="rightInfo">{{ item.createTime }}</div>
          </div>
          <div class="card_li">
            <span class="lable">推送内容</span>
            <div class="rightInfo">{{ item.promptTimeMsg }}</div>
          </div>
          <div class="card_li">
            <div class="rightInfo">
              <div class="list">
                <div
                  class="li"
                  v-for="(item, index) in item.sopContentAttachmentVOS"
                  :key="index"
                >
                  <p class="left"></p>
                  <div class="right">
                    <div class="leftImg">
                      <img :src="item.cover" alt="" />
                    </div>
                    <div class="rightText">
                      <p>{{ item.title }}</p>
                      <span>{{ item.url }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TitleBack } from "@/components";
import { sop_groupSopList } from "@/api/sop";
export default {
  components: {
    TitleBack,
  },
  data() {
    return {
      group: this.$route.query.grouid,
      sopList: [],
      list: [
        {
          groupNames: "这是规则名称哈哈哈哈哈哈哈",
          createTimeStr: "2021.11.22",
          sopContentVOS: [
            {
              name: "提醒发送素材文件",
              createTime: "2021.11.22",
              promptTimeMsg: "内容名称",
              sopContentAttachmentVOS: [
                {
                  cover:
                    "https://img0.baidu.com/it/u=2935589232,1367006843&fm=26&fmt=auto",
                  url: "10.png",
                  title: "27.35kb",
                },
                {
                  url: "https://img0.baidu.com/it/u=2935589232,1367006843&fm=26&fmt=auto",
                  cover:
                    "https://jizhoucrm-sit.oss-cn-hangzhou.aliyuncs.com/verbalTrick/article/image/20211203141020464156/DA32DCC6CE6545C4925A3C62D19A7844.png",
                  title: "说明xx",
                },
              ],
            },
            {
              name: "提醒发送素材文件",
              createTime: "2021.11.22",
              promptTimeMsg: "内容xxx",
              sopContentVOS: [],
            },
          ],
        },
        {
          groupNames: "这是规则哈",
          createTimeStr: "2021.11.22",
          sopContentVOS: [
            {
              name: "提醒发送素材文件",
              createTime: "2021.11.22",
              promptTimeMsg: "推送内容",
              sopContentAttachmentVOS: [
                {
                  cover:
                    "https://img0.baidu.com/it/u=2935589232,1367006843&fm=26&fmt=auto",
                  url: "2.png",
                  title: "说明xx",
                },
                {
                  cover:
                    "https://img0.baidu.com/it/u=2935589232,1367006843&fm=26&fmt=auto",
                  url: "1.png",
                  title: "说明xx",
                },
              ],
            },
            {
              name: "提醒发送素材文件",
              createTime: "2021.11.22",
              promptTimeMsg: "hweeeeow",
              sopContentAttachmentVOS: [],
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.getSopList();
  },
  methods: {
    getSopList() {
      //获取sop规则列表
      this.group = 1;
      sop_groupSopList(this.group).then((res) => {
        console.log("获取sop数据");
        console.log(res);
        if (res.result) {
          let list = res.data;
          this.sopList = list;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
.group_wrap {
  width: 100%;
  min-height: 100vh;
  background: @white;
  .content {
    padding: 24px;
    .item {
      .item_top {
        margin: 20px 0;

        p {
          font-size: 32px;
          line-height: 48px;
          font-weight: 600;
          color: #262626;
        }
      }
      .customer_card {
        border: 2px solid #e6e6e6;
        border-radius: 10px;
        padding: 24px;
        margin-bottom: 20px;
        .card_li {
          display: flex;
          font-size: 24px;
          padding: 10px 0;
          .lable {
            width: 120px;
            color: #b3b3b3;
            margin-right: 20px;
          }
          .rightInfo {
            flex: 1;
            color: #262626;

            .list {
              .li {
                display: flex;
                // justify-content: center;
                // align-items: center;
                // margin-bottom: 10px;
                // background: #f7f7f7;
                // border-radius: 4px;
                .left {
                  width: 120px;
                  margin-right: 20px;
                }
                .right {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-bottom: 10px;
                  background: #f7f7f7;
                  border-radius: 4px;
                  .leftImg {
                    width: 80px;
                    height: 80px;
                    margin: 20px;
                    img {
                      width: 80px;
                      height: 80px;
                      object-fit:cover;
                    }
                  }
                  .rightText {
                    width: 360px;
                    span {
                      display: inline-block;
                      color: #262626;
                       width: 360px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                    p {
                      color: #b3b3b3;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>