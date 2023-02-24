<template>
  <view class="user">
    <!-- 提示信息弹窗 -->
   <uni-popup ref="message" type="message">
     <uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
   </uni-popup>
    <!-- 用户 容器 -->
    <view class="header-box">
      <!-- 用户基本信息 -->
      <view class="user-info">
        <!-- 用户详细信息 -->
        <view class="info-detail">
          <!-- 用户未登陆 获取授权 -->
          <view class="info">
            <image class="header-img" src="@/static/images/logo.png" ></image>
            <view class="get-auth-box" >
              <button class="get-auth-btn" type="default" 
              v-if="!userInfo.userState"
              @click="toLogin"
              >点击登陆</button>  
              <text v-else>欢迎你：{{userInfo.userId}}</text>
            </view>
          </view>
        </view>
        <!-- 我的信息 -->
        <view class="handle">
          <image src="@/static/my/icon-msg.png" mode="widthFix"></image>
        </view>
      </view>
      <!-- 用户 资产-->
      <view class="assets-box">
        <!-- 用户 余额-->
        <view class="price-box item u-skeleton-fillet">
          <view class="title">
            余额
          </view>
          <view class="value">
            <text class="value-text">10</text>
            <text class="unit-text">元</text>
          </view>
          <!-- 充值 -->
          <view class="handle-box">
            充值
            <image src="@/static/my/right-arrow.png" mode="widthFix"></image>
          </view>
        </view>
        <!-- 用户 优惠券 -->
        <view class="discounts-box item u-skeleton-fillet">
          <view class="title">
            优惠券
          </view>
          <view class="value">
            <text class="value-text">10</text>
            <text class="unit-text">张</text>
          </view>
          <view class="handle-box">
            使用
            <image src="@/static/my/right-arrow.png" mode="widthFix"></image>
          </view>
        </view>
      </view>
    </view>

    <!-- 常用工具 -->
   <view class="gongge-box">
      <view class="title u-skeleton-fillet">
        <text>常用工具</text>
      </view>
      <view class="gongge-content">
        <view class="item" v-for="(item,index) in gridList" :key="index">
          <view class="item-icon" @click="gongge(item.text)">
            <image :src="item.icon" mode="widthFix" class="u-skeleton-fillet" view></image>
          </view>
          <view class="item-text">
            <text class="u-skeleton-fillet">{{item.text}}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  export default {
    data() {
      return {
        gridList: [
          {
            path: '/pages/my/balance-details', // 跳转路径
            icon: require('@/static/my/icon-yue.png'), //icon图
            text: '余额明细', //文本
          },
          {
            path: '/pages/my/coupon-code-center', // 跳转路径
            icon: require('@/static/my/icon-kabao.png'), //icon图
            text: '领券中心', //文本
          },

          {
            path: '/pages/my/company-info', // 跳转路径 TODO
            icon: require('@/static/my/icon-company-info.png'), //icon图
            text: '商家信息', //文本
          },
          {
            path: '/pages/my/online-service', // 跳转路径
            icon: require('@/static/my/icon-kefu.png'), //icon图
            text: '在线客服', //文本
          },
          {
            path: '/pages/my/suggest', // 跳转路径
            icon: require('@/static/my/icon-jianyi.png'), //icon图
            text: '改进建议', //文本
          },
          {
            path: 'clear', // 跳转路径 TODO
            icon: require('@/static/my/icon-qinghuancun.png'), //icon图
            text: '清除缓存', //文本
          },
        ],
        background: 'linear-gradient(90deg, #FA8A43 0%, #FF7250 100%)',
        msgType:'',
        messageText:''
      };
    },
    computed:{
      ...mapState({userInfo:'userInfo'})
    },
    methods: {
      // vuex上的方法
      ...mapMutations({
         SaveUserId:'userInfo/SaveUserId'
      }),
      // 获得用户信息_微信小程序
      getWXUserInfo() {
        console.log('getWXUserInfo');
      },
      toLogin(){
        uni.navigateTo({
          url:'login'
        })
      },
      // 点击功能区
      gongge(text){
        switch(text){
          case '清除缓存':
          this.open('success','正在清除缓存')
          this.$store.dispatch('clearMsg')
          setTimeout(()=>{
            uni.clearStorage(); //清除缓存
          },1500)
          break;
          default:
          this.open('error','功能尚未开发')
          break;
        }
      },
      // 弹窗
      open(type,text){
        this.msgType = type
        this.messageText = text
        this.$refs.message.open()
      }
    },
    created(){
      // 判断用户是否登录
      if(uni.getStorageSync('userState')){
        // 将id传递给 SaveUserId 存储
        this.SaveUserId(uni.getStorageSync('userId'))
      }
    }
  }
</script>

<style lang="scss">
  .header-box {
    width: 100%;
    height: calc(428rpx - 44px);
    padding-top: 20rpx;
    background: linear-gradient(90deg, #52bbc8 0%, #25ABBE 100%);
  }

  .user-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 24rpx;
    box-sizing: border-box;

    .info-detail {

      // display: flex;
      // align-items: center;
      .header-img {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        margin-right: 18rpx;
      }

      .info {
        display: flex;
        align-items: center;
        text{
          color: #fff;
        }
        .user-name {
          display: flex;
          align-items: center;
          font-size: 28upx;
          color: white;
          white-space: nowrap;

          @keyframes rotatefresh {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          image {
            margin-left: 20rpx;
            width: 32rpx;
            height: 32rpx;

            /* #ifndef MP-WEIXIN */
            &:active {
              animation: rotatefresh 1s;
            }

            /* #endif */
            /* #ifdef MP-WEIXIN */
            &:hover {
              animation: rotatefresh 1s;
            }

            /* #endif */

          }
        }

        .user-phone {
          margin-top: 12rpx;

          .get-phone-btn {
            min-width: 148rpx;
            height: 42rpx;
            font-size: 24upx;
            color: #FF7250;
            background-color: white;
            border-radius: 8rpx;
            text-align: center;
            line-height: 42rpx;
          }

          .phone-number {
            color: white;
            font-size: 26upx;
          }
        }

        .get-auth-box {
          .get-auth-btn {
            min-width: 148rpx;
            height: 56rpx;
            line-height: 56rpx;
            font-size: 28upx;
            color: #25ABBE;
            background-color: white;
            border-radius: 8rpx;
            text-align: center;
            padding: 0 12rpx;
            box-sizing: border-box;
          }
        }
      }
    }

    .handle {
      margin-right: 20rpx;
      width: 50rpx;
      height: 50rpx;

      image {
        width: 50rpx;
        height: 50rpx;
      }
    }
  }

  .assets-box {
    width: 100%;
    padding: 0 24rpx;
    margin: 24rpx 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;

    .item {
      width: 50%;

      .title {
        margin-bottom: 10rpx;
        font-size: 26upx;
      }

      .value {
        margin-bottom: 12rpx;

        .value-text {
          font-size: 40upx;
          font-weight: bold;
        }

        .unit-text {
          font-size: 28upx;
          margin-left: 10rpx;
        }
      }

      .handle-box {
        image {
          width: 20rpx;
          height: 20rpx;
        }
      }
    }
  }

  // 功能区
  .gongge-box {
    width: 100%;
    padding: 0 24rpx;
    box-sizing: border-box;
    margin-top: 46rpx;

    .title {
      font-size: 32upx;
      font-weight: bold;
      color: #333333;
    }

    .gongge-content {
      display: flex;
      flex-flow: wrap;

      .item {
        width: 25%;
        text-align: center;
        margin-top: 24rpx;

        .item-icon {
          image {
            width: 84rpx;
            height: 84rpx;
          }
        }

        .item-text {
          font-size: 26upx;
          color: #333333;
          margin-top: 16rpx;
        }
      }
    }
  }
</style>
