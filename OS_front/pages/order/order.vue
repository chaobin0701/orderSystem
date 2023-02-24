<template>
  <view class="order">
    <!-- 收货确认框 -->
   <uni-popup ref="receivingOrder" type="dialog">
      <uni-popup-dialog  cancelText="取消收货" confirmText="确认收货" title="确认收货吗?"  @confirm="confirmReceiving"
        @close="refuseReceiving"></uni-popup-dialog>
    </uni-popup>
    
    <!-- 支付确认框 -->
  <uni-popup ref="payReceiving" type="dialog">
      <uni-popup-dialog  cancelText="取消支付" confirmText="确认支付" title="确认支付吗?"  @confirm="confirmPay"
        @close="refusePay"></uni-popup-dialog>
    </uni-popup>
    <!-- 未登录状态 -->
    <view class="not-login" v-if="!isLogin">
      <text>您还没登录</text>
      <button @click="toLogin">点我跳转登陆</button>
    </view>
    <!-- 顶部筛选栏 -->
    <filterOrder
    @changeOrderFliter="changeOrderFliter"
    v-if="isLogin"
    ></filterOrder>
    <!-- 订单 -->
     <view class="box"  v-if="isLogin">
       <view class="not-good" v-if="Object.keys(filterOrderData).length == 0">
         暂无订单，去下单吧！
         <uni-icons type="cart-filled" size="60" color="b4b4b4"></uni-icons>
       </view>
       <view class="order" v-for="orderId in Object.keys(filterOrderData)" :key="orderId" v-else>
         <!-- 顶部区域 -->
         <view class="top">
           <view class="left">
             <uni-icons type="shop-filled" size="24" color="rgb(37, 171, 190)"></uni-icons>
             <text class="name">超能鹿战队</text>
             <uni-icons type="forward" size="18" color="rgb(37, 171, 190)"></uni-icons>
           </view>
           <view class="right">
             <text class="order-state">{{orderData[orderId][0].O_state}}</text>
           </view>
         </view>
         <!-- 图片区域 -->
         <view class="img" @click="toOrderDetail(orderId)">
           <view class="img-box">
              <view class="img-content"  v-for="imgSrc in orderData[orderId].slice(0,3)" 
              :key="imgSrc.M_imgSrc">
                <img :src="imgSrc.M_imgSrc">
              </view>
           </view>
           <view class="order-number">
             <text>共{{orderData[orderId].length}}件 </text>
              <uni-icons type="forward" size="14" color="#8b8b8b"></uni-icons>
           </view>
         </view>
         <!-- 价格/下单时间/操作 -->
         <view class="price-box">
           <text class="orderTiem">{{momentHandle(orderData[orderId][0].time)}}</text>
           <view class="price">
             ￥{{orderData[orderId][0].S_price}}.00元
             <button v-if="orderData[orderId][0].O_state == '待付款'"
             @click="topay(orderData[orderId][0].O_id)"
             >支付</button>
             <button v-else-if="orderData[orderId][0].O_state == '待评价'"
             @click="toOrderAppraise(orderData[orderId][0].O_id)"
             >评价</button>
             <button v-else-if="orderData[orderId][0].O_state == '待收货'"
             @click="toOrderReceiving(orderData[orderId][0].O_id)"
             >收货</button>
           </view>
         </view>
       </view>
     </view>
  </view>
</template>

<script>
  import moment from 'moment';
  import filterOrder from '@/components/filterOrder.vue'
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
       filterOrderKey:'全部', // 筛选订单的条件
       receiptID:'', //点击收货时候的id,用于回调函数使用
       isLogin:false, //用户登录状态 true or false
      };
    },
    components:{filterOrder},
    computed:{
      ...mapState({
        userInfo:'userInfo',
        orderData:'orderData',
      }),
      // 筛选符合条件的订单
      filterOrderData(){
        // 如果筛选条件为 '全部' 就直接返回数据
        if(this.filterOrderKey == '全部') {return this.orderData}
        // 1. 因为数据是对象形式,所以先筛选出
        return Object.keys(this.orderData).reduce((prev,next)=>{
          // 如果状态相同
          if(this.orderData[next][0].O_state == this.filterOrderKey){
            prev[next] = this.orderData[next]
          }
          return prev
        },{})
      },
    },
    methods:{
      // 处理时间戳
      momentHandle(time){
        return moment(Number(time)).format('YYYY-MM-DD')
      },
      // 根据条件筛选订单
      changeOrderFliter(key){
        this.filterOrderKey = key
      },
      // 跳转订单详情
      toOrderDetail(orderId){
        let time = moment(Number(this.orderData[orderId][0].time)).format('YYYY-MM-DD hh:mm:ss')
        let state = this.orderData[orderId][0].O_state
        uni.navigateTo({
          url:`orderDetail?orderId=${orderId}&orderTime=${time}&orderState=${state}`
        })
      },
      // 跳转至订单评价
      toOrderAppraise(id){
        console.log('跳转至订单评价',id);
        uni.navigateTo({
          url:`orderAccess?orderId=${id}`
        })
      },
      // 修改订单状态的方法
      alterOrderState(id,state){
        return uni.$http.post(`/alert_orderState?O_id=${id}&O_state=${state}`)
        .then(()=>{
          return this.getOrderDate() // 重新获取订单信息
        },err=>{
          console.log('修改状态失败',err);
        })
      },
      // 点击收货按钮
      toOrderReceiving(id){
        console.log('跳转至收货',id);
        this.receiptID = id
        this.$refs.receivingOrder.open()
      },
      // 确认收货 —— 回调
      confirmReceiving() {
        console.log('点击确认',this.receiptID)
        this.alterOrderState(this.receiptID,'待评价')
      },
      // 点击支付按钮
      topay(id){
        this.receiptID = id
        this.$refs.payReceiving.open()
      },
      // 确认支付 —— 回调
      confirmPay() {
        console.log('点击确认',this.receiptID)
        this.alterOrderState(this.receiptID,'待收货')
      },
      // 获取订单信息
      getOrderDate(){
        let userID = uni.getStorageSync('userId')
        return uni.$http.get(`/getDataTableJudge?tableName=myorder_info&key=T_id&value=${userID}&order=DESC`)
        .then(res=>{
          this.$store.dispatch('getOrderData',res.data.tableArr)
          console.log(userID,res.data.tableArr);
        },err=>{
          console.log('获取订单信息失败',err);
        })
      },
      toLogin(){
        uni.reLaunch({
          url:'/pages/user/login'
        })
      }
    },
    onShow(){
      if(uni.getStorageSync('userState')){ // 判断用户是否已经登录
        this.isLogin = true
       this.getOrderDate() //获取订单信息
       this.$store.dispatch('userInfo/saveUserId',uni.getStorageSync('userId')) // 保存用户id
      } else {
        this.isLogin = false
        console.log('未登录');
      }
    },
    // 下拉刷新
    onPullDownRefresh (){
      this.getOrderDate() //获取订单信息
    }
  }
</script>

<style lang="scss">
  page{
    background-color: #F3F3F3;
  }
  // 没有商品状态
  .not-good{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 800rpx;
    color: #b4b4b4;
    uni-icons{
      margin: 50rpx 0;
    }
  }
  // 未登录状态
  .not-login{
    height: 800rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    button{
      margin: 30rpx 0;
    }
  }
  
  // 主体内容
  .box{
    padding: 70rpx 15rpx 15rpx;
    overflow-y: auto;
    .order{
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      border-radius: 20rpx;
      margin: 20rpx 0;
      height: 290rpx;
      padding: 20rpx;
      background-color: #fff;
      // 顶部区域
        .top{
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 0 20rpx;
          .left{
            display: flex;
            align-items: center;
            .name{
              padding-left: 14rpx;
              color: rgb(37, 171, 190);
              font-weight: 700;
              font-size: 16px;
            }
          }
          .right{
              .order-state{
                color: orange;
                font-size: 28rpx;
              }
          }
        }
        //图片区域
        .img{
          display: flex;
          align-items: center;
          height: 140rpx;
          justify-content: space-between;
          .img-content{
            margin: 0 6rpx;
            width: 140rpx;
            height: 140rpx;
            border-radius: 10rpx;
            overflow: hidden;
            display: inline-block;
            img{
               display: block;
               width: 100%;
               height: 100%;
            }
          }
          .order-number{
            display: flex;
            align-items: center;
            text{
              font-size: 14px;
              color: #8b8b8b;
            }
          }
        }
        // 底部区域
        .price-box{
          display: flex;
          justify-content: space-between;
          height: 60rpx;
          line-height: 60rpx;
          font-size: 16px;
          .orderTime{
            font-weight: 300;
            font-size: 14px;
          }
          .price{
            font-weight: 600;
            display: flex;
            align-items: center;
            button{
              margin-left: 20rpx;
              height: 50rpx;
              line-height: 50rpx;
              font-weight: 100;
              width: 120rpx;
              font-size: 15px;
              padding: 0 4px;
              color: #fff;
              background-color: #07c160;
            }
          }
        }
    }
    
  }
</style>
