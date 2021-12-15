<template>
  <div>

    <ul class="tree-box">
      <!-- 最外层 一级 -->
      <li v-for="(parent,index) in treeData" :key="index" class="all-group">
        <div class="tree-header">
          <div class="header-left">
            <i class="el-icon-caret-right" v-show="!parent.isOpen"></i>
            <i class="el-icon-caret-bottom" v-show="parent.isOpen"></i>
            <span class="header-name" @click="groupNameList(parent,index)">{{parent.title}}</span>
          </div>
          <!-- <div class="header-r">
          <div @click="moreDot(parent)">
            <img style="width: 28px; height: 28px"
                 src="../../images/icon_more@2x.png"
                 alt="" />
          </div>
          <ul class="listAlat-box"
              v-if="listTite">
            <li @click="rechristen(item)">重命名</li>
            <li @click="openDelete(item)">删除</li>
          </ul>
        </div> -->
        </div>
        <div class="tree-body" v-show="parent.isOpen">
          <!-- 第二级 -->
          <ul class="child-box">
            <li v-for="(child,childidx) in parent.children" :key="childidx">
              <div class="tree-header ">
                <div class="header-left child-title">
                  <i class="el-icon-caret-right" v-show="!child.isOpen"></i>
                  <i class="el-icon-caret-bottom" v-show="child.isOpen"></i>
                  <span class="header-name" @click="groupNameList(child,index)">{{child.title}}</span>
                </div>
                <div class="header-r" v-show="moreSet == child.id">
                  <div @click="moreDot(child)">
                    <img style="width: 28px; height: 28px" src="../../images/icon_more@2x.png" alt="" />
                  </div>
                  <ul class="listAlat-box" v-if="listTite">
                    <li @click="rechristen(child)">重命名</li>
                    <li @click="openDelete(child)">删除</li>
                  </ul>
                </div>
              </div>
              <ul v-show="child.isOpen">
                <li v-for="(oneitem,oneidx) in child.items" :key='oneidx' class="word-box">
                  <div class="group-box">
                    <img class="group_img" src="../../images/group.png" alt="" @click="shareText(group)" />
                    <span class="word-title">{{oneitem.title}}</span>
                  </div>
                  <div class="word-list">
                    <div v-for="(list,lidx) in oneitem.contentList" :key="lidx" class="slot-box">
                      <div class="text_img">
                        <img class="share_img" src="../../images/share_two@2x.png" alt="" @click="firstShare(list)" />

                        <div class="text-value">
                          {{list.value}}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="tree-body" v-show="child.isOpen">
                <!-- 第三级 -->
                <ul class="child-box">
                  <li v-for="(grandson,grandindex) in child.children" :key="grandindex" class="word-box">
                    <div class="tree-header ">
                      <div class="header-left three-title">
                        <i class="el-icon-caret-right" v-show="!grandson.isOpen"></i>
                        <i class="el-icon-caret-bottom" v-show="grandson.isOpen"></i>
                        <span class="header-name" @click="groupNameList(grandson,index)">{{grandson.title}}</span>
                      </div>
                      <div class="header-r" v-show="moreSet == grandson.id">
                        <div @click="moreDot(grandson)">
                          <img style="width: 28px; height: 28px" src="../../images/icon_more@2x.png" alt="" />
                        </div>
                        <ul class="listAlat-box" v-if="listTite">
                          <li @click="rechristen(grandson)">重命名</li>
                          <li @click="openDelete(grandson)">删除</li>
                        </ul>
                      </div>
                    </div>
                    <div class="tree-body" v-show="grandson.isOpen">
                      <ul>
                        <li v-for="(grandword,grandidx) in grandson.items" :key='grandidx' class="word-box">
                          <div class="group-box">
                            <img class="group_img" src="../../images/group.png" alt="" @click="shareText(grandword)" />
                            <span class="word-title">{{grandword.title}}</span>
                          </div>
                          <div class="word-list">
                            <div v-for="(list,lidx) in grandword.contentList" :key="lidx" class="slot-box">
                              <div class="text_img">
                                <img class="share_img" src="../../images/share_two@2x.png" alt="" @click="firstShare(list)" />

                                <div class="text-value">
                                  {{list.value}}
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <van-button type="primary" @click="mainClick">主要按钮</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listTite: false,
      moreSet: null,
      treeData: [
        {
          id: 0,
          title: '全部分组',
          isOpen: false,
          children: [
            {
              id: 1,
              title: '默认分组',
              isOpen: false,
              items: [
                {
                  title: '话术标题1',
                  contentList: [
                    {
                      value: '话术1-1',
                    },
                    {
                      value: '话术1-2',
                    },
                  ],
                },
                {
                  title: '话术标题2',
                  contentList: [
                    {
                      value: '话术2-1',
                    },
                    {
                      value: '话术2-2',
                    },
                  ],
                },
              ],
              children: [
                {
                  id: 1.1,
                  title: '默认子分组1',
                  isOpen: false,
                  items: [
                    {
                      title: '子分组1话术标题1',
                      contentList: [
                        {
                          value: '子分组1话术1-1',
                        },
                        {
                          value: '子分组1话术1-2',
                        },
                      ],
                    },
                    {
                      title: '子分组2话术标题2',
                      contentList: [
                        {
                          value: '子分组2话术2-1',
                        },
                        {
                          value: '子分组2话术2-2',
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 1.2,
                  title: '默认子分组2',
                  isOpen: false,
                  items: [],
                },
              ],
            },
            {
              id: 2,
              title: '父分组',
              isOpen: false,
              children: [
                {
                  id: 2.1,
                  title: '2下面的子分组',
                  isOpen: false,
                  items: [],
                },
              ],
            },
          ],
        },
      ],
    }
  },
  methods: {
    groupNameList(p, i) {
      console.log('----分组---', p, i)
      p.isOpen = !p.isOpen
      this.moreSet = p.id
    },
    moreDot(v) {
      // console.log('-----v-----', v)
      this.listTite = !this.listTite
    },
    rechristen() {},
    openDelete() {},
    shareText(item) {},
    firstShare(item) {},
    mainClick() {
      // this.getB('1', { msg: '1231', qer: 'cc' }, 'hahdha')
      let a = '1',
        b = 2,
        c = 3
      var obj = { a, b, c }
      console.log(obj)
    },
    getB(a, b, c) {
      console.log(a, b, c)
      let { msg, qer } = b
      let resDate = {
        a,
        obj: {
          msg,
          qer,
        },
        c,
      }
      console.log(resDate, '====resDate====')
    },
  },
}
</script>
<style lang="less" scoped>
.tree-box {
  padding: 24px;
  .tree-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 28px;
    padding: 5px 16px;
    .header-left {
      span {
        display: inline-block;
      }
      .header-name {
      }
    }
    .header-r {
      .listAlat-box {
        padding: 24px 0;
        width: 236px;
        height: 208px;
        background: #ffffff;
        box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        position: absolute;
        right: 0;
        text-align: center;
        box-sizing: border-box;
        li {
          width: 188px;
          height: 80px;
          margin: 0 auto;
          line-height: 80px;
        }
      }
    }
    .child-title {
      padding-left: 20px;
    }
    .three-title {
      // padding-left: 40px;
    }
  }
  .word-box {
    padding-left: 40px;
    .group-box {
      display: flex;
      align-items: center;
      margin: 28px 0;
      .group_img {
        width: 48px;
        height: 48px;
        // margin-right: 16px;
      }
      .group-box {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .word-list {
      // width: 638px;
      // height: 752px;
      background: #fafbff;
      border-radius: 8px;
      border: 1px solid #d9dae4;
      padding: 24px;
      .slot-box {
        margin-bottom: 24px;
        .text_img {
          display: flex;
          align-items: center;
          .share_img {
            width: 26px;
            height: 26px;
            margin-right: 23px;
          }
          .text-value {
            width: 542px;
            height: 88px;
            background: #ffffff;
            border-radius: 8px;
            border: 1px solid #d9dae4;
            padding: 24px;
            box-sizing: border-box;
          }
        }
      }
    }
  }
  .sun-box {
  }
}
</style>