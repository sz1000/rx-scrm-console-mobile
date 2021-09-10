
<style lang="less" scoped>
.tree-box {
  background: white;
  font-size: 14px;
  color: #323232;
  .corner {
    position: absolute;
    top: 5px;
    width: 0px;
    height: 0px;
    border: 10px solid #a0a0a0;
    border-bottom-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
  }
  .gray {
    color: gray;
  }
  .tree-header {
    display: flex;
    line-height: 20px;
    .header-left {
      position: relative;
      flex: 1;
      min-width: 20px;
      max-width: 20px;
      margin-right: 5px;
    }
    .header-mid {
      flex: 1;
    }
    .header-right {
      position: relative;
      white-space: nowrap;
      max-width: 60px;
      min-width: 60px;
      flex: 1;
      margin-left: 5px;
    }
  }
  .out-panel {
    padding-left: 20px;
  }
  .child-panel {
    padding-left: 20px;
  }
  .out-li {
    margin-bottom: 20px;
  }
  .item-box {
    padding: 20px;
    background-color: #f5f5f5;
    .item-li {
      display: flex;
      margin-bottom: 20px;
      background: white;
      border-radius: 6px;
      border: 1px solid #ccc;
      img {
        flex: 1;
        max-width: 60px;
        min-width: 60px;
        margin-right: 10px;
      }
    }
  }
  .up {
    display: flex;
    justify-content: flex-end;
  }
}
</style>

<template>
  <div>
    <div class="tree-box">
      <div v-for="(item, i) in treeData"
           :key="i + 'out'"
           class="out-li">
        <div class="tree-header">
          <span class="header-left">
            <span class="corner"></span>
          </span>
          <span class="header-mid">{{item.label}} <span class="gray">({{treeData.length}})</span></span>
          <span class="header-right"
                @click.stop="item.isOpen=true">
            展开
            <span class="corner"></span>
          </span>
        </div>
        <div class="tree-body"
             v-show="item.isOpen">
          <div class="out-panel"
               v-for="(group,gi) in item.items"
               :key="gi">
            <div>
              <p>{{item.title}}</p>
              <div class="item-box">
                <div v-for="(chi, c) in group.contentList"
                     :key="c + 'in'"
                     class="item-li"
                     @click.stop="_down(chi)">
                  <img :src="chi.icon"
                       alt="">
                  <div>
                    <p>{{chi.title}}</p>
                    <p class="gray">{{chi.size}}</p>
                  </div>
                </div>
                <div class="up"
                     @click.stop="item.isOpen=false">{{item.label}}-收起</div>
              </div>
            </div>
          </div>
          <div class="child-panel">
            <div v-for="(sub, k) in item.children"
                 :key="k + 'chi'"
                 class="out-li">
              <div class="tree-header">
                <span class="header-left">
                  <span class="corner"></span>
                </span>
                <span class="header-mid">{{sub.label}} <span class="gray">({{sub.length}})</span></span>
                <span class="header-right"
                      @click.stop="sub.isOpen=true">
                  展开
                  <span class="corner"></span>
                </span>
              </div>
              <div v-show="sub.isOpen"
                   class="out-panel"
                   v-for="(ch,ci) in sub.items"
                   :key="ci">
                <p>{{sub.title}}</p>
                <div class="item-box">
                  <div v-for="(ss, s) in ch.contentList"
                       :key="s + 'in-in'"
                       class="item-li"
                       @click.stop="_down(ss)">
                    <img :src="ss.icon"
                         alt="">
                    <div>
                      <p>{{ss.title}}</p>
                      <p class="gray">{{ss.size}}</p>
                    </div>
                  </div>
                  <div class="up"
                       @click.stop="sub.isOpen=false">{{item.label}}-{{sub.label}}收起</div>
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
export default {
  name: 'index',
  components: {},
  data() {
    return {
      treeData: [
        {
          label: '分组1',
          title: '这是话术标题',
          isOpen: true,
          items: [
            {
              contentList: [
                {
                  title: 'hahahhahah',
                },
                {
                  title: '222222222',
                },
              ],
              icon: 'http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123',
              title: '图片的标题.png',
              size: '27.35k',
              url: 'https://www.xinghuijin.com/',
            },
            {
              icon: 'http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123',
              title: '公司简介.pdf',
              size: '729k',
              url: 'https://www.xinghuijin.com/',
            },
            {
              icon: 'http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123',
              title: '瑞信科技',
              size: 'Wera sorry xxxxxx',
              url: 'https://www.xinghuijin.com/',
            },
          ],
          children: [
            {
              label: '子分组1',
              title: '这是话术标题',
              isOpen: false,
              items: [
                {
                  contentList: [
                    {
                      title: '1-1-1',
                    },
                    {
                      title: '1-1-2',
                    },
                  ],
                  icon: 'http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123',
                  title: '图片的标题.png',
                  size: '27.35k',
                  url: 'https://www.xinghuijin.com/',
                },
                {
                  icon: 'http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123',
                  title: '公司简介.pdf',
                  size: '729k',
                  url: 'https://www.xinghuijin.com/',
                },
                {
                  icon: 'http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123',
                  title: '瑞信科技',
                  size: 'Wera sorry xxxxxx',
                  url: 'https://www.xinghuijin.com/',
                },
              ],
            },
            {
              label: '子分组2',
              title: '这是话术标题',
              isOpen: false,
              items: [
                {
                  icon: 'http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123',
                  title: '图片的标题.png',
                  size: '27.35k',
                  url: 'https://www.xinghuijin.com/',
                },
                {
                  icon: 'http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123',
                  title: '公司简介.pdf',
                  size: '729k',
                  url: 'https://www.xinghuijin.com/',
                },
                {
                  icon: 'http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123',
                  title: '瑞信科技',
                  size: 'Wera sorry xxxxxx',
                  url: 'https://www.xinghuijin.com/',
                },
              ],
            },
          ],
        },
        {
          label: '分组2',
          title: '这是话术标题',
          isOpen: false,
          items: [
            {
              icon: 'http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123',
              title: '图片的标题.png',
              size: '27.35k',
              url: 'https://www.xinghuijin.com/',
            },
            {
              icon: 'http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123',
              title: '公司简介.pdf',
              size: '729k',
              url: 'https://www.xinghuijin.com/',
            },
            {
              icon: 'http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123',
              title: '瑞信科技',
              size: 'Wera sorry xxxxxx',
              url: 'https://www.xinghuijin.com/',
            },
          ],
          children: [
            {
              label: '子分组1',
              title: '这是话术标题',
              isOpen: false,
              items: [
                {
                  icon: 'http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123',
                  title: '图片的标题.png',
                  size: '27.35k',
                  url: 'https://www.xinghuijin.com/',
                },
                {
                  icon: 'http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123',
                  title: '公司简介.pdf',
                  size: '729k',
                  url: 'https://www.xinghuijin.com/',
                },
                {
                  icon: 'http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123',
                  title: '瑞信科技',
                  size: 'Wera sorry xxxxxx',
                  url: 'https://www.xinghuijin.com/',
                },
              ],
            },
            {
              label: '子分组2',
              title: '这是话术标题',
              isOpen: false,
              items: [
                {
                  icon: 'http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123',
                  title: '图片的标题.png',
                  size: '27.35k',
                  url: 'https://www.xinghuijin.com/',
                },
                {
                  icon: 'http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123',
                  title: '公司简介.pdf',
                  size: '729k',
                  url: 'https://www.xinghuijin.com/',
                },
                {
                  icon: 'http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123',
                  title: '瑞信科技',
                  size: 'Wera sorry xxxxxx',
                  url: 'https://www.xinghuijin.com/',
                },
              ],
            },
          ],
        },
      ],
    }
  },
  methods: {
    _down(item) {
      window.open(item.url)
    },
  },
}
</script>
