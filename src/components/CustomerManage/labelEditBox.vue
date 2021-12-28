<template>
    <div class="label-edit-box">
        <div class="row tag">
            <div class="tit">企业标签</div>
            <img class="edit pointer" @click="openDialog('company')" src="@/assets/svg/icon_edit.svg" alt="">
            <div class="tag_wrap" ref="companyTagWrap" :class="{'more':companyTagMore}">
                <div class="tag_box" ref="companyTagBox">
                    <div class="tag" v-for="(item, index) in companyTagList" :key="index">{{item.name}}</div>
                </div>
            </div>
            <div class="more" v-if="isCompanyMore">
                <img class="icon" v-if="!companyTagMore" @click="companyTagMore = true" src="@/assets/svg/icon_down.svg" alt="">
                <img class="icon" v-else @click="companyTagMore = false" src="@/assets/svg/icon_up.svg" alt="">
            </div>
        </div>
        <div class="row tag">
            <div class="tit">个人标签</div>
            <img class="edit pointer" @click="openDialog('person')" src="@/assets/svg/icon_edit.svg" alt="">
            <div class="tag_wrap" ref="personTagWrap" :class="{'more':personTagMore}">
                <div class="tag_box" ref="personTagBox">
                    <div class="tag" v-for="(item,index) in personList" :key="index">{{item.name}}</div>
                </div>
            </div>
            <div class="more" v-if="isPersonMore">
                <img class="icon" v-if="!personTagMore" @click="personTagMore = true" src="@/assets/svg/icon_down.svg" alt="">
                <img class="icon" v-else @click="personTagMore = false" src="@/assets/svg/icon_up.svg" alt="">
            </div>
        </div>

        <tag-dialog v-model="dialog_tag" :title="tagTitle" :type="openType" :companyList="allComTagList" :personList="personTagList" @sure="tagUpdateFun"></tag-dialog>
    </div>
</template>
<script>
import TagDialog from '@/views/customer/components/tagDialog'
import {
  cluecustomer_gettag,
  cluecustomer_addtag,
  cluecustomer_updPertag,
  cluecustomer_deltag,
  cluecustomer_updCorptag,
} from '@/api/customer'

export default {
    props: {
        clueCustomerNo: {
            default: ''
        },
    },
    data() {
        return {
            allComTagList: [],
            sourcePerTag: [],
            personTagList: [], // 个人标签
            companyTagList: [], // 企业标签
            allCompanyTagList: [], // 企业标签（all）

            dialog_tag: false,
            tagTitle: '企业标签',
            openType: '',
            personTagMore: false,
            companyTagMore: false,
            isPersonMore: false,
            isCompanyMore: false,
        }
    },
    computed: {
        personList(){   //已使用个人标签
            let list = this.sourcePerTag.filter(el => {
                return el.isChecked
            })
            return list
        },
    },
    mounted(){
        this.getTagList()
    },
    methods: {
        getTagList() {   //获取标签列表
            cluecustomer_gettag(this.clueCustomerNo).then(res => {
                let { result, data } = res
                if (result) {
                    let { personTagList, corpTagList, tagCorpList } = data

                    this.sourcePerTag = personTagList
                    this.personTagList = JSON.parse(JSON.stringify(this.sourcePerTag))
                    this.companyTagList = corpTagList

                    tagCorpList.forEach(el => {
                        el.children.forEach(son => {
                            son.active = false
                            corpTagList.forEach(item => {
                                if(son.tagid == item.tagid){
                                    son.active = true
                                }
                            })
                        })
                    })
                    this.allCompanyTagList = tagCorpList

                    this.getMoreState()
                }
            })
        },
        getMoreState() {     //获取more状态
            this.$nextTick(() => {
                let _wrap = this.$refs.personTagWrap.clientHeight, _box = this.$refs.personTagBox.clientHeight
                let _wrap1 = this.$refs.companyTagWrap.clientHeight, _box1 = this.$refs.companyTagBox.clientHeight

                this.isPersonMore = _box > _wrap ? true : false
                this.isCompanyMore = _box1 > _wrap1 ? true : false

                console.log(_wrap,_box,_wrap1,_box1)
            })
        },
        openDialog(type) {   //打开弹窗 (企业标签 and 个人标签)
            this.openType = type
            switch (type) {
                case 'company':
                    this.tagTitle = '企业标签'
                    this.allComTagList = JSON.parse(JSON.stringify(this.allCompanyTagList))
                    this.dialog_tag = true
                    break;
                case 'person':
                    this.tagTitle = '个人标签'
                    this.personTagList = JSON.parse(JSON.stringify(this.sourcePerTag))
                    this.dialog_tag = true
                    break;
                default:
                    break;
            }
        },
        tagUpdateFun(type,val) {     //标签增减
            console.log(type,val)
            switch (type) {
                case 'company':     //企业标签更改
                    cluecustomer_updCorptag(this.clueCustomerNo, val).then(res => {
                        if(res.result) {
                            this.dialog_tag = false
                            this.getTagList()
                        }
                    })
                    break;
                case 'person':  //个人标签更改
                    cluecustomer_updPertag(val, this.clueCustomerNo).then(res => {
                        if(res.result) {
                            this.dialog_tag = false
                            this.getTagList()
                        }
                    })
                    break;
                case 'add':     //新增个人标签
                    let params = {
                        clueCustomerNo: this.clueCustomerNo,
                        name: val
                    }

                    cluecustomer_addtag(params).then(res => {
                        let { result, msg } = res

                        if(result) {
                            this.getTagList()
                        } else {
                            this.$toast(msg)
                        }
                    })
                    break;
                case 'delete':
                    cluecustomer_deltag(val).then(res => {
                        if(res.result) {
                            this.getTagList()
                        }
                    })
                    break;
                default:
                    break;
            }
        },
    },
    components: {
        TagDialog
    }
}
</script>
<style lang="less" scoped>
@import url('@/styles/color');
    .label-edit-box {
        width: 100%;
        padding: 32px;
        .row {
            width: 100%;
            position: relative;
            padding-bottom: 64px;
            &:first-child {
                margin-bottom: 32px;
            }
            &::after{
                content: '';
                height: 2px;
                background: @lineColor;
                transform: scaleY(.5);
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
            }
            &.tag {
                padding-bottom: 40px;
                .tit {
                    margin-bottom: 32px;
                }
            }
            .edit{
                width: 40px;
                height: 40px;
                position: absolute;
                right: 0;
                top: 0;
            }
            .tit{
                font-size: 24px;
                line-height: 32px;
                color: @total;
            }
            .tag_wrap{
                width: 100%;
                max-height: 152px;
                overflow: hidden;
                &.more{
                    max-height: inherit;
                    overflow: inherit;
                }
            }
            .tag_box{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                .tag{
                    color: @fontSub1;
                    line-height: 52px;
                    height: 52px;
                    background: @navBg;
                    border-radius: 8px;
                    padding: 0 16px;
                    margin-right: 16px;
                    margin-bottom: 24px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    &:last-child{
                        margin-right: 0;
                    }
                }
            }
            .more{
                text-align: center;
                .icon{
                    display: inline-block;
                    width: 36px;
                    height: 36px;
                }
            }
        }
    }
</style>