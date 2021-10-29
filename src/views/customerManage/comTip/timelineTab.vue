<template>
  <div class="clueWarp">
  		<div class="dynamic">
						        <!--<div class="t_text">
						          <span class="label_tag">线索动态</span>
						        </div>-->
						        
						        <van-tabs v-model="activeName"
						        	title-active-color="#4168F6"
						        	title-inactive-color="#3C4353"
						        	@change="changeTimeLine"
						        	>
										  <van-tab title="全部" name="3">
										 
										  </van-tab>
										  <van-tab title="线索动态" name="2">
										  	
										  </van-tab>
										  <van-tab title="跟进记录" name="1">
										  
										  </van-tab>
										</van-tabs>
						        
						        <div class="timeLine">
						          <el-timeline>
						            <el-timeline-item v-for="(item, index) in timeLineList"
						                              :key="index"
						                              color="#4168F6"
						                              type="danger ">
						              <div class="recordBox">
						                <div class="descTxt">{{ item.title }}</div>
						                <div class="inLineTwo">{{ item.context }}</div>
						                <div class="inLine">
						                  <div class="inLineEnd">操作人：{{ item.userName }}</div>
						                  <span class="time_right">
						                    {{ formatDate(item.createTime, "yyyy-MM-dd hh:mm:ss") }}
						                  </span>
						                </div>
						              </div>
						            </el-timeline-item>
						          </el-timeline>
						        </div>
						        
						      </div>
  </div>
</template>
<script>
	import { formatDate, _throttle } from '../../../utils/tool'
	import { BASE_URL } from '../../../utils/request.js'
export default {
  data() {
    return {
      objItem: JSON.parse(localStorage.getItem('detail')),
			timeLineList: [],
			activeName:'2',
    };
  },
  watch: {

  },
   computed: {
            headers(){
                return {
                    "Accept": "application/json",
                    "token": localStorage.getItem('token')
                }
            }
  },
  created() {

  },
  mounted() {
  	    this.getTimeline()
  },
  methods: {
  	   formatDate,
    changeTimeLine(name){
    	console.log(name)
    	console.log(typeof name)
    	switch (Number(name))
				{
				    case 1:
				    this.getTimeline(1) 
				    break;
				    case 2:
				    this.getTimeline(2) 
				    break;
				    case 3:
				    this.getTimeline('') 
				    break;
				    default:
				}
    },
    getTimeline(name) {
      console.log(name)
	      let obj = {
	        clueCustomerNo: this.objItem.clueCustomerNo,
	        punckStatus: name,
	      }
      
      this.$network
        .get('/customer-service/clueCustomerFollowUser/selectFollowMsgList', obj)
        .then((res) => {
          this.timeLineList = res.data
        })
    },
  },
};
</script>
<style lang="less" scoped>
.clueWarp {
	position: relative;
  height: 100%;
}
    .dynamic {
      font-size: 28px;
      .t_text {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        .label_tag {
          font-weight: 600;
          color: #3c4353;
          position: relative;
          padding-left: 10px;
          &::before {
            content: '';
            width: 8px;
            height: 28px;
            background: #4168f6;
            position: absolute;
            top: 7px;
            left: -10px;
          }
        }
        .editButton {
          color: #838a9d;
          width: 152px;
          height: 68px;
          border-radius: 8px;
          border: 2px solid #d9dae4;
          text-align: center;
          line-height: 68px;
          span {
            display: inline-block;
          }
          img {
            display: inline-block;
            vertical-align: middle;
            margin: -10px 10px 0 0;
            margin-right: 5px;
            width: 28px;
            height: 28px;
          }
        }
      }
      .allText {
        color: #4168f6;
        margin-bottom: 16px;
      }
      .timeLine {
      	margin-top: 60px;
        .el-timeline {
          padding-left: 0 !important;
        }
        .recordBox {
          // width: 676px;
          min-height: 180px;
          background: rgba(65, 104, 246, 0.06);
          border-radius: 8px;
          color: #3c4353;
          padding: 16px 16px 0;
          font-size: 28px;
          .inLine {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            .time_right {
              font-size: 28px;
              color: #838a9d;
            }
            img {
              width: 10px;
              height: 10px;
            }
          }
          .inLineTwo {
            margin-bottom: 16px;
            display: inline-block;
            word-break: normal;
            word-break: break-all;
            word-break: keep-all;
            word-break: break-word;
            // display: -webkit-box;
            // -webkit-box-orient: vertical;
            // -webkit-line-clamp: 2;
            // overflow: hidden;
          }
          .inLineEnd {
            text-align: right;
          }
          .descTxt {
            font-weight: 600;
            color: #3c4353;
            margin-bottom: 16px;
          }
        }
      }
    }
    
    
          .timeLine {
      	margin-top: 60px;
        .el-timeline {
          padding-left: 0 !important;
        }
        .recordBox {
          // width: 676px;
          min-height: 180px;
          background: rgba(65, 104, 246, 0.06);
          border-radius: 8px;
          color: #3c4353;
          padding: 16px 16px 0;
          font-size: 28px;
          .inLine {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            .time_right {
              font-size: 28px;
              color: #838a9d;
            }
            img {
              width: 10px;
              height: 10px;
            }
          }
          .inLineTwo {
            margin-bottom: 16px;
            display: inline-block;
            word-break: normal;
            word-break: break-all;
            word-break: keep-all;
            word-break: break-word;
            // display: -webkit-box;
            // -webkit-box-orient: vertical;
            // -webkit-line-clamp: 2;
            // overflow: hidden;
          }
          .inLineEnd {
            text-align: right;
          }
          .descTxt {
            font-weight: 600;
            color: #3c4353;
            margin-bottom: 16px;
          }
        }
      }
      /deep/.van-tabs__line{
	    background-color: #FFFFFF;
}
/deep/.van-tab{
		display: initial;
		margin-right: 32px;
		-webkit-box-flex: inherit;
    -webkit-flex: inherit;
    flex: inherit;
    line-height: 50px;
    margin-bottom:70px;
    font-size: 30px;
}
</style>