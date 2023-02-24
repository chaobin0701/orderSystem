<template>
    <!-- 登录页面-登录组件 -->
    <view class="login">
      <!-- 提示信息弹窗 -->
      <uni-popup ref="message" type="message">
        <uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
      </uni-popup>
      <view class="box">
        <view class="title">
          <text class="title_2">登陆</text>
          <text class="title_1" @click="goRegister">注册账号></text>
        </view>
        <!-- 账户 -->
        <view class="user">
          <text class="tips">用户名</text>
          <view class="userInput">
            <uni-icons type="staff-filled" size="24" color="#25ABBE"></uni-icons>
            <input type="text" maxlength="12" v-model="userInfo.userNumber">
          </view>
        </view>
        <!-- 密码 -->
        <view class="password">
          <text class="tips">输入密码</text>
          <view class="userPwd">
            <uni-icons type="locked-filled" size="24" color="#25ABBE"></uni-icons>
            <input type="password" maxlength="20" v-model="userInfo.password">
          </view>
        </view>
        <button class="btn-login" @click="loginHandel">
          登录
        </button>
      </view>
    </view>
</template>

<script>
  export default {
    name:"login-dl",
    data() {
      return {
        msgType: '',
        messageText: '',
        userInfo:{
          userNumber:'',
          password:'',
        }
      };
    },
    methods:{
      // 登陆
      loginHandel(){
        if(this.userInfo.userNumber.trim().length < 5){ 
          this.open('error','请输入正确的账号')
          return //账号长度不够
        }else if(this.userInfo.password.trim().length < 5){
          this.open('error','请输入正确的密码')
          return //密码长度不够
        }
        this.$emit('loginHandel',this.userInfo)
      },
      // 注册账号
      goRegister(){
        this.$emit('goRegister')
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
    .login{
      padding-top: 200rpx;
      width: 100%;
      .box{
        display: flex;
        height: 700rpx;
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
        .user,.password{
          display: flex;
          margin: 20rpx 0;
          height: 120rpx;
          flex-direction: column;
          .userInput,.userPwd{
            display: flex;
            height: 60rpx;
            box-sizing: border-box;
            height: 60rpx;
            margin: 10rpx 0;
            border-bottom: 1px solid rgba(49, 148, 167,.3);
          }
        }
        .tips{
          align-self: flex-start;
          font-size: 28rpx;
          height: 40rpx;
          line-height: 40rpx;
          padding-bottom: 20rpx;
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