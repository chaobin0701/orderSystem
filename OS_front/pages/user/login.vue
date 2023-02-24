<template>
  <view class="login-box" >
    <!-- 提示信息弹窗 -->
    <uni-popup ref="message" type="message">
      <uni-popup-message :type="msgType" :message="messageText" :duration="2000">
      </uni-popup-message>
    </uni-popup>
    <!-- 登陆组件 -->            
    <uni-transition mode-class="slide-right" :show="state == 'login'" :duration="700">
      <loginDl
       @loginHandel="loginHandel" 
       @goRegister="goRegister"
       ></loginDl>
    </uni-transition>
    <!-- 注册组件 -->
    <uni-transition mode-class="slide-right"  :show="state == 'register'" :duration="700">
      <loginRegister
       @registerHandel="registerHandel"
       @goLogin="goLogin"
       ></loginRegister>
    </uni-transition>
  </view>
</template>

<script>
  import loginDl from '@/components/login-dl.vue'
  import loginRegister from '@/components/login-register.vue'
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  export default {
    components:{loginDl,loginRegister},
    data() {
      return {
        state:'login',
        msgType: '',
        messageText: '',
      };
    },
    methods:{
      ...mapActions({ saveUserId: 'userInfo/saveUserId' }),
      // 登录按钮
      loginHandel(obj){
        let {userNumber,password} = obj
        // 发送请求
        const params = {
          account: userNumber, password: password
        }
        uni.$http.post('/loginQuery',params)
        .then(res=>{
          if(res.data.status == 1){ // :1为成功 :-1失败
            this.saveUserId(res.data.res[0].T_id) //持久化存储用户登录状态
            this.open('success','登陆成功,跳转至用户中心')
            setTimeout(()=>{
              uni.switchTab({url:'user'})
            },1500)
          }else{
            this.open('error','登陆失败')
          }
        },()=>{
          this.open('error','登陆失败，请重试！')
        })
      },
      // 注册按钮回调
      registerHandel(obj){
        let {userNumber,password,phoneNumber,name,sex,T_id} = obj
        // 创建 params 数据
        const params = {
          T_id,name,password,sex,
          account:userNumber,
          phone:phoneNumber,
        }
        uni.$http.post('/registeredAccount',params)
        .then(res=>{
          if(res.data.status == 1){
            this.open('success','注册成功,返回登陆中')
            setTimeout(()=>{
              this.state = 'login'
            },1000)
          }else{
            this.open('error','注册失败')
          }
        },()=>{
          this.open('error','未知错误，创建账号失败，请重试！')
        })
      
      },
      // 返回登陆的回调
      goLogin(){
        this.state = 'login'
      },
      // 返回注册的回调
      goRegister(){
        this.state = 'register'
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
  .login-box{
    width: 100%;
    height: 100%;
    position: relative;
    background: linear-gradient(30deg, #52bbc8 0%, #25ABBE 100%);
      .login,.register{
        position: absolute;
        .box{
          box-shadow: 0px 0px 60rpx 0rpx rgba(100, 100, 100, .4);
        }
      }
  }

  
</style>
