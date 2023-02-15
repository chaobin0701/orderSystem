<template>
  <view class="register">
    <!-- 提示信息弹窗 -->
    <uni-popup ref="message" type="message">
      <uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
    </uni-popup>
    <view class="box">
      <view class="title">
        <text class="title_2">注册</text>
        <text class="title_1" @click="goLogin">返回登陆></text>
      </view>
      <!-- 账户 -->
      <view class="user">
        <text class="tips" :class="userNumberState ? '':'error'">{{userNumberPrompt}}</text>
        <view class="userInput">
          <uni-icons type="staff-filled" size="24" color="#25ABBE"></uni-icons>
          <input type="text" maxlength="12" v-model="userInfo.userNumber">
        </view>
      </view>
      <!-- 密码 -->
      <view class="password">
        <text class="tips">密码 6-12位</text>
        <view class="userPwd">
          <uni-icons type="locked-filled" size="24" color="#25ABBE"></uni-icons>
          <input type="password" maxlength="20" v-model="userInfo.password">
        </view>
      </view>
      <!-- 电话 -->
      <view class="phone">
        <text class="tips">手机号码</text>
        <view class="userPhone">
          <uni-icons type="phone-filled" size="24" color="#25ABBE"></uni-icons>
          <input type="text" maxlength="20" v-model="userInfo.phoneNumber">
        </view>
      </view>
      <!-- 姓名 -->
      <view class="name">
        <text class="tips">姓名</text>
        <view class="userName">
          <uni-icons type="person-filled" size="24" color="#25ABBE"></uni-icons>
          <input type="text" maxlength="20" v-model="userInfo.name">
        </view>
      </view>
      <button class="btn-login" @click="registerBtnHandel">
        注册
      </button>
    </view>
  </view>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
  export default {
    name:"login-register",
    data() {
      return {
        msgType: '',
        messageText: '',
        userInfo:{ //用户填写的信息
          userNumber:'',
          password:'',
          phoneNumber:'',
          name:'',
          sex:'男',
          T_id:uuidv4().slice(0,21),
        },
        timer:'',
        userNumberPrompt:"账号 6-12位",
        userNumberState:true, //账号是否可用
      };
    },
    watch:{
      'userInfo.userNumber':{
        deep:true,
        handler(newNumber){ //检测账号是否可用
          clearTimeout(this.timer)
          this.timer = setTimeout(()=>{
            if(newNumber.trim().length >= 6){
              uni.$http.post(`/judgeAccount?account=${newNumber}`)
              .then(res=>{
                if(res.data.result == 1){ //账号以存在
                  this.userNumberPrompt = '账号 6-12位 (账号已存在)'
                  this.userNumberState = false
                }else{ //账号可注册
                  this.userNumberPrompt = '账号 6-12位 (账号可注册)'
                  this.userNumberState = true
                }
              })
            }else{
              this.userNumberPrompt = '账号 6-12位'
              this.userNumberState = true
            }
          },500)
        }
      }
    },
    methods:{
      registerBtnHandel(){
        if(this.userInfo.userNumber.trim().length < 6 && this.userNumberState){
          this.open('error','请输入正确的账号')
          return 
        }else if(this.userInfo.password.trim().length < 6){
          this.open('error','请输入正确的密码')
          return
        }else if(this.userInfo.phoneNumber.trim().length < 6){
          this.open('error','请输入正确的手机号')
          return
        }else if(this.userInfo.name.trim().length < 1){
          this.open('error','请输入正确的姓名')
          return 
        }
        this.$emit('registerHandel',this.userInfo)
      },
      goLogin(){
        this.$emit('goLogin')
      },
      open(type,text){
        this.msgType = type
        this.messageText = text
        this.$refs.message.open()
      }
    }
  }
</script>

<style lang="scss">
// 登录组件样式
    .register{
      padding-top: 100rpx;
      width: 100%;
      .box{
        display: flex;
        height: 900rpx;
        width: 75%;
        padding: 40rpx;
        margin: 0 auto;
        border-radius: 26rpx;
        background-color: #fff;
        flex-direction: column;
        color: #25ABBE;
        justify-content: space-between;
        .title{
          display: flex;
          justify-content: space-between;
          width: 100%;
          height: 70rpx;
          line-height: 70rpx;
          margin: 22rpx 0;
          .title_1{
            font-size: 28rpx;
            border-bottom: 1px solid #25ABBE;
          }
          .title_2{
            font-weight: bold;
            color: #2096a6;
            font-size: 44rpx;
          }
        }
        input{
          width: 100%;
          padding-left: 15rpx;
          height: 90%;
        }
        .user,.password,.phone,.name{
          display: flex;
          margin: 20rpx 0;
          height: 120rpx;
          flex-direction: column;
          .userInput,.userPwd,.userPhone,.userName{
            display: flex;
            height: 60rpx;
            box-sizing: border-box;
            height: 60rpx;
            margin: 10rpx 0;
            border-bottom: 1px solid rgba(49, 148, 167, 0.3);
          }
        }
        .tips{
          align-self: flex-start;
          font-size: 28rpx;
          height: 40rpx;
          line-height: 40rpx;
          padding-bottom: 20rpx;
        }
        .tips.error{
          color: red;
        }
        button{
          margin: 80rpx 0 0;
          border: none;
          height: 70rpx;
          line-height: 70rpx;
          font-size: 40rpx;
          background-color: #22a2b3;
          color: #fff;
          border-radius: 100rpx;
        }
      }
    }
</style>