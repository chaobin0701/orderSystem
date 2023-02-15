<template>
  <!-- 结算 -->
  <view class="ikhalamu-ebaliwe">
    <view class="have-data data" v-if="totalPrice !== 0">
      <view class="shopping-cart">
        <view class="shop-number">
          <u-badge class="u-badge"></u-badge>
       <uni-badge size="small" :text="shoppingCartNumber" absolute="rightTop">
       	<uni-icons type="cart-filled" size="30" color="#25ABBE"></uni-icons>
       </uni-badge>
          <!-- <uni-icons type="cart-filled" size="30" color="#25ABBE"></uni-icons> -->
        </view>
        <view class="footing">
          合计：<text class="unit">¥ </text><text class="price">{{totalPrice}}元</text>
        </view>
      </view>
      <view class="btn" @click="trigger">
        {{text}}
      </view>
    </view>
    <view class="no-data data" v-else>
      <view class="shopping-cart">
        <view class="shop-number">
          <u-badge class="u-badge"></u-badge>
          <uni-icons type="cart-filled" size="30" color="#aaa"></uni-icons>
        </view>
        <view class="footing">
          未选购商品
        </view>
      </view>
      <view class="btn">
        {{text}}
      </view>
    </view>
  </view>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name:"settlement",
    props:['text'],
    data() {
      return {
      };
    },
    methods:{
      trigger(){
        this.$emit('trigger')
      }
    },
    computed:{
      ...mapGetters({
        totalPrice:'getTotalPrice', // 购物车内点餐的总价值
        shoppingCartNumber:'shoppingCartNumber' //购物车内点餐的数量
      })
    }
  }
</script>

<style lang="scss">
 //结算组件
  .ikhalamu-ebaliwe {
    position: fixed;
    bottom: var(--window-bottom);
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100rpx;
    background-color: #ECF9FF;


    .data {
      width: 100%;
      height: 100%;
      padding: 0 24rpx;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .shopping-cart {
        display: flex;
        align-items: center;
      }

      .shop-number {
        image {
          width: 70rpx;
          height: 70rpx;
        }
      }

      .footing {
        font-size: 24upx;
        color: #777777;
        margin-left: 30rpx;
      }

      .btn {
        width: 184rpx;
        height: 64rpx;
        border-radius: 32rpx;
        text-align: center;
        line-height: 64rpx;
        font-size: 30upx;
        background-color: #AAAAAA;
        color: white;
      }

      &.have-data {
        .footing {
          font-size: 24upx;
          color: #333333;
          display: flex;
          white-space: nowrap;
          align-items: flex-end;
          line-height: 10rpx;
          .unit {
            color: #25ABBE;
          }
          .price {
            font-size: 36upx;
            color: #25ABBE;
          }
        }
        .btn {
          background-color: #25ABBE;
        }
      }
    }
  }

</style>