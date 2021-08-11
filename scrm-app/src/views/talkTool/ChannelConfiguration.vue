<template>
  <div>
    <div class="topInfo">
      <div class="top_left_box">
        <div class="blue-tap"></div>
        <div class="flag">全部渠道</div>
        <div class='editButton'
                @click="showCompany(1)">
              <i class="el-icon-edit"></i>
            新增
          </div>

      </div>
      <div class="top_right_box">
            
      </div>
   </div>

    渠道配置
  </div>
</template>


<style lang ="less">
  .ChannelConfiguration{
    .topInfo{
      height: 115px;
      background: #ffffff;
      .top_left_box{
        display: flex;
        /* display : inline-block; */
        .blue-tap{
          height: 28px;
          width: 8px;
          background: #4168F6;
          margin-left: 24px;
          margin-top: 44px;
        }
        .flag{
          margin-top: 44px;
          height: 45px;
          width: 128px;
          text-align: center;
        }
        .editButton {
          right: 0px;
            color: #838a9d;
            width: 152px;
            height: 68px;
            border-radius: 8px;
            border: 2px solid #d9dae4;
            text-align: center;
            line-height: 68px;
            margin-top: 24px;
            margin-right:0;
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
    }
  }
</style>