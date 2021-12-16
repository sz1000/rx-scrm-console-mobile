<template>
  	<div class="enclosure_wrap">
        <div class="tit_box">
            <div class="tit">附件</div>
            <div class="icon_upload">
                <img class="icon" src="@/assets/svg/icon_upload.svg" alt="">
                <input class="file" @change="uploadFun" type="file">
            </div>
        </div>
        <div class="enclosure_list">
            <van-swipe-cell v-for="(item,index) in list" :key="index">
                <div class="li">
                    <img class="icon" :src="fileIcon(item.name,item.ossUrl)" alt="">
                    <div class="val">
                        <div class="name">{{item.name}}</div>
                        <div class="text">上传于 {{item.createTime | $time('YYYY.MM.DD')}}</div>
                    </div>
                    <div class="opera" @click="openDialog(item)">
                        <img class="icon_point" src="@/assets/svg/icon_point.svg" alt="">
                    </div>
                </div>
                <template #right>
                    <van-button text="下载" @click="selectFun({code: 'download'},item)" class="download_button btn" />
                    <van-button text="删除" @click="selectFun({code: 'delete'},item)" class="delete_button btn" />
                </template>
            </van-swipe-cell>
        </div>
        <!-- 操作面板 -->
        <van-action-sheet v-model="dialog" :actions="actions" cancel-text="取消" close-on-click-action @select="selectFun"/>
    </div>
</template>
<script>
import { 
	cluecustomeraccessory_upload,
	cluecustomeraccessory_getList,		//附件列表
	cluecustomeraccessory_delupload,	//删除附件
} from '@/api/customer'
export default {
	props: {
		id: {
			type: String,
			default: ''
		},
	},
	data() {
		return {
			dialog: false,
            actions: [{ name: '下载',code: 'download' }, { name: '删除',code: 'delete' }],
			list: [],
			row: null,
		};
	},
   	computed: {
		token(){
			return this.$store.getters.token
		},
  	},
	mounted() {
		this.getList()
	},
  	methods: {
		selectFun(action,data){
            if(data && data.id){
                this.row = data
            }
			switch (action.code) {
				case 'download':	//下载
					window.open(this.row.ossUrl)
					break;
				case 'delete':		//删除
					this.deleteFun()
					break;
				default:
					break;
			}
			console.log('asd',action.name)
        },
		openDialog(data){	 //打开弹窗
			this.row = data
			this.dialog = true
		},
        uploadFun(e){    //附件上传
			let id = this.id || 'A280C994F2114D3ABFA02FAED9B8B081'
            cluecustomeraccessory_upload(e,id).then(res => {
                if(res.result){
					this.getList()
                }
            })
        },
        fileIcon(val,link){
			let arr = val.split('.'),type = arr[arr.length - 1],str = ''
			let imgArr = ['jpg','jpeg','png','gif'],ather = ['avi','mp4']
			let obj = {
                pdf: require('@/assets/svg/pdf.svg'),
                ppt: require('@/assets/svg/ppt.svg'),
                excel: require('@/assets/svg/excel.svg'),
                word: require('@/assets/svg/word.svg'),
            }
			if(imgArr.indexOf(type) > -1){
				str = link
			}else {
				if(ather.indexOf(type) > -1){
					str = require('@/assets/svg/file.svg')
				}else{
					str = obj[type]
				}
			}
            return str
        },
		deleteFun(){	//删除附件
			let obj = {
				clueCustomerNo: this.id,
				id: this.row.id,
			}
			cluecustomeraccessory_delupload(obj).then(res => {
				if(res.result){
					this.$toast(res.msg)
					this.getList()
					this.$emit('sure')
				}
			})
		},
	  	getList(){	//获取附件列表
			cluecustomeraccessory_getList(this.id).then(res => {
				if(res.result){
					this.list = res.data
				}
			})
	  	},
  	},
}
</script>
<style lang="less" scoped>
@import "~@/styles/color.less";
.enclosure_wrap{
    width: 100%;
    background: @white;
    padding: 40px 0;
    .van-popup{
        .van-action-sheet__gap{
            height: 24px;
        }
        .van-action-sheet__cancel,.van-action-sheet__item{
            height: 102px;
            font-size: 32px;
            .van-action-sheet__name{
                font-size: 32px;
            }
        }
    }
    .tit_box{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        padding: 0 32px;
        .tit{
            font-size: 28px;
            line-height: 36px;
            color: @fontMain;
            font-weight: bold;
        }
        .icon_upload{
            width: 32px;
            height: 32px;
            position: relative;
            .icon{
                width: 100%;
                height: 100%;
            }
            .file{
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                opacity: 0;
            }
        }
    }
    .enclosure_list{
        width: 100%;
        .btn{
            height: 100%;
            width: 120px;
            color: @white;
        }
        .delete_button{
            background: @red;
            border-color: @red;
        }
        .download_button{
            background: @main;
            border-color: @main;
        }
        .li{
            padding: 24px 32px;
            display: flex;
            align-items: center;
            .icon{
                width: 80px;
                height: 80px;
                border-radius: 8px;
                margin-right: 16px;
            }
            .val{
                // width: calc(100% - 140px);
                flex: 1;
                .name{
                    font-size: 28px;
                    line-height: 36px;
                    color: @fontMain;
                    margin-bottom: 12px;
                }
                .text{
                    font-size: 24px;
                    line-height: 32px;
                    color: @total;
                }
            }
            .opera{
                width: 36px;
                height: 36px;
                .icon_point{
                    width: 100%;
                    height: auto;
                }
            }
        }
    }
}
</style>