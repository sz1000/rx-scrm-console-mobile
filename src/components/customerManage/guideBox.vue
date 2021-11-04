<template>
    <div v-if="visible" class="guide-box">
        <div class="mask" :class="{'mask-after': showType == 2}"></div>
        <div class="content">
            <div v-if="showType == 1" class="tip-box">
                <div class="tips">
                    <p>点击“@”符号，选择人员后发送消息及时提醒同事协助。</p>
                    <span @click="hide">知道了</span>
                </div>
                <div class="at-icon">
                    <img class="img" src="../../assets/images/at_icon.png" alt="">
                </div>
            </div>
            <div v-else class="tip-box">
                <div class="item-list">
                    <img class="img" src="../../assets/images/item_list.png" alt="">
                </div>
                <div class="tips tips-list">
                    <p>点击人名@苏沐橙 或者头像可以快速@同事</p>
                    <span @click="hide">知道了</span>
                </div>
                <div class="at-box">
                    <img class="img" src="../../assets/images/at_box.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            visible: false,
            showType: 1
        }
    },
    methods: {
        show(type) {
            this.showType = type
            this.visible = true
        },
        hide() {
            this.visible = false
        },
    },
}
</script>
<style lang="less" scoped>
.guide-box {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    .mask {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .3);
    }
    .mask-after {
        background-color: rgba(0, 0, 0, .7);
    }
    .content {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        .tip-box {
            position: absolute;
            bottom: 20px;
            left: 23px;
        }
        .tips {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 578px;
            height: 151px;
            background: url('../../assets/images/board_before.png');
            background-size: 100% 100%;
            color: #fff;
            font-size: 0;
            p {
                max-width: 80%;
                padding: 28px 30px 43px;
                font-size: 28px;
            }
            span {
                display: block;
                min-width: 26%;
                height: 68px;
                line-height: 68px;
                border-left: 2px solid #fff;
                padding: 0 30px;
                font-size: 28px;
            }
        }
        .tips-list {
            margin: 42px 0 191px 25px;
            background: url('../../assets/images/board.png');
            background-size: 100% 100%;
        }
        .at-icon {
            width: 80px;
            height: 80px;
            margin-top: 30px;
            overflow: hidden;
        }
        .item-list {
            width: 678px;
            height: 166px;
            margin-left: 25px;
        }
        .at-box {
            width: 703px;
            height: 74px;
        }
        .img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>