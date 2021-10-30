<template>
    <div class="detail_wrap">
        <TopTitle :title="`${id?'编辑':'新增'}群活码`"></TopTitle>
        <div class="detail_content">
            <div class="item">
                <div class="label"><i>*</i>活码名称：</div>
                <div class="val">
                    <div class="input_box">
                        <input class="input" v-model="detail.name" maxlength="12" type="text" @input="detail.name=detail.name.replace(' ','')" placeholder="请输入活码名称">
                        <span class="length">{{detail.name.length}}/12</span>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="label"><i>*</i>渠道：</div>
                <div class="val">
                    <div class="select_box" @click="openPicker('channel')">
                        <input class="input" v-model="detail.region" type="text" placeholder="请选择" disabled>
                        <img class="icon" src="@/assets/images/icon_select.png" alt="">
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="label"><i>*</i>拉群方式：</div>
                <div class="val">
                    <div class="select_box" @click="openPicker('mode')">
                        <input class="input" :class="{'disable':id}" v-model="modeName" type="text" placeholder="请选择" disabled>
                        <img class="icon" src="@/assets/images/icon_select.png" alt="">
                    </div>
                </div>
            </div>
            <div class="item lh40">
                <div class="label">添加联系人：</div>
                <div class="val">
                    <van-switch v-model="detail.switchStatus" :disabled="disabled" size="24" />
                </div>
            </div>
            <div class="item" v-if="!detail.switchStatus">
                <div class="label">群名称设置：</div>
                <div class="val">
                    <div class="input_box">
                        <input class="input" v-model="detail.groupName" maxlength="12" type="text" @input="detail.groupName=detail.groupName.replace(' ','')" placeholder="请输入群名称">
                        <span class="length">{{detail.groupName.length}}/12</span>
                    </div>
                </div>
            </div>
            <div class="item" v-if="!detail.switchStatus">
                <div class="label">入群提示：</div>
                <div class="val">
                    <div class="input_box">
                        <input class="input" v-model="detail.addHint" maxlength="12" type="text" @input="detail.addHint=detail.addHint.replace(' ','')" placeholder="请输入入群提示">
                        <span class="length">{{detail.addHint.length}}/16</span>
                    </div>
                </div>
            </div>
            <div class="item" v-if="detail.switchStatus">
                <div class="label"><i>*</i>使用员工：</div>
                <div class="val">
                    <div class="select_box" @click="openUserSelect">
                        <input class="input" v-model="userName" type="text" placeholder="请选择使用员工，可多选" disabled>
                        <img class="icon" src="@/assets/images/icon_select.png" alt="">
                    </div>
                </div>
            </div>
            <div class="item" v-if="detail.switchStatus">
                <div class="label"><i>*</i>入群引导语：</div>
                <div class="val">
                    <div class="input_box textarea">
                        <textarea class="input" v-model="detail.contest" maxlength="300" type="text" placeholder="请输入入群引导语"></textarea>
                        <span class="length">{{detail.contest.length}}/300</span>
                    </div>
                </div>
            </div>
            <div class="item" v-for="(item,index) in addCodeData" :key="index">
                <div class="label"><i>*</i>二维码{{index + 1}}：</div>
                <div class="val">
                    <div class="upload_wrap">
                        <img class="delete" v-if="addCodeData.length > 1" @click="deleteFun(index)" src="@/assets/images/icon_delete.png" alt="">
                        <div class="flex_center">
                            <div class="upload_box">
                                <div class="img_box" v-if="item.groupAddress">
                                    <img :src="item.groupAddress" alt="">
                                </div>
                                <div class="upload" v-else>
                                    <img class="icon" src="@/assets/images/icon_plus.png" alt="">
                                    <div class="text">上传二维码</div>
                                </div>
                                <input type="file" class="file" @change="uploadFun($event,'2','png,jpg,jpeg',index)" accept=".png,.jpg,.jpeg">
                            </div>
                            <div class="select_box" v-if="detail.switchStatus" @click="openPicker('group',index)">
                                <input class="input" v-model="item.groupName" type="text" placeholder="选择群聊" disabled>
                                <img class="icon" src="@/assets/images/icon_select.png" alt="">
                            </div>
                        </div>
                        <div class="text_box">群上限人数<input v-model="item.groupTotal" @change="maxChangeFun(item.groupTotal,index)" @input="item.groupTotal=item.groupTotal.replace(/[^\d]/g,'')" maxlength="3" placeholder="">人</div>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="label"></div>
                <div class="val">
                    <div class="add_btn" @click="addCodeFun">新增群活码</div>
                </div>
            </div>
        </div>
        <div class="detail_footer">
            <div class="btn" @click="$router.go(-1)">取消</div>
            <div class="btn main" @click="saveFun">保存</div>
        </div>
        <!-- 单选弹窗 -->
        <van-popup v-model="showPicker" round position="bottom">
            <van-picker
                show-toolbar
                :columns="pickerList"
                value-key="name"
                @cancel="showPicker = false"
                @confirm="onConfirm"
            />
        </van-popup>
        <!-- 使用员工弹窗 -->
        <van-popup position="bottom" round v-model="userDialog">
            <div class="popup_wrap">
                <div class="popup_opera">
                    <div class="cancel_btn" @click="userDialog = false">取消</div>
                    <div class="confirm_btn" @click="confirmUserFun">确认</div>
                </div>
                <div class="popup_content">
                    <div class="check_wrap" v-if="userList.length">
                        <div class="checkbox" v-for="item in userList" :key="item.id">
                            <van-checkbox class="check" v-model="item.checked" shape="square">{{item.name}}</van-checkbox>
                        </div>
                    </div>
                    <div class="no_data_text" v-else>暂无可使用员工~</div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import  TopTitle  from './components/topTitle.vue'
import { livecodegroup_getselect,group_getGroupInfoList,livecodegroup_upload,livecodegroup_add,livecodegroup_update,livecodegroup_getByNo } from '@/api/group'
export default {
    components: {
        TopTitle
    },
    data(){
        return {
            qd: [],
            checked: false,

            userList: [],
            channelList: [],
            groupList: [],
            groupMode: [
                { name: '群二维码拉群',id: '1' },
                { name: '企微活码拉群',id: '2' },
            ],
            selectUser: [],
            detail: {
                name: '',
                contest: '',
                switchStatus: true,
                addBy: null,
                groupName: '',
                region: '',
                chId: '',
                addHint: '',
                address: '',
            },
            addCodeData: [  //新增二维码 
                {
                    groupAddress: '',
                    groupId: '',
                    groupName: '',
                    groupTotal: '200',
                }
            ],
            showPicker: false,
            pickerList: [],
            nowIndex: '',
            modeName: '',   //拉群方式
            userDialog: false,
            disabled: true,    //禁用
        }
    },
    computed: {
        id(){
            return this.$route.query.id
        },
        userName(){
            let list = this.selectUser,arr = []
            list.forEach(el => {
                this.userList.forEach(son => {
                    if(el == son.userNo){
                        arr.push(son.name)
                    }
                })
            })
            console.log('arr',arr)
            return arr.length ? arr.join('、') : ''
        },
    },
    mounted(){
        if(this.id){
            this.getDetail()
            this.disabled = true
        }else{
            this.getGroupList()
            this.getSelectList()
        }
    },
    methods: {
        getDetail(){
            livecodegroup_getByNo(this.id).then(res =>{
                if(res.result){
                    let data = res.data
                    // this.addCodeData = Object.assign(this.addCodeData,data.grouplist)
                    this.addCodeData = []
                    data.grouplist.forEach(el => {
                        let _data = {
                            groupAddress: el.groupAddress,
                            groupName: el.groupName,
                            groupTotal: el.groupTotal,
                            groupId: el.groupId,
                        }
                        this.addCodeData.push(_data)
                    })
                    this.selectUser = data.userArr
                    this.detail = Object.assign(this.detail,data.livecodeEntity)
                    this.groupMode.forEach(el => {
                        if(el.id == this.detail.addBy){
                            this.modeName = el.name
                        }
                    })
                    this.getGroupList()
                    this.getSelectList()
                }
            })
        },
        openPicker(type,i){   //打开弹窗
            this.type = type
            switch (type) {
                case 'group':   //群
                    this.nowIndex = i
                    this.pickerList = this.groupList
                    break;
                case 'mode':    //拉群方式
                    this.pickerList = this.groupMode
                    if(this.id){
                        return false
                    }
                    break;
                case 'channel': //  渠道
                    this.pickerList = this.channelList
                    break;
                default:
                    break;
            }
            this.showPicker = true
        },
        onConfirm(e){
            switch (this.type) {
                case 'group':   //群
                    this.addCodeData[this.nowIndex].groupName = e.name
                    this.addCodeData[this.nowIndex].groupId = e.chatId
                    break;
                case 'mode':    //拉群方式
                    this.disabled = e.id == '1' ? true : false
                    this.detail.addBy = e.id
                    this.groupMode.forEach(el => {
                        if(el.id == e.id){
                            this.modeName = el.name
                        }
                    })
                    break;
                case 'channel': //  渠道
                    this.detail.chId = e.id
                    this.detail.region = e.name
                    break;
                default:
                    break;
            }
            this.showPicker = false
        },
        openUserSelect(){   //打开选择成员弹窗
            this.userList.forEach(el => {
                this.selectUser.forEach(se => {
                    if(el.userNo == se){
                        el.checked = true
                    }
                })
            })
            this.userDialog = true
        },
        confirmUserFun(){   //确认员工选择
            this.selectUser = []
            this.userList.forEach(el => {
                console.log('asd',el)
                if(el.checked){
                    this.selectUser.push(el.userNo)
                }
            })
            this.userDialog = false
        },
        saveFun(){  //保存
            let data = this.detail
            let _data = {
                groupEntityList: this.addCodeData,
                userArr: this.selectUser,
                livecodeEntity: data
            }
            if(data.name == ''){
                this.$toast('请输入活码名称')
                return false
            }
            if(data.chId == ''){
                this.$toast('请选择渠道')
                return false
            }
            if(!data.addBy){
                this.$toast('请选择拉群方式')
                return false
            }
            if(data.switchStatus && this.selectUser.length == 0){
                this.$toast('请选择使用员工')
                return false
            }
            if(data.switchStatus && data.contest == ''){
                this.$toast('请选择入群引导语')
                return false
            }
            let isEmpty = false
            this.addCodeData.forEach(el => {
                if(!el.groupAddress || (data.switchStatus && !el.groupId) || !el.groupTotal){
                    isEmpty = true
                }
            })
            console.log('isA',isEmpty)
            if(isEmpty){
                this.$toast('请完善二维码信息')
                return false
            }
            let domain = ''
            if (
                location.hostname == 'dev-console.jzcrm.com' ||
                location.hostname == 'localhost'
            ) {
                domain = 'https://dev-console.jzcrm.com'
            } else if (location.hostname == 'test-console.jzcrm.com') {
                domain = 'https://test-console.jzcrm.com'
            } else {
                domain = 'https://console.jzcrm.com'
            }
            if(!data.switchStatus){
                data.address = `${domain}/#/transitCode?name=${data.name}`
            }
            console.log('save',_data)
            // return false
            if(this.id){
                livecodegroup_update(_data).then(res => {
                    if(res.result){
                        this.$toast('保存成功！')
                        this.$router.replace('/talkTool/groupCodeList')
                    }
                })
            }else {
                livecodegroup_add(_data).then(res => {
                    if(res.result){
                        this.$toast('保存成功！')
                        this.$router.replace('/talkTool/groupCodeList')
                    }
                })
            }
        },
        addCodeFun(){   //新增群活码
            let _data = {
                groupAddress: '',
                groupId: '',
                groupTotal: '200',
            }
            this.addCodeData.push(_data)
        },
        deleteFun(i){    //删除群活码
            this.addCodeData.splice(i,1)
        },
        uploadFun(e,size,accept,index){    //二维码上传
            let allowFileType = accept ? accept.split(',') : []
            let fileName = e.target.files[0].name
            let nameData = fileName.toLowerCase().split('.')
            let fileSize = e.target.files[0].size
            if (allowFileType && allowFileType.length > 0 && allowFileType.indexOf(nameData[nameData.length - 1]) == -1) {
                this.$toast('请上传' + allowFileType.join('、') + '格式的文件')
                e.target.value = ''
                return false
            }
            if (size && size > 0 && fileSize > size * 1024 * 1024) {
                this.$toast('文件大小不能超过' + size + 'M')
                e.target.value = ''
                return false
            }
            livecodegroup_upload(e).then(res => {
                if(res.result){
                    e.target.value = ''
                    this.addCodeData[index].groupAddress = res.data.url
                }
            })
        },
        getGroupList(){     //获取可选择群列表
            group_getGroupInfoList().then(res => {
                if(res.result){
                    this.groupList = res.data
                }
            })
        },
        getSelectList(){    //获取可选择渠道列表和使用员工列表
            livecodegroup_getselect().then(res => {
                if(res.result){
                    res.data.userlist.forEach(el => {
                        el.checked = false
                    })
                    this.userList = res.data.userlist
                    this.channelList = res.data.chlist
                    this.channelList.forEach(el => {
                        if(el.id == this.detail.chId){
                            this.detail.region = el.name
                        }
                    })
                }
            })
        },
        maxChangeFun(num,i){    //MAX 限制
            // console.log('num',num)
            this.addCodeData[i].groupTotal = num > 200 ? 200 : num
        },
    },
}
</script>

<style lang="less" scoped>
@import '~@/styles/color.less';
 .detail_wrap{
    width: 100%;
    background: @white;
    .popup_wrap{
        width: 100%;
        height: 44vh;
        background: @white;
        position: relative;
        padding-top: 88px;
        .popup_opera{
            width: 100%;
            height: 88px;
            position: absolute;
            font-size: 24px;
            line-height: 32px;
            top: 0;
            left: 0;
            .cancel_btn{
                color: @fontSub2;
                position: absolute;
                left: 32px;
                top: 32px;
            }
            .confirm_btn{
                color: @fontMain;
                position: absolute;
                right: 32px;
                top: 32px;
            }
        }
        .popup_content{
            width: 100%;
            height: 100%;
            position: relative;
            .top_box{
                width: 100%;
                padding: 24px;
                position: absolute;
                top: 0;
                left: 0;
                .check_tit{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    .name{
                        font-size: 24px;
                        line-height: 32px;
                        color: @fontSub2;
                    }
                }
            }
            .check_wrap{
                width: 100%;
                height: 100%;
                overflow-y: scroll;
                padding: 0 36px;
                .checkbox{
                    width: 100%;
                    padding: 20px 0;
                    display: flex;
                    align-items: center;
                    &.bg{
                        background: @checkBg;
                    }
                    .check{
                        width: 100%;
                        /deep/ .van-checkbox__icon{
                            font-size: 28px;
                        }
                        /deep/ .van-checkbox__label{
                            color: @fontMain;
                            font-size: 28px;
                            line-height: 40px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                    .c_type{
                        width: 160px;
                        text-align: right;
                        color: @fontSub2;
                        font-size: 28px;
                        line-height: 40px;
                        margin-top: 12px;
                    }
                }
            }
            .no_data_text{
                text-align: center;
                font-size: 24px;
                line-height: 40px;
                color: @fontSub2;
            }
        }
        .popup_footer{
            width: 100%;
            height: 128px;
            background: @white;
            padding: 24px;
            position: fixed;
            bottom: 0;
            left: 0;
            .footer{
                display: flex;
                justify-content: space-between;
                .btn{
                    width: calc(50% - 12px);
                    height: 80px;
                    line-height: 78px;
                    font-size: 24px;
                    border: 1px solid @main;
                    color: @main;
                    border-radius: 8px;
                    text-align: center;
                    &.main{
                        border-color: @main;
                        background: @main;
                        color: @white;
                    }
                }
            }
        }
    }
    .add_btn{
        width: 224px;
        height: 68px;
        font-size: 28px;
        line-height: 66px;
        border: 1px solid @main;
        border-radius: 8px;
        color: @main;
        background: rgba(@main,.04);
        padding-left: 52px;
        cursor: pointer;
        position: relative;
        &::before{
            content: '';
            width: 40px;
            height: 40px;
            background: url('../../../assets/images/icon_add.png') no-repeat;
            background-size: 100%;
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
    .select_box{
        width: 100%;
        height: 80px;
        border: 1px solid @bdColor;
        border-radius: 8px;
        position: relative;
        .input{
            width: 100%;
            padding: 20px 80px 20px 24px;
            font-size: 28px;
            color: @fontMain;
            &:disabled{
                opacity: 1;
                background: none;
                color: @fontMain;
            }
            &.disable:disabled{
                background: rgba(@fontMain,.01);
            }
        }
        .icon{
            width: 40px;
            height: 40px;
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
    .upload_wrap{
        width: 100%;
        min-height: 294px;
        border: 1px solid @bdColor;
        border-radius: 8px;
        position: relative;
        padding: 24px;
        .delete{
            width: 28px;
            height: 28px;
            position: absolute;
            right: 24px;
            top: 24px;
        }
        .flex_center{
            display: flex;
            align-items: center;
        }
        .upload_box{
            width: 182px;
            height: 182px;
            border: 1px solid @bdColor;
            border-radius: 4px;
            margin-right: 24px;
            position: relative;
            font-size: 0;
            .img_box{
                width: 100%;
                height: 100%;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .file{
                width: 100%;
                height: 100%;
                opacity: 0;
            }
            .upload{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                text-align: center;
                .icon{
                    width: 36px;
                    height: 36px;
                    margin-bottom: 16px;
                    display: inline-block;
                }
                .text{
                    font-size: 24px;
                    line-height: 32px;
                    color: @lengthColor;
                    white-space: nowrap;
                }
            }
        }
        .select_box{
            width: 174px;
            height: 48px;
            .input{
                width: 100%;
                font-size: 24px;
                line-height: 32px;
                padding: 6px 50px 6px 24px;
            }
            .icon{
                width: 32px;
                height: 32px;
            }
        }
        .text_box{
            margin-top: 24px;
            font-size: 28px;
            line-height: 40px;
            font-size: @fontSub2;
            input{
                width: 84px;
                height: 40px;
                line-height: 40px;
                font-size: 20px;
                border: 1px solid @bdColor;
                border-radius: 4px;
                text-align: center;
                margin: 0 16px;
            }
        }
    }
    .detail_content{
        height: calc(100vh - 216px);
        overflow-y: scroll;
        padding: 24px;
        .item{
            width: 100%;
            display: flex;
            margin-bottom: 24px;
            &:last-child{
                margin-bottom: 0;
            }
            &.lh40 .label{
                line-height: 40px;
            }
            .label{
                width: 168px;
                font-size: 28px;
                line-height: 80px;
                white-space: nowrap;
                text-align: right;
                i{
                    font-style: normal;
                    color: @red;
                }
            }
            .val{
                width: calc(100% - 168px);
                .input_box{
                    width: 100%;
                    height: 80px;
                    position: relative;
                    &.textarea{
                        height: 400px;
                        .input{
                            padding-right: 24px;
                            padding-bottom: 60px;
                            resize: none;
                        }
                        .length{
                            bottom: 12px;
                        }
                    }
                    .input{
                        width: 100%;
                        height: 100%;
                        font-size: 28px;
                        color: @fontMain;
                        padding: 20px 24px;
                        border: 1px solid @bdColor;
                        border-radius: 8px;
                        padding-right: 80px;
                    }
                    .length{
                        font-size: 28px;
                        line-height: 40px;
                        color: @lengthColor;
                        position: absolute;
                        right: 12px;
                        bottom: 20px;
                    }
                }
            }
        }
    }
    .detail_footer{
        display: flex;
        justify-content: space-between;
        padding: 24px;
        .btn{
            width: calc(50% - 12px);
            height: 80px;
            line-height: 78px;
            font-size: 24px;
            border: 1px solid @main;
            color: @main;
            border-radius: 8px;
            text-align: center;
            transition: all .2s;
            &:active{
                background: rgba(@main,.85);
            }
            &.main{
                border-color: @main;
                background: @main;
                color: @white;
            }
        }
    }
 }
</style>