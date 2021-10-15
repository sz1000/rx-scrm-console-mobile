<template>
    <div class="material-template">
        <ul class="header-nav">
            <li @click="changeNav(0)" :class="{active: type == 0}">种草文章</li>
            <li @click="changeNav(1)" :class="{active: type == 1}">销售文件</li>
            <li @click="changeNav(2)" :class="{active: type == 2}">营销海报</li>
        </ul>
        <search :type="type"></search>
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
                        <div class="left" @click="sendChatMessage('text', false, `${originUrl}/materialTemplate?materialId=${i.articleId}&type=1&userNo=${userNo}`)"><img src="../../images/relay.png" alt=""></div>
                        <div class="right">
                            <img class="img" :src="i.cover ? i.cover : require('../../images/default_article.png')" alt="">
                            <div class="des">
                                <div>
                                    <h3 class="one-txt-cut">{{i.title}}</h3>
                                    <p class="two-line" v-html="i.contentAbstract"></p>
                                </div>
                            </div>
                        </div>
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
                    <div class="file-item item" v-for="i in saleList" :key="i.documentId">
                        <div class="left" @click="sendChatMessage('text', false, `${originUrl}/materialTemplate?materialId=${i.documentId}&type=2&userNo=${userNo}`)"><img src="../../images/relay.png" alt=""></div>
                        <div class="right">
                            <img class="img" :src="i.cover ? i.cover : require('../../images/default_pdf.png')" alt="">
                            <div class="des">
                                <div>
                                    <h3 class="one-txt-cut">{{i.name}}</h3>
                                    <p class="two-line">{{i.fileSize ? byteConvert(i.fileSize) : ''}}</p>
                                </div>
                            </div>
                        </div>
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
                    <div class="poster-item item" v-for="i in posterList" :key="i.posterId">
                        <div class="top"><img class="img" :src="i.posterUrl" alt=""></div>
                        <div class="bottom">
                            <span class="one-txt-cut">{{i.posterName}}</span>
                            <div @click="sendChatMessage('image', false, '', i.mediaId)"><img src="../../images/relay2.png" alt=""></div>
                        </div>
                    </div>
                </van-list>
            </li>
        </ul>
    </div>
</template>
<script>
import { GetCrop, ArticleList, SaleDocumentList, PosterList } from "../../config/api"
import { sendChatMessage, byteConvert } from '../../utils/tool'

import Search from '../../components/MaterialTemplate/search'

export default {
    name: 'materialTemplate',
    data() {
        return {
            type: 0,
            corpId: null,
            userNo: null,

            articleList: [
                {"articleId": 17,     "title": "吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱",     "author": "",     "isTimeShow": true,     "pushTime": 1633449600000,     "content": "<p>啊啊啊啊啊啊啊啊啊啊啊</p >",     "cover": "",     "contentAbstract": "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",     "sendCount": 0,     "openCount": 1,     "shareCount": 0,     "createTime": 1634120643000,     "createUserId": "3F0E479680CC463C8EE62BDB93B87E7B",     "createUserName": "赵春艳",     "updateTime": 1634120760000,     "updateUserId": "3F0E479680CC463C8EE62BDB93B87E7B",     "visitorsCount": 1,     "deleted": false,     "corpId": "ww16d21df03bd67804"},
                {"articleId": 17,     "title": "吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱",     "author": "",     "isTimeShow": true,     "pushTime": 1633449600000,     "content": "<p>啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</p >",     "cover": "",     "contentAbstract": "",     "sendCount": 0,     "openCount": 1,     "shareCount": 0,     "createTime": 1634120643000,     "createUserId": "3F0E479680CC463C8EE62BDB93B87E7B",     "createUserName": "赵春艳",     "updateTime": 1634120760000,     "updateUserId": "3F0E479680CC463C8EE62BDB93B87E7B",     "visitorsCount": 1,     "deleted": false,     "corpId": "ww16d21df03bd67804"},
            ],
            totalArticle: 0,
            articleListPage: 1,
            articleListLoading: false,
            articleListFinished: false,

            saleList: [],
            totalSale: 0,
            saleListPage: 1,
            saleListLoading: false,
            saleListFinished: false,

            posterList: [],
            totalPoster: 0,
            posterListPage: 1,
            posterListLoading: false,
            posterListFinished: false,

            originUrl: location.origin
        }
    },
    provide() {
        return {
            checkTable: this.checkTable
        }
    },
    created() {
        this.getCorpId().then(() => this.getList())
        let userNo = localStorage.getItem("token") && JSON.parse(localStorage.getItem("token")).userNo

        this.userNo = userNo ? userNo : null
    },
    methods: {
        changeNav(type) {
            this.type = type
            this.getList()
        },
        getCorpId() {
            return new Promise((resolve, reject) => {
                GetCrop().then(res => {
                    const {code, data} = res
                    
                    if (code === 'success' && data) {
                        this.corpId = data.corpId
                        resolve()
                    } else {
                        reject()
                    }
                }).catch(reject)
            })
        },
        onLoad() {
            this.getList()
        },
        getList(title) {
            let ApiOpts = ArticleList
            
            let pageIndex = 1

            if (this.type == 0) {
                ApiOpts = ArticleList
                pageIndex = this.articleListPage
                this.articleListLoading = true
            } else if (this.type == 1) {
                ApiOpts = SaleDocumentList
                pageIndex = this.saleListPage
                this.saleListLoading = true
            } else if (this.type == 2) {
                ApiOpts = PosterList
                pageIndex = this.posterListPage
                this.posterListLoading = true
            }

            let params = {
                pageIndex,
                pageSize: 10,
                title,
                corpId: this.corpId
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
            if (this.type == 0) {
                this.articleListPage = 1
            } else if (this.type == 1) {
                this.saleListPage = 1
            } else if (this.type == 2) {
                this.posterListPage = 1
            }
            this.getList(data)
        },
        sendChatMessage,
        byteConvert
    },
    components: {
        Search
    }
}
</script>
<style lang="less" scoped>
.material-template {
    min-height: 100vh;
    background-color: #fff;
    .header-nav {
        display: flex;
        width: 100%;
        height: 100px;
        border-bottom: 1px solid #F0F2F7;
        li {
            flex: 1;
            height: 100%;
            line-height: 100px;
            text-align: center;
        }
        .active {
            color: #4168F6;
            border-bottom: 4px solid #4168F6;
        }
    }
    .list-box {
        padding-bottom: 132px;
        .item-box {
            .item {
                padding: 24px;
            }
            .article-item, .file-item {
                display: flex;
                align-items: center;
                .left {
                    width: 48px;
                    height: 48px;
                    overflow: hidden;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .right {
                    max-width: 90%;
                    margin-left: 24px;
                    .img {
                        display: inline-block;
                        width: 130px;
                        height: 130px;
                        margin-left: 20px;
                        border-radius: 8px;
                        vertical-align: middle;
                    }
                    .des {
                        display: inline-block;
                        height: 130px;
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
                                color: #3C4353;
                            }
                            p {
                                word-break: break-all;
                                font-size: 24px;
                                color: #838A9D;
                            }
                        }
                    }
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
                        color: #3C4353;
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
}
</style>