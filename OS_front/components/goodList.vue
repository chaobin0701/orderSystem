<template>
  <view class="goodWrapper">
    <!-- 分类列表 -->
    <scroll-view class="classify-box" :scroll-y="true" :scroll-with-animation="true" :scroll-into-view="clickToId"
      :style="{'height':windowHeight}">
      <view class="classify">
        <view class="classify-item" :class="index===currentNum?'active':''" :id="'to'+index"
          v-for="(category,index) in Object.keys(goodsMsg)" :key="index" @click="setId(index)">
          <text>{{category}}</text>
        </view>
      </view>
    </scroll-view>
    <!-- 右侧 - 商品 -->
    <view class="goodsBox">
      <scroll-view :scroll-into-view="clickId" @scroll="scroll" :scroll-with-animation="true" :scroll-y="true"
        :style="{'height':windowHeight}">
        <view class="goodsList" v-for="(category,index) in Object.keys(goodsMsg)" :key="index">
          <view class="title" :id="'po'+index">{{category}} </view>
          <!-- 右侧 - 商品 -->
          <view class="box" v-for="(good,index) in goodsMsg[category]" :key="index">
            <view class="good-image">
              <image :src="good.goodsImgs[0].url"></image>
            </view>
            <view class="goods-describe">
              <text class="goodName">{{good.goodsName}}</text>
              <text class="goodPrice">￥{{good.goodsPrice}}元/份</text>
              <!-- 添加按钮 -->
              <button class="mini-btn" v-if="good.goodsCount == 0" @click="changeGoodNumber(good._id,'add')">+</button>
              <!-- 布进器按钮 -->
              <view class="bjq-btn-box" v-else>
                <button class="mini-btn" @click="changeGoodNumber(good._id,'reduce')">-</button>
                <text class="good-number">{{good.goodsCount}}</text>
                <button class="mini-btn" @click="changeGoodNumber(good._id,'add')">+</button>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name:"goodList",
    data() {
      return {
        // 实现左右菜单联动
        windowHeight: '0px',
        clickId: '',
        clickToId: '',
        currentNum: 0,
        topList: [],
        isLeftClick: false
      };
    },
    computed:{
      ...mapGetters({goodsMsg:'goodsMsg'})
    },
    methods:{
      // 增加(add) or 减少(reduce)点餐数量
      changeGoodNumber(id, change) {
        this.$store.dispatch('changeGoodNumber', {id,change})
      },
      // 获取菜单数据
      async getGoodsMsg(){
		// 获取商品数据
		let {data:goods} = await  uni.$http.get('/goods')
		// 获取分类数据
		let {data:category} = await uni.$http.get("/goodscategory")
		this.$store.dispatch('getGoodsMsg',{
			goodsInfo:goods.data,
			categoryInfo:category.data
		})
		
      },
      // 点击左侧菜单,调动右侧菜单
      setId(index) {
        this.clickId = "po" + index;
        this.isLeftClick = true;
        this.currentNum = index;
      },
      // 监听右侧菜单滚动时间
      scroll(e) {
        if (this.isLeftClick) {
          this.isLeftClick = false;
          return;
        }
        let scrollTop = e.target.scrollTop;
        // 判断目前的位置
        for (let i = 0; i < this.topList.length; i++) {
          let h1 = this.topList[i] - parseInt(this.windowHeight);
          let h2 = this.topList[i + 1];
          if (scrollTop >= h1 && scrollTop < h2) {
            this.currentNum = i;
            this.clickToId = 'to' + i
          }
        }
      },
      // 初始化 获取dom元素
      getNodesInfo() {
        const query = uni.createSelectorQuery().in(this);
        query.selectAll('.title').boundingClientRect().exec((res) => {
          let nodes = res[0];
          let rel = [];
          nodes.map((item,index) => {
            rel.push(item.top);
            if(nodes.length == index+1){
              rel.push(item.top)
            }
          })
          this.topList = rel;
        });
      }
    },
    created() {
      // 发送请求
      this.getGoodsMsg()
      .then(()=>{
        // 初始化右侧菜单列表
        this.$nextTick(()=>{
          this.getNodesInfo();
        })
      })
    },
    onReady() {
      let _that = this;
      uni.getSystemInfo({
        success: function(res) {
          _that.windowHeight = res.windowHeight + 'px';
        }
      });
    }
  }
</script>

<style lang="scss">
  // 商品列表
  .goodWrapper {
    display: flex;
    height: 100%;
    // 分类列表
    .classify-box {
      width: 200rpx;
      height: 100%;
      box-sizing: border-box;
      padding-top: 80rpx;
      padding-bottom: 100rpx;
      .classify {
        width: 100%;
        height: 100%;

        .classify-item {
          width: 100%;
          height: 100rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          text {
            width: 100%;
            text-align: center;
            font-size: 26rpx;
          }
        }

        // 选择的样式
        .classify-item.active {
          box-sizing: border-box;
          padding-right: 14px;
          text {
            background-color: #F7F8FA;
            padding: 20rpx 0;
            border-radius: 0 20rpx 20rpx 0;
            border-left: 10rpx solid #25ABBE;
          }
        }
      }
    }

    // 商品列表
    .goodsBox {
      flex: 1;
      scroll-view{
        box-sizing: border-box;
        padding-top: 80rpx;
        padding-bottom: 100rpx;
      }
      .goodsList {
        // 商品大类名
        border-radius: 20rpx 20rpx 0 0;
        background-color: #F7F8FA;
        box-sizing: border-box;
        padding: 20rpx 10rpx;
        margin: 20rpx 0 0 0;
        .title {
          height: 40rpx;
          width: 100%;
          font-size: 30rpx;
          font-weight: bold;
          line-height: 40rpx;
          padding-left: 20rpx;
          color: #25ABBE;
        }

        // 商品内容
        .box {
          flex: 1;
          display: flex;
          height: 200rpx;
          margin: 20rpx 0;
          box-shadow: 0 0 10rpx rgba(200, 200, 200, .3);
          border-radius: 8rpx 0 0 8rpx;
          overflow: hidden;

          // 商品图片
          .good-image {
            height: 200rpx;
            width: 200rpx;

            image {
              height: 200rpx;
              width: 200rpx;
            }
          }

          // 商品详情
          .goods-describe {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            flex: 1;
            padding: 10rpx;
            padding-right: 30rpx;
            font-size: 28rpx;
            align-items: flex-end;

            .goodName {
              text-align: right;
            }

            .goodPrice {
              color: #ee7647;
            }

            .bjq-btn-box {
              display: flex;
              height: 50rpx;

              .good-number {
                line-height: 50rpx;
              }

              button,
              text {
                padding: 0 10rpx;
              }
            }

            .mini-btn {
              height: 50rpx;
              width: 50rpx;
              line-height: 50rpx;
              margin: 0;
              padding: 0;
              background-color: #25ABBE;
              border-radius: 50%;
              color: #fff;
            }
          }
        }
      }
    }

  }
</style>