<template>
  <!-- 排序所有订单 -->
  <view class="filterOrder">
    <view class="filterOrder-box">
      <view :class="active == '全部'? 'active':''" @click="active = '全部'">全部</view>
      <view :class="active == '待付款'? 'active':''" @click="active = '待付款'">待付款</view>
      <view :class="active == '待收货'? 'active':''" @click="active = '待收货'">待收货</view>
      <view :class="active == '待评价'? 'active':''" @click="active = '待评价'">待评价</view>
      <view :class="active == '已完成'? 'active':''" @click="active = '已完成'">已完成</view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"filterOrder",
    data() {
      return {
        active:"全部"
      };
    },
    watch:{
      active(newActive){
        this.$emit('changeOrderFliter',newActive)
      }
    }
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