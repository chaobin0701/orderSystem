<template>
  <view class="home">
    <!-- 提示信息弹窗 -->
    <uni-popup ref="message" type="message">
      <uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
    </uni-popup>
    <!-- 轮播图区域 -->
    <view class="swiper-box">
      <!-- 轮播图 -->
      <swiper class="swiper" circular :indicator-dots="true" :autoplay="false" :interval="3000"
         indicator-active-color="#25ABBE" :duration="500">
         <swiper-item v-for="(iamgeItem,index) in imageList" 
         :key="index" mode="aspectFit"
         >
           <image :src="iamgeItem"></image>
         </swiper-item>
       </swiper>  
    </view>
    <!-- 文字滚动 -->
    			<uni-notice-bar show-icon scrollable
          :speed="50"
          background-color="#ECF9FF"
          color="#25ABBE"
    			:text="text" />
    <!-- 导航区域 -->
    <view class="nav">
      <view class="nav-item" v-for="(item,index) in navList" :key="index"
       @click="gongneng(item.text)"
      >
        <uni-icons class="nav-item-icon"  :type="item.image" 
        size="60" color="#25abbe"
        ></uni-icons>
        <text class="nav-item-text"> {{item.text}}</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        imageList: [
          'http://maxchao.top/order/static/img/banner-1.jpg',
          'http://maxchao.top/order/static/img/banner-2.jpg',
          'http://maxchao.top/order/static/img/banner-3.jpg',
          'http://maxchao.top/order/static/img/banner-4.jpg',
          'http://maxchao.top/order/static/img/banner-5.jpg',
        ],
        navList:[
          {image:'scan',text:'扫码点餐'},
          {image:'checkbox',text:'提前预订'},
          {image:'vip',text:'会员中心'},
          {image:'location',text:'门店导航'},
        ],
        text:"超能鹿战队是一个致力于功能性商业健身餐的品牌，经营理念是带给现代年轻人积极向上的生活态度，在吃饱的基础上产品以健身的专业功能性为出发点、以减肥的需求为核心、真实效果为口碑，满足用户需求",
        msgType:'',
        messageText:''
      }
    },
    methods: {
      gongneng(text){
        switch(text){
          // case '扫码点餐':
          // let that = this
          // uni.scanCode({
          //   onlyFromCamera:true,
          //   scanType:['qrCode'],
          //   success(res){
          //     console.log('条码类型：' + res.scanType);
          //     console.log('条码内容：' + res.result);
          //     console.log('参数值',res);
          //   },
          //   fail(){
          //     console.log('失败了');
          //   }
          // })
          // break;
          case '会员中心':
          uni.switchTab({
            url:'/pages/user/user'
          })
          break;
          default:
          this.open('error','改功能暂未开发，敬请期待！')
          break;
        }
      },
      // 获取url后面的query
      getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = uni.location.search.substr(1).match(reg);
        if (r != null) {
          return unescape(r[2]);
        }
        return null;
      },
      // 弹窗
      open(type,text){
        this.msgType = type
        this.messageText = text
        this.$refs.message.open()
      }
    }
  }
</script>

<style lang="less">
  // 轮播图区域
  .swiper {
    width: 100%;
    height: 192rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }
  // nav区域
  .nav{
    width: 100%;
    height: 500rpx;
    display: flex;
    flex-wrap: wrap;
    .nav-item{
      width: 50%;
      height: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      border:1px solid #ebedf0 ;
      .nav-item-icon{
        
      }
      .nav-item-text{
        font-size: 32rpx;
        color: #25abbe;
        padding-top: 10rpx;
      }
    }
  }
</style>
