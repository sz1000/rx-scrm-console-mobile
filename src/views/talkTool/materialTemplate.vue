<template>
    <div class="material-template">
        <ul class="header-nav">
            <li @click="changeNav(0)" :class="{active: type == 0}"><span>种草文章</span></li>
            <li @click="changeNav(1)" :class="{active: type == 1}"><span>销售文件</span></li>
            <li @click="changeNav(2)" :class="{active: type == 2}"><span>营销海报</span></li>
        </ul>
        <search ref="search" :type="type"></search>
        <ul class="list-box">
            <li class="item-box" v-if="type == 0">
                <van-list
                    v-model="articleListLoading"
                    :immediate-check="false"
                    :finished="articleListFinished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    >
                    <div class="article-item item" v-for="i in articleList" :key="i.articleId">
                        <div class="right" @click="preview(1, i)">
                            <img class="img" :src="i.cover ? i.cover : 'https://h5.jzcrm.com/static/img/default_article.png'" alt="">
                            <div class="des">
                                <div>
                                    <h3 class="one-line">{{i.title}}</h3>
                                    <p class="one-line" v-html="i.contentAbstract"></p>
                                </div>
                            </div>
                        </div>
                        <div class="left" @click="sendChatMessage('news', false, { 'link': `${originUrl}/materialTemplate?materialId=${i.articleId}&type=1&userNo=${userNo}`, 'title': i.title, 'desc': i.contentAbstract ? i.contentAbstract : i.title, 'imgUrl': i.cover ? i.cover : 'https://h5.jzcrm.com/static/img/default_article.png' })"><img src="../../images/relay.png" alt=""></div>
                    </div>
                </van-list>
            </li>
            <li class="item-box" v-if="type == 1">
                <van-list
                    v-model="saleListLoading"
                    :immediate-check="false"
                    :finished="saleListFinished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    >
                    <div class="file-item item" v-for="i in saleList" :key="i.documentId" @click="sendChatMessage('news', false, { 'link': `${originUrl}/materialTemplate?materialId=${i.documentId}&type=2&userNo=${userNo}`, 'title': i.name, 'desc': i.fileSize ? byteConvert(i.fileSize) : i.name, 'imgUrl': i.cover ? i.cover : 'https://h5.jzcrm.com/static/img/default_pdf.png' })">
                        <div class="right">
                            <img class="img" :src="i.cover ? i.cover : 'https://h5.jzcrm.com/static/img/default_pdf.png'" alt="">
                            <div class="des">
                                <div>
                                    <h3 class="one-line">{{i.name}}</h3>
                                    <p class="one-line">{{i.fileSize ? byteConvert(i.fileSize) : ''}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="left"><img src="../../images/relay.png" alt=""></div>
                    </div>
                </van-list>
            </li>
            <li class="item-box poster" v-if="type == 2">
                <van-list
                    v-model="posterListLoading"
                    :immediate-check="false"
                    :finished="posterListFinished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    >
                    <div class="poster-item item" v-for="i in posterList" :key="i.posterId" @click="sendChatMessage('image', false, '', i.mediaId)">
                        <div class="top"><img class="img" :src="i.posterUrl" alt=""></div>
                        <div class="bottom">
                            <span class="one-line">{{i.posterName}}</span>
                            <div><img src="../../images/relay2.png" alt=""></div>
                        </div>
                    </div>
                </van-list>
            </li>
        </ul>
        <!-- 转载公众号文章按钮 -->
        <div v-if="type == 0" class="reprint-box" @click="goReprint"></div>
    </div>
</template>
<script>
import { ArticleList, SaleDocumentList, PosterList } from "../../config/api"
import { sendChatMessage, byteConvert } from '../../utils/tool'

import Search from '../../components/MaterialTemplate/search'

import { mapActions, mapState } from 'vuex'

export default {
    name: 'materialTemplate',
    data() {
        return {
            type: 0,

            articleList: [],
            totalArticle: 0,
            articleListPage: 1,
            articleListLoading: true,
            articleListFinished: false,

            saleList: [],
            totalSale: 0,
            saleListPage: 1,
            saleListLoading: true,
            saleListFinished: false,

            posterList: [],
            totalPoster: 0,
            posterListPage: 1,
            posterListLoading: false,
            posterListFinished: false,

            originUrl: location.origin
        }
    },
    computed: {
        ...mapState(["corpId", "userNo"]),
    },
    provide() {
        return {
            checkTable: this.checkTable
        }
    },
    created() {
        this.getCorpId().then(() => this.getList())
    },
    methods: {
        ...mapActions(["getCorpId"]),
        changeNav(type) {
            this.type = type
            this.initPage(this.type)
            this.$nextTick(() => {
                this.$refs.search.searchText = ''
            })
            this.getList()
        },
        onLoad() {
            if (this.type == 0 && this.articleListPage <= 1 || this.type == 1 && this.saleListPage <= 1 || this.type == 2 && this.posterListPage <= 1) {
                return
            }
            this.getList()
        },
        getList(title) {
            let ApiOpts = ArticleList

            let params = {
                pageSize: 10,
                corpId: this.corpId
            }

            if (this.type == 0) {
                params.title = title
                params.pageIndex = this.articleListPage
                ApiOpts = ArticleList
                this.articleListLoading = true
            } else if (this.type == 1) {
                params.name = title
                params.pageIndex = this.saleListPage
                ApiOpts = SaleDocumentList
                this.saleListLoading = true
            } else if (this.type == 2) {
                params.name = title
                params.pageIndex = this.posterListPage
                ApiOpts = PosterList
                this.posterListLoading = true
            }

            ApiOpts(params).then(res => {
                const { code, data, msg } = res

                if (code === 'success') {
                    if (this.type == 0) {
                        this.articleListLoading = false
                        if (this.articleListPage == 1) {
                            this.articleList = []
                        }
                        this.articleList = this.articleList.concat(data.records)
                        this.articleListPage += 1
                        this.articleListFinished = this.articleList.length >= data.total
                    } else if (this.type == 1) {
                        this.saleListLoading = false
                        if (this.saleListPage == 1) {
                            this.saleList = []
                        }
                        this.saleList = this.saleList.concat(data.records)
                        this.saleListPage += 1
                        this.saleListFinished = this.saleList.length >= data.total
                    } else if (this.type == 2) {
                        this.posterListLoading = false
                        if (this.posterListPage == 1) {
                            this.posterList = []
                        }
                        this.posterList = this.posterList.concat(data.records)
                        this.posterListPage += 1
                        this.posterListFinished = this.posterList.length >= data.total
                    }
                } else {
                    this.$toast(msg)
                }
            })
        },
        // 查询
        checkTable(data) {
            this.initPage(this.type)
            this.getList(data)
        },
        initPage(type) {
            if (type == 0) {
                this.articleListPage = 1
            } else if (type == 1) {
                this.saleListPage = 1
            } else if (type == 2) {
                this.posterListPage = 1
            }
        },
        sendChatMessage,
        byteConvert,
        // 去往转载公众号文章页面
        goReprint() {
            this.$router.push({
                path: '/talkTool/reprint',
                // query: {},
            })
        },
        preview(type, item) {
            this.$router.push({
                path: '/materialTemplate',
                query: {
                    isPreview: 1,
                    type,
                    userNo: this.userNo,
                    data: encodeURIComponent(JSON.stringify(item))
                },
            })
        },
    },
    components: {
        Search
    }
}
</script>
<style lang="less" scoped>
@import url('../../styles/color');
.material-template {
    min-height: 100vh;
    background-color: @white;
    .header-nav {
        display: flex;
        width: 100%;
        height: 100px;
        border-bottom: 1px solid @lineColor;
        li {
            flex: 1;
            height: 100%;
            line-height: 100px;
            text-align: center;
            span {
                display: block;
                width: 150px;
                height: 100%;
                margin: 0 auto;
                color: @fontSub2;
                font-size: 28px;
            }
        }
        .active {
            span {
                color: @main;
                border-bottom: 4px solid @main;
            }
        }
    }
    .list-box {
        padding-bottom: 132px;
        position: relative;
        &::after {
            content: '';
            height: 2px;
            background-color: @lineColor;
            transform: scaleY(.5);
            position: absolute;
            right: 0;
            left: 0;
            top: 0;
        }
        .item-box {
            /deep/ .van-list__finished-text {
                font-size: 24px;
                color: @lengthColor;
            }
            .item {
                padding:  32px;
                position: relative;
            }
            .article-item, .file-item {
                display: flex;
                align-items: center;
                .left {
                    min-width: 48px;
                    height: 48px;
                    margin-left: 24px;
                    overflow: hidden;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .right {
                    width: 88%;
                    .img {
                        display: inline-block;
                        width: 100px;
                        height: 100px;
                        border-radius: 8px;
                        vertical-align: middle;
                    }
                    .des {
                        display: inline-block;
                        height: 100px;
                        max-width: 72%;
                        margin-left: 20px;
                        vertical-align: middle;
                        div {
                            display: flex;
                            height: 100%;
                            justify-content: space-between;
                            flex-direction: column;
                            h3 {
                                font-size: 28px;
                                color: @fontMain;
                            }
                            p {
                                word-break: break-all;
                                font-size: 24px;
                                color: @fontSub2;
                            }
                        }
                    }
                }
                &::after {
                    content: '';
                    height: 2px;
                    background-color: @lineColor;
                    transform: scaleY(.5);
                    position: absolute;
                    right: 0;
                    left: 32px;
                    bottom: 0;
                }
            }
            .poster-item {
                display: inline-block;
                width: 339px;
                vertical-align: middle;
                .top {
                    width: 339px;
                    height: 339px;
                    border-radius: 16px;
                    background-color: #F6F7F9;
                    overflow: hidden;
                    position: relative;
                    img {
                        width: auto;
                        height: auto;
                        max-width: 100%;
                        max-height: 100%;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                }
                .bottom {
                    display: flex;
                    justify-content: space-between;
                    height: 40px;
                    margin-top: 16px;                  
                    span {
                        max-width: 90%;
                        font-size: 28px;
                        color: @fontMain;
                    }
                    div {
                        width: 24px;
                        height: 100%;
                        img {
                            width: 100%;
                            height: 24px;
                            margin: 8px auto;
                        }
                    }
                }
            }
        }
        .poster {
            padding: 24px 0;
            .item {
                padding: 0;
                margin: 0 0 24px 24px;
            }
        }
    }
    .reprint-box {
        width: 104px;
        height: 104px;
        background-color: @main;
        border-radius: 50%;
        box-shadow: 0 6px 34px 0 rgba(65, 104, 246, .3);
        position: fixed;
        right: 32px;
        bottom: 140px;
        &::before, &::after {
            content: '';
            border-radius: 100px;
            background-color: @white;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        &::before {
            width: 44px;
            height: 6px;
        }
        &::after {
            width: 6px;
            height: 44px;
        }
    }
}
</style>