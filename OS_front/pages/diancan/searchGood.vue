<template>
	<view class="container">
		<!-- 搜索组件 -->
		<search :keyWord="keyWord" @changeKeyWord="changeKeyWord"></search>
		<!-- 搜索_商品列表 -->
		<view class="goodsBox">
			<view class="box" v-for="(good,index) in goodList" :key="index">
				<view class="good-image">
					<image :src="good.goodsImgs[0].url"></image>
				</view>
				<view class="goods-describe">
					<text class="goodName">{{good.goodsName}}</text>
					<text class="goodPrice">￥{{good.goodsPrice}}元/份</text>
					<!-- 添加按钮 -->
					<button class="mini-btn" v-if="good.goodsCount == 0"
						@click="changeGoodNumber(good._id,'add')">+</button>
					<!-- 布进器按钮 -->
					<view class="bjq-btn-box" v-else>
						<button class="mini-btn" @click="changeGoodNumber(good._id,'reduce')">-</button>
						<text class="good-number">{{good.goodsCount}}</text>
						<button class="mini-btn" @click="changeGoodNumber(good._id,'add')">+</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 结算 -->
		<settlement @trigger="toConfirmOrder" text="去结算"></settlement>
	</view>
</template>

<script>
	import search from '@/components/search.vue'
	import settlement from '@/components/settlement.vue'
	export default {
		data() {
			return {
				keyWord: '',
				// 搜索定时器
				timer: '',
				goodList: []
			}
		},
		components: {
			search,
			settlement
		},
		methods: {
			// 接收search传递过来的 keyword
			changeKeyWord(keyWord) {
				// 如果搜索关键词为空,立即清除内容
				if (!keyWord) {
					this.goodList = []
					this.$store.state.keyWord = ''
					return
				}
				// 节流,返回搜索关键词对应的商品列表
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					// 改变关键词
					this.$store.state.keyWord = keyWord
					// 返回搜索信息
					this.goodList = this.$store.getters.getGoodForKeyWord
				}, 300)
			},
			// 增加(add) or 减少(reduce)点餐数量
			changeGoodNumber(id, change) {
				this.$store.dispatch('changeGoodNumber', {
					id,
					change
				})
			},
			// 去结算
			toConfirmOrder(){
				if(uni.getStorageSync('token')){
				  uni.navigateTo({url:'confirmOrder'}) // 跳转至结算页面
				}else {
				  this.$refs.message.open()
				  uni.switchTab({url:'/pages/user/user'})// 跳转至登录页面
				}
			}
		}
	}
</script>

<style lang="scss">
	// 商品列表
	.goodsBox {
		box-sizing: border-box;
		padding-top: 80rpx;
		height: 100%;
		padding-bottom: 100rpx;
		overflow: auto;

		// 商品内容
		.box {
			flex: 1;
			display: flex;
			height: 200rpx;
			margin: 20rpx 40rpx;
			box-shadow: 0 0 10rpx rgba(200, 200, 200, .3);
			border-radius: 8rpx 0 0 8rpx;
			overflow: hidden;
			box-sizing: border-box;
			background-color: #F7F8FA;

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
</style>
