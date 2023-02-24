<template>
  <view class="container">
    <!-- 提示信息弹窗 -->
    <uni-popup ref="message" type="message">
      <uni-popup-message type="error" message="请选择就坐餐桌" :duration="2000"></uni-popup-message>
    </uni-popup>
    <!-- 支付确认框 -->
    <uni-popup ref="payReceiving" type="dialog">
       <uni-popup-dialog  cancelText="取消支付" confirmText="确认支付" title="确认支付吗?"  @confirm="confirmPay"
         @close="refusePay"></uni-popup-dialog>
     </uni-popup>
    <!-- 选择就餐方式 -->
    <view class="chooseEatMode">
      <!-- 店内就餐 or 外带就餐 -->
      <view class="mode">
        <view class="mode_1" 
        :class="EatMode == '店内'? 'active':'' "
        @click="EatMode = '店内'"
        >店内</view>
        <view class="mode_2" 
        :class="EatMode == '外带'? 'active':'' "
         @click="EatMode = '外带'"
        >外带</view>
      </view>
      <!-- 餐桌号 -->
      <view class="foodTable-number">
        <text class="number">餐桌号：{{selectedFoodTable}}</text>
          <picker @change="changeFoodTable" :range="foodTableNumber">
            请选择>
          </picker>
        </text>
      </view>
      <!-- 备注 -->
      <view class="remarks">
        <text>备注：</text>
        <input type="text" placeholder="请输入备注">
      </view>
    </view>
    <!-- 订单展示 -->
    <view class="order" v-if="shoppingCartGoods.lengt != 0">
      <text class="shopName">超能鹿战队</text>
      <view class="orderList">
        <view class="orderItem" v-for="good in shoppingCartGoods" :key="good.M_id">
          <!-- 图片 -->
          <image :src="good.M_imgSrc"></image>
          <!-- 描述信息 -->
          <view class="orderItemDes">
            <!-- 菜名 和 数量 -->
            <view class="des_1">
              <text class="goodName">{{good.M_name}}</text>
              <text class="quantity">数量：{{good.M_number}}</text>
            </view>
            <!-- 价格 -->
            <text class="price">
              <text class="">￥</text>
              {{good.M_price}}
            </text>
          </view>
        </view>
      </view>
    </view>
    <view class="no-data" v-else>
      {{shoppingCartGoods.length}}
      请去点餐吧
    </view>
    <!-- 底部支付 -->
   <view class="toPay">
      <view class="price">
        <uni-badge size="small" :text="shoppingCartNumber" absolute="rightTop">
        	<uni-icons type="cart-filled" size="30" color="#25ABBE"></uni-icons>
        </uni-badge>
        <text>合计：</text>
        ￥{{totalPrice}}元
      </view>
      <button @click="topay">去支付</button>
    </view>
  </view>
</template>

<script>
  import {mapGetters,mapState} from 'vuex'
  import { v4 as uuidv4 } from 'uuid';
  import settlement from '@/components/settlement.vue'
  export default {
    data() {
      return {
        EatMode:'店内', // 就餐方式
        O_id:uuidv4().slice(0,21) , //随机生成的订单id
      };
    },
    components:{settlement},
    computed:{
      ...mapGetters({
        totalPrice:'getTotalPrice', // 订单的价格
        selectedGood:'getSelectedGood', // 已经添加到订单的餐
        foodTableNumber:'getFoodTableNumber', // 获取餐桌编号
        shoppingCartGoods:'getSelectedGood' ,// 获已加入购物侧的数据
        shoppingCartNumber:'shoppingCartNumber' //购物车内点餐的数量
        }),
      ...mapState({
        selectedFoodTable:'selectedFoodTable', // 已选择的餐桌
        selectedFoodTable_id:'selectedFoodTable_id'
      }),
      person(){
        return {age:18,name:'张三'}
      }
    },
    created(){
      this.getFoodTableMsg()
    },
    methods:{
      changeFoodTable(e){
        // console.log('用户选择了',this.foodTableNumber[e.detail.value]);
        let i = this.foodTableNumber[e.detail.value]
        // 将 i(编号) 传递给vuex
        this.$store.dispatch('changeSelectedFoodTable',i)
      },
      // 获取餐桌数据
      getFoodTableMsg(){
        return new Promise((resolve,reject)=>{
          // 判断是否有持久化数据
          if(uni.getStorageSync('foodTable')){ //用本地持久化数据
            this.$store.commit('GetFoodTableMsg', uni.getStorageSync('foodTable'))
            resolve() 
            return 
          }
          return uni.$http.get('/getDataTable?tableName=foodtable')
          .then(res=>{
            this.$store.dispatch('getFoodTableMsg',res.data.tableArr)
            resolve()
          },err=>{
            console.log('获取菜单数据失败',err);
            reject('获取菜单数据失败')
          })
        })
      },
      // 插入订单的方法
      insertOrder(){
        /*  1.插入订单 */ 
        return  uni.$http.post('/insertDatabase',{
         tableName:"饭店点餐系统.order",
         columns:"(O_id,T_id,Cz_id,W_id,S_price,S_priceafter,time,O_state)",
         values:`('${this.O_id}','${uni.getStorageSync('userId')}','${this.selectedFoodTable_id}','y2',${this.totalPrice},${this.totalPrice},'${Date.now()}','待付款')`
       })
       
      },
      // 插入点餐单的函数
      insertMenusOrder(msg){
        /* 2. 插入点餐单 */ 
        msg.forEach(item => {
          let {M_id,M_name,M_number} = item
          uni.$http.post('/insertDatabase',{
            tableName:"饭店点餐系统.menus_order",
            columns:"(O_id,M_id,M_name,M_number)",
            values:`('${this.O_id}','${M_id}','${M_name}',${M_number})`
          })
        })
      },
      // 修改订单状态的方法
      alterOrderState(){
        /* 3.修改状态 */ 
       return uni.$http.post(`/alert_orderState?O_id=${this.O_id}&O_state=待收货`)
      },
      // 去支付按钮回调
      topay(){
       // 判断： 1.餐桌号是否选择 
        if(!!this.selectedFoodTable_id){
          this.insertOrder()
          .then(()=>{
            console.log('1.订单插入成功');
            // console.log('已经加购的菜单',this.shoppingCartGoods);
            this.insertMenusOrder(this.shoppingCartGoods)
          },err=>{
            console.log('1.订单插入失败',err);
          })
          .then(()=>{
            // console.log('2.插入点餐单成功 - 点餐成功');
            this.$store.commit('ResetGoodCart') // 清空购物车
           this.$refs.payReceiving.open()// 显示弹窗 是否支付
          },err=>{
            console.log('2.插入点餐单失败',err);
          })
        }else{
          // console.log('餐桌未选择');
          this.$refs.message.open() // 未选择餐桌提示
        }
      },
      // 确认支付 —— 回调
      confirmPay() {
        // 支付成功  1.修改订单状态 2.跳转至订单页面
        this.alterOrderState()
        .then(()=>{
          uni.switchTab({url:'/pages/order/order'})
        },err=>{
          console.log('修改订单状态失败',err);
        })
      },
      // 取消支付 —— 回调 
      refusePay(){
        // 取消支付 1.跳转至订单页面
        uni.switchTab({url:'/pages/order/order'})
      },
    }
  }
</script>

<style lang="scss">
  .container{
    box-sizing: border-box;
    padding: 40rpx 0;
  }
  .order , .chooseEatMode ,.no-data{
    border-radius: 20rpx;
    background-color: #fff;
    margin-top: 20rpx;
    box-sizing: border-box;
    padding: 20rpx 20rpx;
    margin: 20rpx 40rpx 0;
  }
  
  .chooseEatMode{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    // 店内就餐 or 外带就餐
    
    .mode{
      margin-top: 10rpx;
      display: flex;
      width: 100%;
      height: 55rpx;
      text-align: center;
      line-height: 55rpx;
      border-radius: 30rpx;
      overflow: hidden;
      background-color: #E7E7E7;
      .mode_1,.mode_2{ // 店内
        width: 50%;
      }
      .mode_1.active,.mode_2.active{ // 外带
        color:#fff;
        background-color: #25ABBE;
        border-radius: 30rpx;
      }
    }
    // 餐桌号
    .foodTable-number{
      font-size: 28rpx;
      display: flex;
      justify-content: space-between;
      margin-top: 50rpx;
      .number{
        
      }
      .chooseFoodTable{
        
      }
    }
    // 备注
    .remarks{
      font-size: 28rpx;
      display: flex;
      margin-top: 40rpx;
      height: 50rpx;
      line-height: 50rpx;
      text{
        
      }
      input{
        flex: 1;
        background-color: #F8F8F8;
        height: 50rpx;
        border-radius: 16rpx;
        padding-left: 10rpx;
      }
    }
  }
  // 订单展示
  .order{
    display: flex;
    flex-direction: column;
    margin-bottom: 130rpx;
    .shopName{
      height: 50rpx;
      line-height: 50rpx;
      font-weight: bold;
    }
    .orderList{
      overflow: auto;
      .orderItem{
        margin-top: 20rpx;
        border-radius: 15rpx;
        overflow: hidden;
        height: 150rpx;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        background-color: rgba(240, 240,240, .2);
        image{
          margin-right: 20rpx;
          height: 150rpx;
          width: 150rpx;
        }
        .orderItemDes{
          flex: 1;
          height: 70%;
          display: flex;
          justify-content: space-between;
          
          .des_1{
            font-size: 28rpx;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .goodName{
              
            }
            .quantity{
              
            }
          }
          .price{
            display: flex;
            align-items: flex-end;
            text{
              
            }
          }
        }
      }
    }
  }
  
  
  // 去支付
  .toPay{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100rpx;
    background-color: #ECF9FF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20rpx;
    .price{
      height: 70rpx;
      color: #25ABBE;
      display: flex;
      align-items: center;
      .icon{
        margin-right: 40rpx;
      }
      >text{
        padding-top: 10rpx;
        color: #000;
        font-size: 24rpx;
      }
    }
    button{
      width: 184rpx;
      height: 64rpx;
      border-radius: 32rpx;
      text-align: center;
      line-height: 64rpx;
      font-size: 30upx;
      margin: 0;
      background-color: #25ABBE;
      color: white;
    }
  }
</style>
