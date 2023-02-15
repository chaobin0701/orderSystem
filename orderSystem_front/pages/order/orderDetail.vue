<template>
  <view class="orderDetail">
    <!-- 商品详情 -->
    <view class="box">
      <!-- 商店信息 -->
      <view class="shopInfo">
        <uni-icons type="shop-filled" size="24" color="rgb(37, 171, 190)"></uni-icons>
        <text class="name">超能鹿战队</text>
      </view>
      <view class="order-item" v-for="menu in orderDetailData" :key="menu.O_id">
        <view class="img">
          <img :src="menu.M_imgSrc" alt="">
        </view>
        <view class="order-info">
          <view class="menu-class">
            <text class="name">{{menu.M_name}}</text>
            <text class="class">{{menu.M_class}}</text>
          </view>
          <view class="menu-price">
            <text class="price">实付￥{{menu.M_price * menu.M_number}}.00元</text>
            <view>
              <text class="price-d">￥{{menu.M_price}}.00</text>
              <text class="number">×{{menu.M_number}}</text>
            </view>
          </view>
        </view>
      </view>
      <!-- 其他信息 -->
      <view class="orderOtherInfo">
         <view class="payment">
           <text class="des">实付款：</text>
           <text class="payment-price">{{totalPrice}}.00元</text>
         </view>
         <view class="order-id">
           <text class="des">订单编号：</text>
           <text>{{orderId}}</text>
         </view>
         <view class="order-state">
           <text class="des">订单状态：</text>
           <text>{{orderState}}</text>
         </view>
         <view class="trading-time">
           <text class="des">交易时间：</text>
           <text>{{orderTime}}</text>
         </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        orderId:'',
        orderDetailData:'',
        orderTime:'',
        totalPrice:0,
        orderState:''
      };
    },
    methods:{
      // 计算订单总价
      getTotalPrice(){
        this.totalPrice =  this.orderDetailData.reduce((prev,next)=>{
          prev += next.M_number * next.M_price
          return prev
        },0)
      }
    },
    onLoad(option) {
      // 获取路径信息
      this.orderTime = option.orderTime
      this.orderId = option.orderId
      this.orderState = option.orderState
      // 根据id查询订单详情
      uni.$http.get(`/getDataTableJudge?tableName=menusorder_info&key=O_id&value=${this.orderId}`)
      .then(res=>{
        this.orderDetailData = res.data.tableArr
        this.getTotalPrice()
      },err=>{
        console.log('获取订单数据失败',err);
      })
    }
  }
</script>

<style lang="scss">
 .orderDetail{
   background-color: #f3f3f3;
   box-sizing: border-box;
   padding: 20rpx 14rpx;
   overflow-y: auto;
   .box{
     // 商店信息
     .shopInfo{
       display: flex;
       align-items: center;
       .name{
         padding-left: 14rpx;
         color: rgb(37, 171, 190);
         font-weight: 700;
         font-size: 16px;
       }
     }
     background-color: #fff;
     box-sizing: border-box;
     height: 100%;
     padding: 20rpx 30rpx 20rpx;
   }
 }
 // 订单商品的展示
 .order-item{
   box-sizing: border-box;
   display: flex;
   justify-content: space-between;
   border-radius: 20rpx;
   margin: 20rpx 0;
   height: 220rpx;
   padding: 30rpx;
   background-color: #f8f8f8;
   .img{
      width: 160rpx;
      height: 160rpx;
     img{
       height: 100%;
       width: 100%;
     }
   }
   .order-info{
     flex: 1;
     display: flex;
     .menu-class{
       flex: 1;
       padding: 0 40rpx 0 20rpx;
       display: flex;
       flex-direction: column;
       justify-content: space-between;
       .name{
         font-weight: 700;
         font-size: 14px;
         text-align: left;
       }
       .class{    
          color: #b6b6b6;
          font-size: 14px;
          text-align: left;
          margin-bottom: 10rpx;
       }
     }
     .menu-price{
       display: flex;
       flex-direction: column;
       justify-content: space-between;
       box-sizing: border-box;
       padding-bottom: 10rpx;
       font-size: 14px;
       text-align: right;
       view{
         display: flex;
         flex-direction: column;
         .price-d{
            font-size: 16px;
            color: #b6b6b6;
         }
         .number{
            margin: 10rpx 0 0;
            color: #b6b6b6;
         }
       }
       .price{
         font-size: 16px;
         font-weight: 700;
       }
     }
   }
 }
 
 // 订单其它信息
 .orderOtherInfo{
   color: #b6b6b6;
   .des{
     color: #000;
   }
   >view{
     display: flex;
     justify-content: space-between;
     padding: 10rpx 0;
   }
   .payment-price{
     color:rgb(37, 171, 190);
     font-weight: 700;
   }
 }
</style>
