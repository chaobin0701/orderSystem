<template>
  <view class="search" @click="clickSearch">
    <view class="search-inner">
      <uni-icons type="search" size="25"  color="#ACADA9"></uni-icons>
      <input @input="changeKeyWord" 
      v-model="keyWord"
      class="search-text" type="text" placeholder="请输入你想搜索的商品">
    </view>
  </view>
</template>

<script>
  export default {
    name:"search",
    data() {
      return {
        keyWord:''
      };
    },
    methods:{
      // 点击组件事件
      clickSearch(){
        this.$emit('clickSearch')
      },
      // 输入事件
      changeKeyWord(){
        this.$emit('changeKeyWord',this.keyWord)
      }
    }
  }
</script>

<style lang="scss">
// 搜索区域
  .search {
    width: 100%;
    height: 70rpx;
    display: flex;
    position: fixed;
    top: 0;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    z-index: 10;
    .search-inner {
      display: flex;
      align-items: center;
      width: 90%;
      height: 80%;
      padding: 0 3%;
      box-sizing: border-box;
      border-radius: 50rpx;
      background-color: #F4F5F0;

      .search-text {
        width: 100%;
        font-size: 30rpx;
        color: #ACADA9;
      }
    }
  }
</style>