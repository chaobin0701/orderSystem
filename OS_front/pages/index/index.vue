<template>
  <view class="index">
    <swiper class="swiper" circular :indicator-dots="true" :autoplay="auto" :interval="2000"
    indicator-active-color="#25ABBE"
      :duration="500">
      <swiper-item v-for="(iamgeItem,index) in imageList" :key="index">
          <image :src="iamgeItem"></image>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        imageList: [
          'http://maxchao.top/order/static/img/home-1.jpg',
          'http://maxchao.top/order/static/img/home-2.jpg',
          'http://maxchao.top/order/static/img/home-3.jpg',
        ]
      }
    },
    methods: {

    },
    created() {

    }
  }
</script>

<style >
  .container {
    padding: 20px;
    font-size: 14px;
    line-height: 24px;
  }
	.swiper {
		height: 400rpx;
    width: 100%;
	}
  image{
    width: 100%;
    height: 100%;
  }
</style>
