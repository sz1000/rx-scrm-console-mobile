<template>
  <div>
    <div class="warp-bg">
      <!-- 标题 -->
      <div class="headerTitle">
        <div class="backPage" @click="goBack">
          <van-icon name="arrow-left" />
          返回
        </div>
        <span class="textTitle">快捷回复</span>
      </div>
      <!-- 头部 -->
      <!-- <div class="warp-box">
        <div class="head">
          <div>
            <van-nav-bar>
              <template #left>
                <i class="el-icon-message-solid"></i>
                <span class="sop-tite family-regular">[个人SOP]</span>
                <span class="message">1条消息待发送</span>
              </template>
              <template #right>
                <span class="ck-text">查看</span><van-icon name="arrow-down" />
              </template>
            </van-nav-bar>
          </div>
        </div>
      </div> -->
      <!-- tabMenu -->
      <div class="tabMenu">
        <div class="tabBtn">
          <span
            :class="{ active: tabClick == 1 }"
            class="mycule"
            @click="myclue(1)"
            >个人话术</span
          >
          <span
            :class="{ active: tabClick == 2 }"
            class="mycule"
            @click="myclue(2)"
            >公共话术</span
          >
        </div>
        <span class="addBtn" @click="newaddClick">
          <img src="../../images/icon_add@2x.png" alt="" />
          新增
        </span>
      </div>
      <!-- 查询 -->
      <div class="searchInput">
        <input
          type="text"
          class="input"
          v-model="inputValue"
          placeholder="请输入内容"
        />
        <span @click="queryCenten" class="searchBtn">查询</span>
      </div>
      <!-- center列表  @click="addGroups"-->
      <div v-if="tabClick == 1" class="pd-24">
        <div class="newgrouping" @click="addGroups">
          <img class="newgrp-img" src="../../images/iconadd.png" alt="" />
          <span class="add-grp">添加分组</span>
        </div>
        <div>
          <template>
            <!-- <el-tree
              :data="data"
              :props="defaultProps"
              accordion
              @node-click="handleNodeClick"
            >
            </el-tree> -->
            <div>
              <div>
                <div class="tree-box">
                  <div
                    v-for="(item, i) in treeData"
                    :key="i + 'out'"
                    class="out-li"
                  >
                    <div class="tree-header">
                      <span class="header-left">
                        <span class="corner"></span>
                      </span>
                      <span class="header-mid" @click="groupNameList(item)"
                        >{{ item.name }}
                        <span class="gray"
                          >({{ item.children.length }})</span
                        ></span
                      >
                      <!-- <span
                        class="header-right"
                        @click.stop="item.isOpen = !item.isOpen"
                      >
                        展开1
                        <span class="corner"></span>
                      </span> -->
                      <!-- <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="a">黄金糕</el-dropdown-item>
                          <el-dropdown-item command="b">狮子头</el-dropdown-item>
                          <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown> -->

                      <div>
                        <img src="" alt="" />
                      </div>
                    </div>

                    <div v-show="isOpen" class="out-panel">
                      <div class="warp_group">
                        <img
                          class="group_img"
                          src="../../images/group.png"
                          alt=""
                        />
                        <p class="title_verba">{{ item.title }}</p>
                      </div>

                      <div class="item-box">
                        <div class="sop-text">
                          <div class="text_img">
                            <img
                              class="share_img"
                              src="../../images/share_two@2x.png"
                              alt=""
                            />
                          </div>
                          <div class="sop_title">
                            <!-- 欢迎您加入哈哈哈哈哈哈，一起加油吧~ -->
                            {{ item.title }}
                          </div>
                        </div>
                        <div
                          v-for="(chi, c) in item.items"
                          :key="c + 'in'"
                          @click.stop="_down(chi)"
                          class="cen_item"
                        >
                          <div class="text_img">
                            <img
                              class="share_img"
                              src="../../images/share_two@2x.png"
                              alt=""
                            />
                          </div>
                          <div class="sop-text">
                            <div class="list_box">
                              <div class="sop_imgWarp">
                                <div class="img-up">
                                  <img :src="chi.icon" alt="" />
                                </div>
                                <div class="center_img">
                                  <p class="img_text">{{ chi.groupName }}</p>
                                  <p class="img_size">{{ chi.size }}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- <div class="">
                            <div class="center_list">
                              <div>
                                <div class="center_list list_box">
                                  <div>
                                    <img
                                      class="cen_img"
                                      :src="chi.icon"
                                      alt=""
                                    />
                                  </div>
                                  <div>
                                    <p>{{ chi.title }}</p>
                                    <p class="gray">{{ chi.size }}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div> -->
                        </div>
                        <div class="up" @click.stop="item.isOpen = false">
                          {{ item.label }}-收起
                        </div>
                      </div>
                      <div v-if="item.children.length">
                        <!-- 子分组 -->
                        <div
                          v-for="(sub, k) in item.children"
                          :key="k + 'chi'"
                          class="out-li"
                        >
                          <div class="tree-header">
                            <span class="header-left">
                              <span class="corner"></span>
                            </span>
                            <span
                              class="header-mid"
                              @click.stop="sub.isOpen = !sub.isOpen"
                              >{{ sub.name }}
                              <span class="gray">({{ sub.length }})</span></span
                            >
                            <!-- <span
                              class="header-right"
                              @click.stop="sub.isOpen = true"
                            >
                              展开2
                              <span class="corner"></span>
                            </span> -->
                          </div>
                          <div v-show="sub.isOpen" class="out-panel">
                            <div class="warp_group">
                              <img
                                class="group_img"
                                src="../../images/group.png"
                                alt=""
                              />
                              <p class="title_verba">{{ sub.title }}</p>
                            </div>
                            <!-- <p>{{ sub.title }}</p> -->
                            <div class="item-box">
                              <div
                                v-for="(ss, s) in sub.items"
                                :key="s + 'in-in'"
                                class="cen_item"
                                @click.stop="_down(ss)"
                              >
                                <!-- <img class="cen_img" :src="ss.icon" alt="" />
                                <div>
                                  <p>{{ ss.title }}</p>
                                  <p class="gray">{{ ss.size }}</p>
                                </div> -->
                                <div class="text_img">
                                  <img
                                    class="share_img"
                                    src="../../images/share_two@2x.png"
                                    alt=""
                                  />
                                </div>
                                <div class="sop-text">
                                  <div class="list_box">
                                    <div class="sop_imgWarp">
                                      <div class="img-up">
                                        <img :src="ss.icon" alt="" />
                                      </div>
                                      <div class="center_img">
                                        <p class="img_text">{{ ss.title }}</p>
                                        <p class="img_size">{{ ss.size }}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="up" @click.stop="sub.isOpen = false">
                                {{ item.label }}-{{ sub.label }}收起
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
        </div>
      </div>
      <!--  -->
      <div v-if="tabClick == 2">
        <div>
          <van-collapse v-model="activeName" accordion>
            <van-collapse-item title="列表一" name="1">
              <div>
                <h1>这是话术标题哈哈哈哈哈哈哈哈哈哈…</h1>
                <div>
                  <img
                    style="width: 50px"
                    src="../../images/icon_change2@2x.png"
                    alt=""
                  />
                </div>
                <h2>PDF</h2>
              </div>
              <van-collapse-item title="列表1.1" name="4">
                <div>3333</div>
              </van-collapse-item>
            </van-collapse-item>
            <van-collapse-item title="列表二" name="2">内容</van-collapse-item>
            <van-collapse-item title="列表3" name="3">内容</van-collapse-item>
          </van-collapse>
        </div>
      </div>
    </div>
    <!-- 新建分组 -->
    <van-action-sheet v-model="newshow" title="新建分组">
      <div class="content">
        <div class="codeDetail">
          <div class="select-Tree">
            <span class="groupname"
              ><span style="color: red">*</span> 上级分组:</span
            >
            <SelectTree
              :options="options"
              v-model="value"
              :multiple="false"
              :searchable="false"
              placeholder="请选择分组"
              :normalizer="normalizer"
              @select="changeSelect"
            >
              <label
                slot="option-label"
                slot-scope="{ node, labelClassName }"
                :class="labelClassName"
              >
                <img
                  src="../../images/wenjian.png"
                  alt=""
                  style="width: 14px; height: 12px"
                />
                <span class="nodeName">{{ node.label }}</span>
              </label>
            </SelectTree>
          </div>
          <div class="input_text">
            <span class="groupname"
              ><span style="color: red">*</span> 分组名称:</span
            >

            <el-input
              v-model="groupingName"
              placeholder="请输入内容"
              maxlength="10"
              show-word-limit
            ></el-input>
          </div>
          <div class="buttonWarp">
            <span class="cancel" @click="cancel">取消</span>
            <span class="save" @click="saveBut">保存1</span>
          </div>
        </div>
      </div>
    </van-action-sheet>
    <!-- 重命名 -->
    <van-action-sheet v-model="rename" title="重命名">
      <div class="content">
        <div class="codeDetail">
          <!-- <el-form :model="newform">
            <el-form-item label="上级分组">
              <el-select placeholder="请选择分组" v-model="newform.grouping">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分组名称">
              <el-input v-model="newform.verbaltite"></el-input>
            </el-form-item>
          </el-form> -->
          <div class="select-Tree"></div>
          <div class="input_text">
            <span class="groupname"
              ><span style="color: red">*</span> 重命名:</span
            >

            <el-input
              v-model="wordTitle"
              placeholder="请输入内容"
              maxlength="10"
              show-word-limit
            ></el-input>
          </div>
          <div class="buttonWarp">
            <span class="cancel" @click="cancel">取消</span>
            <span class="save">保存</span>
          </div>
        </div>
      </div>
    </van-action-sheet>

    <!-- 删除 -->
    <!-- <van-popup v-model="deleteCenter">内容</van-popup> -->
    <!-- Sop弹框 -->
    <van-action-sheet v-model="sopPopup" title="个人SOP提醒">
      <div class="content">
        <div class="codeDetail">
          <div class="sop-box">
            <div class="sop-newsText">
              <span class="line-border"></span>
              <span class="sop-time"> [2021-07-02 12:00] </span>
              给客户发送以下 <span class="sop-num"> 4 </span>消息
            </div>
            <div class="sop-text">
              <div class="text_img">
                <img
                  style="width: 24px; height: 24px"
                  src="../../images/icon_add@2x.png"
                  alt=""
                />
              </div>
              <div class="sop_title">欢迎您加入哈哈哈哈哈哈，一起加油吧~</div>
            </div>
            <div class="sop-text">
              <div class="text_img">
                <img
                  style="width: 24px; height: 24px"
                  src="../../images/icon_add@2x.png"
                  alt=""
                />
              </div>
              <div class="sop_warp">
                <div class="sop_imgWarp">
                  <div class="img-up">
                    <img src="../../images/iconadd.png" alt="" />
                  </div>
                  <div class="center_img">
                    <p class="img_text">图片副本.png</p>
                    <p class="img_size">29/9K</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="sop-text">
              <div class="text_img">
                <img
                  style="width: 24px; height: 24px"
                  src="../../images/icon_add@2x.png"
                  alt=""
                />
              </div>
              <div class="sop_warp">
                <div class="sop_imgWarp">
                  <div class="img-up">
                    <img src="../../images/iconadd.png" alt="" />
                  </div>
                  <div class="center_img">
                    <p class="img_text">图片副本.png</p>
                    <p class="img_size">29/9K</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-action-sheet>
    <!-- <Details /> -->
  </div>
</template>
<script>
import SelectTree from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  components: {
    SelectTree,
    // Details,
  },
  data() {
    return {
      sopPopup: false,
      isOpen: true,
      dotlist: false, //控制小点显示
      groupingName: "", //输入分组名称
      isShowOperate: false,
      activeName: "1",
      numberValidateForm: {
        age: "",
      },
      options: [],
      treeData: [
        {
          label: "分组1",
          title: "这是话术标题",
          isOpen: true,
          items: [
            {
              icon: "http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123",
              title: "图片的标题.png",
              size: "27.35k",
              url: "https://www.xinghuijin.com/",
            },
            {
              icon: "http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123",
              title: "公司简介.pdf",
              size: "729k",
              url: "https://www.xinghuijin.com/",
            },
            {
              icon: "http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123",
              title: "瑞信科技",
              size: "Wera sorry xxxxxx",
              url: "https://www.xinghuijin.com/",
            },
          ],
          children: [
            {
              label: "子分组1",
              title: "这是话术标题",
              isOpen: false,
              items: [
                {
                  icon: "http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123",
                  title: "图片的标题.png",
                  size: "27.35k",
                  url: "https://www.xinghuijin.com/",
                },
                {
                  icon: "http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123",
                  title: "公司简介.pdf",
                  size: "729k",
                  url: "https://www.xinghuijin.com/",
                },
                {
                  icon: "http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123",
                  title: "瑞信科技",
                  size: "Wera sorry xxxxxx",
                  url: "https://www.xinghuijin.com/",
                },
              ],
            },
            {
              label: "子分组2",
              title: "这是话术标题",
              isOpen: false,
              items: [
                {
                  icon: "http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123",
                  title: "图片的标题.png",
                  size: "27.35k",
                  url: "https://www.xinghuijin.com/",
                },
                {
                  icon: "http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123",
                  title: "公司简介.pdf",
                  size: "729k",
                  url: "https://www.xinghuijin.com/",
                },
                {
                  icon: "http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123",
                  title: "瑞信科技",
                  size: "Wera sorry xxxxxx",
                  url: "https://www.xinghuijin.com/",
                },
              ],
            },
            {
              label: "子分组3",
              title: "这是话术标题",
              isOpen: false,
              items: [
                {
                  icon: "http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123",
                  title: "图片的标题.png",
                  size: "27.35k",
                  url: "https://www.xinghuijin.com/",
                },
                {
                  icon: "http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123",
                  title: "公司简介.pdf",
                  size: "729k",
                  url: "https://www.xinghuijin.com/",
                },
                {
                  icon: "http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123",
                  title: "瑞信科技",
                  size: "Wera sorry xxxxxx",
                  url: "https://www.xinghuijin.com/",
                },
              ],
            },
          ],
        },
        {
          label: "分组2",
          title: "这是话术标题",
          isOpen: false,
          items: [
            {
              icon: "http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123",
              title: "图片的标题.png",
              size: "27.35k",
              url: "https://www.xinghuijin.com/",
            },
            {
              icon: "http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123",
              title: "公司简介.pdf",
              size: "729k",
              url: "https://www.xinghuijin.com/",
            },
            {
              icon: "http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123",
              title: "瑞信科技",
              size: "Wera sorry xxxxxx",
              url: "https://www.xinghuijin.com/",
            },
          ],
          children: [
            {
              label: "子分组1",
              title: "这是话术标题",
              isOpen: false,
              items: [
                {
                  icon: "http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123",
                  title: "图片的标题.png",
                  size: "27.35k",
                  url: "https://www.xinghuijin.com/",
                },
                {
                  icon: "http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123",
                  title: "公司简介.pdf",
                  size: "729k",
                  url: "https://www.xinghuijin.com/",
                },
                {
                  icon: "http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123",
                  title: "瑞信科技",
                  size: "Wera sorry xxxxxx",
                  url: "https://www.xinghuijin.com/",
                },
              ],
            },
            {
              label: "子分组2",
              title: "这是话术标题",
              isOpen: false,
              items: [
                {
                  icon: "http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123",
                  title: "图片的标题.png",
                  size: "27.35k",
                  url: "https://www.xinghuijin.com/",
                },
                {
                  icon: "http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123",
                  title: "公司简介.pdf",
                  size: "729k",
                  url: "https://www.xinghuijin.com/",
                },
                {
                  icon: "http://img.xinghuijin.com/blog_pyhon1.jpeg?t=123",
                  title: "瑞信科技",
                  size: "Wera sorry xxxxxx",
                  url: "https://www.xinghuijin.com/",
                },
              ],
            },
          ],
        },
      ],
      showList: false, //列表显示
      callbox: false,
      dialogImageUrl: "",
      wordTitle: "",
      dialogVisible: false,
      groupingId: "", //分组id

      newform: {
        renameText: "",
        // grouping: "",
        // verbaltite: "",
        // remark: "",
        // link: "",
      },
      radio: 1,
      newshow: false, //新增弹框
      rename: false, //重命名
      tablist: 1, //弹框tab列表
      activeNames: [],
      tabClick: 1, //切换
      inputValue: "",

      value: null,
      normalizer(node) {
        // console.log(node.id);
        return {
          id: node.id,
          label: node.name,
          children: node.children,
        };
      },

      firstList: [
        {
          name: "111",
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  created() {
    this.verbaltrickList();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //列表页面
    myclue(v) {
      console.log(v);
      this.tabClick = v;
    },
    // 点击查询

    //列表点击
    clickList() {
      this.showList = !this.showList;
    },
    // 点击树形结构
    handleNodeClick(data) {
      console.log(data);
      this.isShowOperate = data.id;
    },
    // 点击新增按钮
    newaddClick() {
      // this.newshow = true;
      this.$router.push("/talkTool/added");
    },
    //添加分组
    addGroups() {
      this.newshow = true;
    },
    // 重命名
    // rechristen(){

    // },
    _down(item) {
      // window.open(item.url);
      console.log(item);
    },

    redioClick(value) {
      this.tablist = value;
      console.log(value);
    },
    // 上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 个人话术分组列表
    verbaltrickList() {
      this.$network
        .get("/material-service/verbaltrickgroup/getlist", {
          parentId: 0,
          groupType: this.tabClick,
        })
        .then((res) => {
          console.log(res.data);
          console.log(res);
          this.options = res.data;
          this.treeData = res.data;
          if (res.result) {
          }
        });
    },
    //新增分组
    newclickList() {
      let params = {
        name: this.groupingName,
        parentId: this.groupingId || 0,
        groupType: this.tabClick,
      };
      this.$network
        .post("/material-service/verbaltrickgroup/add", params)
        .then((res) => {
          console.log(res);
          if (res.result) {
          }
        });
    },
    // 点击分组列表名字
    groupNameList(value) {
      console.log(value);
      this.$network
        .get("/material-service/verbaltrick/getlist", {
          page: 1,
          limit: 20,
          value: this.inputValue,
          groupId: value.id,
          // groupType: this.tabClick,
        })
        .then((res) => {
          console.log(res);
          if (res.result) {
            // this.newclickList
            this.$set(value, "items", res.data.iPage.records);
            console.log("--------", this.treeData);
          }
        });
    },
    // 点击删除
    deleteverbal() {
      // console.log(value);
      this.$network
        .post("/material-service/verbaltrick/deleteverbal", {
          // id
        })
        .then((res) => {
          console.log(res);
          if (res.result) {
            this.newclickList;
          }
        });
    },
    // 新增话术
    addverbal() {
      // console.log(value);
      this.$network
        .post("/material-service/verbaltrick/addverbal", {
          // id
        })
        .then((res) => {
          console.log(res);
          if (res.result) {
            this.newclickList;
          }
        });
    },
    //点击查询
    queryCenten() {
      // this.groupNameList();
      console.log(this.inputValue);
    },
    // 删除
    open() {
      this.$confirm(
        "此操作将删除本分组及分组内全部内容，是否确认删除分组？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 点击取消
    cancel() {
      this.newshow = false;
    },

    // 新建分组baoc
    saveBut() {
      this.newclickList();
      console.log(this.groupingName);
    },
    // 点击点点点，来卡片
    handleCommand(command) {
      // this.$message("click on item " + command);
      console.log(command);
      if (command == "a") {
        // this.newshow = true;
      } else if (command == "b") {
        // this.rename = true;
        // this.newshow = false;
      } else if (command == "c") {
        // this.newshow = false;
        // this.rename = false;
        this.open();
      }
    },
    changeSelect(val) {
      console.log(val.id);
      this.groupingId = val.id;
    },
    newgroup() {
      console.log(123);
    },
    renameSave(formName) {
      console.log(formName);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    beforeHandleCommand(node, data, command) {
      return {
        node: node,
        data: data,
        command: command,
      };
    },
  },
};
</script>

<style scoped lang="less">
.tetx {
  font-size: 50px;
}
.all_group {
  .custom-tree-node {
    font-size: 14px;
    width: 100%;
    .text_node {
      display: inline-block;
      width: 100%;
      .nodeName {
        display: inline-block;
        margin-left: 5px;
        width: 70%;
        vertical-align: middle;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .look_more {
        position: absolute;
        right: 0;
      }
    }
  }
}
.headerTitle {
  background: #fff;
  padding: 0 24px;
  font-weight: 600;
  display: flex;
  height: 87px;
  line-height: 87px;
  font-size: 28px;
  color: #3c4353;
  border-top: 1px solid #f0f2f7;
  border-bottom: 1px solid #f0f2f7;
  .backPage {
    width: 150px;
    .van-icon {
      vertical-align: -10%;
      width: 28px;
      height: 28px;
    }
  }
  .textTitle {
    flex: 1;
    display: inline-block;
    padding-left: 150px;
  }
}
.warp-box {
  padding: 0 24px;
  margin-top: 32px;
}
.pd-24 {
  padding: 0 24px;
}
.warp-bg {
  background: #fff;
}
// 头部
.van-nav-bar {
  padding: 10px;
  background: rgba(65, 104, 246, 0.04);
  border-radius: 8px;
  border: 1px solid #4168f6;
}
/deep/.van-cell {
  background: none;
}

.sop-tite {
  font-size: 28px;
  font-weight: 400;
  color: #3c4353;
  margin-left: 16px;
}
.message {
  font-weight: 400;
  color: #838a9d;
  font-size: 28px;
  margin-left: 16px;
}
.ck-text {
  font-weight: 400;
  color: #838a9d;
  font-size: 24px;
}
// 查询
.searchInput {
  background: #fff;
  padding: 24px 24px;
  .input {
    width: 582px;
    height: 80px;
    border-radius: 8px;
    border: 2px solid #d9dae4;
    font-size: 28px;
    padding-left: 24px;
    box-sizing: border-box;
  }
  .searchBtn {
    display: inline-block;
    width: 104px;
    height: 80px;
    background: #4168f6;
    border-radius: 8px;
    color: #fff;
    font-size: 28px;
    text-align: center;
    line-height: 80px;
    margin-left: 16px;
  }
}
// tabMenu
.tabMenu {
  padding: 0 24px;
  box-sizing: border-box;
  height: 115px;
  font-size: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f2f7;
  span {
    display: inline-block;
  }
  .addBtn {
    width: 124px;
    height: 68px;
    background: #ffffff;
    border-radius: 6px;
    border: 2px solid #d9dae4;
    text-align: center;
    line-height: 68px;
    img {
      display: inline-block;
      width: 28px;
      height: 28px;
      vertical-align: -4%;
    }
  }
  .tabBtn {
    .mycule {
      margin-right: 32px;
    }
    .active {
      color: #4168f6;
      position: relative;
      &::after {
        content: "";
        width: 112px;
        height: 4px;
        background: #4168f6;
        position: absolute;
        bottom: -40px;
        left: 0;
      }
    }
  }
}
.listData {
  transition: all 3s;
}
// 过渡动画
.transform {
  transform: rotate(95deg);
  /* transform: initial; */
  transition: all 0.3s;
}
// 新增弹框样式
.el-radio {
  width: 100px;
}
/deep/.el-radio__inner {
  width: 30px;
  height: 30px;
}
/deep/ .el-radio__inner::after {
  width: 10px;
  height: 10px;
}
/deep/ .el-input__inner {
  height: 80px;
  line-height: 80px;
}
.van-action-sheet__header {
  height: 88px;
  line-height: 88px;
  background: #fafbff;
  border-radius: 16px 16px 0px 0px;
  font-size: 28px;
  color: #3c4353;
  font-weight: 600;
}
/deep/ .el-textarea__inner {
  font-size: 28px;
  height: 400px;
  border: 2px solid #d9dae4 !important;
}

// center列表
/deep/ .el-radio-group {
  margin-bottom: 30px;
}
/deep/ .el-icon-arrow-down:before {
  content: "";
}
.content-list {
  display: flex;
  justify-content: space-between;
}
.relative {
  position: relative;
}
.call {
  position: absolute;
  right: 20px;
  width: 100px;
  background: #fff;
  z-index: 10;
}
.newgrouping {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}
.newgrp-img {
  width: 28px;
  height: 28px;
}
.add-grp {
  font-weight: 400;
  color: #4168f6;
  font-size: 28px;
  margin-left: 8px;
}
.group_img {
  width: 48px;
  height: 48px;
}
.warp_group {
  display: flex;
  align-items: center;
  margin: 28px auto;
}
.title_verba {
  font-weight: 400;
  color: #3c4353;
  font-size: 28px;
  margin-left: 16px;
}
.center_list {
  display: flex;
  align-items: center;
}
.share_img {
  width: 26px;
  height: 26px;
}
.content {
  // overflow: scroll;
  // padding: 24px;
  .addForm,
  .codeDetail {
    // overflow-y: scroll;
    height: 750px;
    box-sizing: border-box;
    padding: 24px;
    font-size: 28px;
    font-weight: 500;
    // overflow-y: scroll;
    /deep/.el-form {
      // height: 100%;
      .el-form-item {
        display: flex;
        margin-bottom: 26px;
        .editText {
          font-size: 28px;
          line-height: 80px;
        }
      }
      .el-form-item__label {
        width: 155px;
        font-size: 28px;
        line-height: 80px;
        color: #838a9d;
        margin-bottom: 30px;
      }
      .el-form-item__content {
        flex: 1;
        height: 80px;
        line-height: 80px;
        word-break: break-all;
        .el-input__inner {
          height: 80px;
          border-radius: 8px;
          font-size: 28px;
          border: 0;
          border: 2px solid #d9dae4;
        }
        .el-select,
        .el-cascader {
          width: 100%;
          // width: 562px;
          height: 80px;
        }
        .el-select {
          .el-tag--small {
            height: 50px;
            line-height: 50px;
          }
          .el-tag {
            font-size: 28px;
          }
        }
        .el-checkbox {
          width: 100%;
          line-height: 80px;
          .el-checkbox__inner {
            border: 2px solid #d9dae4;
            width: 28px;
            height: 28px;

            &::after {
              width: 12px;
              height: 12px;
            }
          }
          .el-checkbox__input {
            vertical-align: -10%;
          }
          .el-checkbox__label {
            line-height: 80px;
            font-size: 28px;
          }
        }
      }
      .textareaInput {
        height: 400px;
        .el-textarea {
          .el-textarea__inner {
            font-size: 28px;
            height: 400px;
            border: 2px solid #d9dae4 !important;
          }
        }
      }
      .submitBtn {
        .el-button--primary {
          font-size: 28px;
          width: 702px;
          height: 80px;
          background: #4168f6;
          border-radius: 8px;
        }
      }
    }
  }
  .codeDetail {
    // height: 100%;
    /deep/.el-form {
      .codeImg {
        margin-bottom: 100px !important;
        img {
          width: 182px;
          height: 182px;
        }
      }
      .el-form-item {
        margin-bottom: 0;
      }
      .el-form-item__label {
        font-size: 24px;
      }
      span {
        font-size: 24px;
        // line-height: 80px;
      }
    }
  }
}
// 新建分组
.select-Tree {
  display: flex;
}
.groupname {
  display: flex;
  align-items: center;
  margin-right: 20px;
  // width: 250px;
}
.cent {
  justify-content: center;
}
/deep/.vue-treeselect__control {
  width: 547px;
  height: 80px;
  line-height: 80px;
}
/deep/.vue-treeselect__placeholder,
.vue-treeselect__single-value {
  top: 30%;
}
/deep/.vue-treeselect__single-value {
  top: 30%;
}
.input_text {
  display: flex;
  margin-top: 24px;
}
/deep/ .el-input,
.el-input__inner {
  width: 547px;
}
.el-dropdown-link {
  position: relative;
}
.dropdown_box {
  width: 236px;
  // height: 208px;
  background: #ffffff;
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
.el-dropdown-link img {
  width: 28px;
  height: 28px;
}
// 底部按钮
.buttonWarp {
  display: flex;
  // justify-content: space-around;
  position: absolute;
  font-size: 28px;
  width: 100%;
  // position: fixed;
  bottom: 24px;
  // margin-top: 243px;

  span {
    display: inline-block;
    width: 339px;
    height: 80px;
    border-radius: 8px;
    border: 2px solid #4168f6;
    text-align: center;
    line-height: 80px;
  }
  .cancel {
    color: #4168f6;
    background: #fff;
  }
  .save {
    background: #4168f6;
    color: #fff;
    margin-left: 10px;
  }
}
/deep/.van-action-sheet {
  width: 751.5px;
  // margin: 0 auto;
  left: 50%;
  transform: translate(-50%, 0);
}
//
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
    font-weight: 400;
    color: #3c4353;
    font-size: 28px;
    margin-top: 24px;
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
  .out-li {
    margin-bottom: 20px;
  }
  .item-box {
    padding: 20px;
    background-color: #f5f5f5;
    .item-li {
      // display: flex;
      margin-bottom: 20px;
      background: white;
      border-radius: 6px;
      border: 1px solid #ccc;
      // img {
      //   width: 112px;
      //   height: 112px;
      // }
    }
  }
  .up {
    display: flex;
    justify-content: flex-end;
  }
}
.cen_item {
  display: flex;
  align-items: center;
}
.cen_img {
  flex: 1;
  // max-width: 60px;
  width: 112px;
  height: 112px;
  // min-width: 60px;
  margin-right: 10px;
}
// sop
.sop-box {
  height: 750px;
  background: #fafbff;
  border-radius: 8px;
  border: 1px solid #d9dae4;
  padding: 24px;
}
.sop-newsText {
  font-weight: 400;
  color: #3c4353;
  font-size: 28px;
  height: 40px;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  .sop-time {
    margin-right: 20px;
  }
}
.line-border {
  width: 8px;
  height: 28px;
  background: #4168f6;
  display: inline-block;
  margin-right: 12px;
  margin-top: 4px;
}
.sop-num {
  color: #4168f6;
  margin: 0 5px;
}
.text_img {
  margin-right: 24px;
}
.sop-text {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}
.sop_title {
  font-weight: 400;
  color: #838a9d;
  font-size: 28px;
  width: 606px;
  height: 88px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #d9dae4;
  line-height: 88px;
  padding-left: 24px;
}
.list_box {
  // display: flex;
  width: 565px;
  display: flex;
  align-items: center;
  // // width: 606px;
  // width: 582px;
  height: 160px;
  padding-left: 24px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #d9dae4;
}
.sop_warp {
  // display: flex;
  width: 606px;
  display: flex;
  align-items: center;
  // // width: 606px;
  // width: 582px;
  height: 160px;
  padding-left: 24px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #d9dae4;
}
.sop_imgWarp {
  display: flex;
  align-items: center;
  // // width: 606px;
  // width: 582px;
  // height: 160px;
  // padding-left: 24px;
  // background: #ffffff;
  // border-radius: 8px;
  // border: 1px solid #d9dae4;
}
.img-up img {
  width: 112px;
  height: 112px;
}
.img_text {
  font-weight: 400;
  color: #3c4353;
  font-size: 28px;
}
.img_size {
  font-weight: 400;
  color: #c0c4cc;
  font-size: 24px;
}
.center_img {
  line-height: 50px;
  margin-left: 16px;
}
</style>