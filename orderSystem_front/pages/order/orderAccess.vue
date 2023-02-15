<template>
  <!-- 订单评价页面 -->
  <view class="orderAccess">
    <!-- 提示信息弹窗 -->
    <uni-popup ref="message" type="message">
      <uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
    </uni-popup>
    <!-- 打分 -->
    <view class="rate">
      <text class="text">订单评价</text>
      <uni-rate v-model="rateValue" />
    </view>
    <!-- 输入框 -->
    <view class="input-box">
      <view class="text">
        <text>评论</text>
      </view>
      <textarea placeholder="请输入评价" v-model="orderAccessText"></textarea>
      <view class="text-number">
        {{orderAccessText.length}}/100
      </view>
    </view>
    <!-- 确认按钮 -->
    <button @click="publishAccess">发表评论</button>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        orderId:'', //订单id
        rateValue:5, // 订单评分
        orderAccessText:'', //订单评价文字
        msgType:'',
        messageText:''
      };
    },
    methods:{
      // 发表评论
      publishAccess(){
        if(this.orderAccessText.length < 5){ //订单评价文字少于5 
          this.open('error','订单评价要大于5')
        }else{
          // 发送请求 更改订单评价
         this.alterOrderState()
         .then(()=>{
           this.open('success','订单评价成功,正在跳转')
           this.getOrderDate()
           setTimeout(()=>{
              uni.switchTab({url:'/pages/order/order'}) // 跳转至订单页面
           },1500)
         },err=>{
           console.log('修改订单状态失败',err);
         })
        }
      },
      // 修改订单状态
      alterOrderState(){
       return uni.$http.post(`/alert_orderState?O_id=${this.orderId}&O_state=已完成`)
      },
      // 弹窗
      open(type,text){
        this.msgType = type
        this.messageText = text
        this.$refs.message.open()
      },
      // 获取订单信息
      getOrderDate(){
        let userID = uni.getStorageSync('userId')
        return uni.$http.get(`/getDataTableJudge?tableName=myorder_info&key=T_id&value=${userID}&order=DESC`)
        .then(res=>{
          this.$store.dispatch('getOrderData',res.data.tableArr)
        },err=>{
          console.log('获取订单信息失败',err);
        })
      }
    },
    onLoad(option) {
      // 获取路径信息
      this.orderId = option.orderId
    }
  }
</script>

<style lang="scss">
  .orderAccess{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // 打分
    .rate{
      display: flex;
      align-items: center;
      margin: 30rpx 0;
      .text{
        padding: 0 20rpx ;
      }
    }
    // 输入框
    .input-box{
      display: flex;
      width: 95%;
      border: 1px solid #eee;
      height: 400rpx;
      box-sizing: border-box;
      justify-content: space-between;
      padding: 30rpx;
      font-size: 30rpx;
      .text{
        text{
          height: 100%;
        }
      }
      textarea{
        box-sizing: border-box;
        padding: 0 30rpx ;
        flex: 1;
      }
      .text-number{
        font-size: 24rpx;
        line-height: 400rpx;
      }
    }
    // 确认按钮
    button{
      width: 95%;
      margin: 40rpx 0;
      color: #fff;
      background-color: #07c160;
      border: 1px solid #07c160;
    }
  }
</style>
