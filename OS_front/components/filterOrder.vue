<template>
  <!-- 排序所有订单 -->
  <view class="filterOrder">
    <view class="filterOrder-box">
      <view :class="active == '0'? 'active':''" @click="btnHandle('0')">全部</view>
      <view :class="active == '1'? 'active':''" @click="btnHandle('1')">待付款</view>
      <view :class="active == '2'? 'active':''" @click="btnHandle('2')">待收货</view>
      <view :class="active == '3'? 'active':''" @click="btnHandle('3')">待评价</view>
      <view :class="active == '4'? 'active':''" @click="btnHandle('4')">已完成</view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"filterOrder",
    data() {
      return {
        active:"0"
      };
    },
	methods:{
		btnHandle(key){
			this.active = key
			this.$emit('changeOrderFliter',key)
		}
	},
  }
</script>

<style lang="scss">
 .filterOrder{
   z-index: 1;
   position: fixed;
   width: 100%;
   box-shadow: 0 6rpx 8rpx #dbdbdb;
   .filterOrder-box{
     display: flex;
     background-color: #fff;
     height: 70rpx;
     align-items: center;
     justify-content: space-around;
     view{
      width: 20%;
      text-align: center;
     }
     view.active{
       color: #25abbe;
       font-weight: 700;
     }
   }
 }
</style>