<template>
  <view class="container">
    <!-- 提示信息弹窗 -->
    <uni-popup ref="message" type="message">
      <uni-popup-message type="error" message="请先登录账户后下单" :duration="2000">
      </uni-popup-message>
    </uni-popup>
    <!-- 搜索 -->
    <search @clickSearch="toSearchGoods"></search>
    <!-- 菜品 -->
    <good-list></good-list>
    <!-- 结算 -->
    <settlement @trigger="toConfirmOrder" text="去结算"></settlement>
  </view>
</template>

<script>
  import search from '@/components/search.vue'
  import settlement from '@/components/settlement.vue'
  import goodList from '@/components/goodList.vue'
  export default {
    data() {
      return {
        goodsMsg: '',
        // 实现左右菜单联动
        windowHeight: '0px',
        clickId: '',
        clickToId: '',
        currentNum: 0,
        topList: [],
        isLeftClick: false
      }
    },
    components:{search,settlement,goodList},
    methods: {
      // 点击搜索组件
      toSearchGoods() {
        uni.navigateTo({url:'searchGood'}) // 跳转到搜索页面
      },
      // 点击结算按钮
      toConfirmOrder() {
        // 判断 : 用户是否登录 
        if(uni.getStorageSync('userState')){
          console.log('用户以登录');
          uni.navigateTo({url:'confirmOrder'}) // 跳转至结算页面
        }else {
          console.log('用户未登录')
          this.$refs.message.open()
          // uni.switchTab({url:'/pages/user/user'})// 跳转至登录页面
        }
      },
    }
  }
</script>

<style lang="scss">
  // 高度适配
  page {
    height: 100%;
    .container {
      height: 100%;
    }
  }
  // 商品列表
  .goodWrapper {
    display: flex;
    height: 100%;
    // 分类列表
    .classify-box {
      width: 200rpx;
      height: 100%;
      box-sizing: border-box;
      padding-top: 80rpx;
      padding-bottom: 100rpx;
      .classify {
        width: 100%;
        height: 100%;

        .classify-item {
          width: 100%;
          height: 100rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          text {
            width: 100%;
            text-align: center;
            font-size: 26rpx;
          }
        }

        // 选择的样式
        .classify-item.active {
          box-sizing: border-box;
          padding-right: 14px;
          text {
            background-color: #F7F8FA;
            padding: 20rpx 0;
            border-radius: 0 20rpx 20rpx 0;
            border-left: 10rpx solid #25ABBE;
          }
        }
      }
    }

    // 商品列表
    .goodsBox {
      flex: 1;
      scroll-view{
        box-sizing: border-box;
        padding-top: 80rpx;
        padding-bottom: 100rpx;
      }
      .goodsList {
        // 商品大类名
        border-radius: 20rpx 20rpx 0 0;
        background-color: #F7F8FA;
        box-sizing: border-box;
        padding: 20rpx 10rpx;
        margin: 20rpx 0 0 0;
        .title {
          height: 40rpx;
          width: 100%;
          font-size: 30rpx;
          font-weight: bold;
          line-height: 40rpx;
          padding-left: 20rpx;
          color: #25ABBE;
        }

        // 商品内容
        .box {
          flex: 1;
          display: flex;
          height: 200rpx;
          margin: 20rpx 0;
          box-shadow: 0 0 10rpx rgba(200, 200, 200, .3);
          border-radius: 8rpx 0 0 8rpx;
          overflow: hidden;

          // 商品图片
          .good-image {
            height: 200rpx;
            width: 200rpx;

            image {
              height: 200rpx;
              width: 200rpx;
            }
          }

          // 商品详情
          .goods-describe {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            flex: 1;
            padding: 10rpx;
            padding-right: 30rpx;
            font-size: 28rpx;
            align-items: flex-end;

            .goodName {
              text-align: right;
            }

            .goodPrice {
              color: #ee7647;
            }

            .bjq-btn-box {
              display: flex;
              height: 50rpx;

              .good-number {
                line-height: 50rpx;
              }

              button,
              text {
                padding: 0 10rpx;
              }
            }

            .mini-btn {
              height: 50rpx;
              width: 50rpx;
              line-height: 50rpx;
              margin: 0;
              padding: 0;
              background-color: #25ABBE;
              border-radius: 50%;
              color: #fff;
            }
          }
        }
      }
    }

  }
</style>
