<template>
	<view class="container">
		<!-- 提示信息弹窗 -->
		<uni-popup ref="message" type="message">
			<uni-popup-message type="error" message="请选择就坐餐桌" :duration="2000"></uni-popup-message>
		</uni-popup>
		<!-- 支付确认框 -->
		<uni-popup ref="payReceiving" type="dialog">
			<uni-popup-dialog cancelText="取消支付" confirmText="确认支付" title="确认支付吗?" @confirm="confirmPay"
				@close="refusePay"></uni-popup-dialog>
		</uni-popup>
		<!-- 选择就餐方式 -->
		<view class="chooseEatMode">
			<!-- 堂食就餐 or 外带就餐 -->
			<view class="mode">
				<view class="mode_1" :class="EatMode == '堂食'? 'active':'' " @click="EatMode = '堂食'">堂食</view>
				<view class="mode_2" :class="EatMode == '外带'? 'active':'' " @click="EatMode = '外带'">外带</view>
			</view>
			<!-- 备注 -->
			<view class="remarks">
				<text>备注：</text>
				<input type="text" placeholder="请输入备注">
			</view>
			<!-- 餐桌号 -->
			<view class="foodTable-number" v-if="EatMode == '堂食'">
				<text class="number">餐桌号：{{selectedFoodTable}}</text>
				<picker @change="changeFoodTable" :range="foodTableInfo" range-key="foodtable_describe">
					请选择>
				</picker>
				</text>
			</view>

		</view>
		<!-- 订单展示 -->
		<view class="order" v-if="CartGoods.lengt != 0">
			<text class="shopName">超能鹿战队</text>
			<view class="orderList">
				<view class="orderItem" v-for="good in CartGoods" :key="good._id">
					<!-- 图片 -->
					<image :src="good.goodsImgs[0].url"></image>
					<!-- 描述信息 -->
					<view class="orderItemDes">
						<!-- 菜名 和 数量 -->
						<view class="des_1">
							<text class="goodName">{{good.goodsName}}</text>
							<text class="quantity">数量：{{good.goodsCount}}</text>
						</view>
						<!-- 价格 -->
						<text class="price">
							<text class="">￥</text>
							{{good.goodsPrice}}
						</text>
					</view>
				</view>
			</view>
		</view>
		<view class="no-data" v-else>
			{{CartGoods.length}}
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
	import {
		mapGetters,
		mapState
	} from 'vuex'
	import settlement from '@/components/settlement.vue'
	export default {
		data() {
			return {
				EatMode: '堂食', // 就餐方式
				orderId: "", //订单id
			};
		},
		components: {
			settlement
		},
		computed: {
			...mapGetters({
				totalPrice: 'getTotalPrice', // 订单的价格
				selectedGood: 'getSelectedGood', // 已经添加到订单的餐
				foodTableInfo: 'getFoodTableInfo', // 获取餐桌编号
				CartGoods: 'getSelectedGood', // 获已加入购物侧的数据
				shoppingCartNumber: 'shoppingCartNumber' //购物车内点餐的数量
			}),
			...mapState({
				selectedFoodTable: 'selectedFoodTable', // 已选择的餐桌
				selectedFoodTable_id: 'selectedFoodTable_id',
			}),
			person() {
				return {
					age: 18,
					name: '张三'
				}
			}
		},
		methods: {
			changeFoodTable(e) {
				let info = this.foodTableInfo[e.detail.value]
				// 将 i(编号) 传递给vuex
				this.$store.dispatch('changeSelectedFoodTable', info)
			},
			// 插入订单的方法
			async addOrder() {
				return await uni.$http.post("/order", {
					orderPrice: this.totalPrice,
					diningMethod: this.EatMode,
					diningFoodTable: this.selectedFoodTable_id,
					goodsInfo: this.CartGoods,
				})
			},
			// 修改订单状态的方法
			async alterOrderState(data) {
				return uni.$http.put('/order/modify', {
					_id: this.orderId,
					orderState: 2
				})
			},
			// 去支付按钮回调
			async topay() {
				if (this.EatMode === "外带" || this.selectedFoodTable_id) {
					let orderInfo = await this.addOrder()
					this.orderId = orderInfo.data.data._id
					await this.$refs.payReceiving.open() // 显示弹窗 是否支付
				} else {
					await this.$refs.message.open()
				}
			},
			// 确认支付 —— 回调
			confirmPay() {
				// 支付成功  1.修改订单状态 2.跳转至订单页面
				this.alterOrderState()
				uni.switchTab({
					url: '/pages/order/order'
				})
			},
			// 取消支付 —— 回调 
			refusePay() {
				// 取消支付 1.跳转至订单页面
				uni.switchTab({
					url: '/pages/order/order'
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		box-sizing: border-box;
		padding: 40rpx 0;
	}

	.order,
	.chooseEatMode,
	.no-data {
		border-radius: 20rpx;
		background-color: #fff;
		margin-top: 20rpx;
		box-sizing: border-box;
		padding: 20rpx 20rpx;
		margin: 20rpx 40rpx 0;
	}

	.chooseEatMode {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		// 堂食就餐 or 外带就餐

		.mode {
			margin-top: 10rpx;
			display: flex;
			width: 100%;
			height: 55rpx;
			text-align: center;
			line-height: 55rpx;
			border-radius: 30rpx;
			overflow: hidden;
			background-color: #E7E7E7;

			.mode_1,
			.mode_2 {
				// 堂食
				width: 50%;
			}

			.mode_1.active,
			.mode_2.active {
				// 外带
				color: #fff;
				background-color: #25ABBE;
				border-radius: 30rpx;
			}
		}

		// 餐桌号
		.foodTable-number {
			font-size: 28rpx;
			display: flex;
			justify-content: space-between;
			margin-top: 50rpx;

			.number {}

			.chooseFoodTable {}
		}

		// 备注
		.remarks {
			font-size: 28rpx;
			display: flex;
			margin-top: 40rpx;
			height: 50rpx;
			line-height: 50rpx;

			text {}

			input {
				flex: 1;
				background-color: #F8F8F8;
				height: 50rpx;
				border-radius: 16rpx;
				padding-left: 10rpx;
			}
		}
	}

	// 订单展示
	.order {
		display: flex;
		flex-direction: column;
		margin-bottom: 130rpx;

		.shopName {
			height: 50rpx;
			line-height: 50rpx;
			font-weight: bold;
		}

		.orderList {
			overflow: auto;

			.orderItem {
				margin-top: 20rpx;
				border-radius: 15rpx;
				overflow: hidden;
				height: 150rpx;
				width: 100%;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				background-color: rgba(240, 240, 240, .2);

				image {
					margin-right: 20rpx;
					height: 150rpx;
					width: 150rpx;
				}

				.orderItemDes {
					flex: 1;
					height: 70%;
					display: flex;
					justify-content: space-between;

					.des_1 {
						font-size: 28rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.goodName {}

						.quantity {}
					}

					.price {
						display: flex;
						align-items: flex-end;

						text {}
					}
				}
			}
		}
	}


	// 去支付
	.toPay {
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

		.price {
			height: 70rpx;
			color: #25ABBE;
			display: flex;
			align-items: center;

			.icon {
				margin-right: 40rpx;
			}

			>text {
				padding-top: 10rpx;
				color: #000;
				font-size: 24rpx;
			}
		}

		button {
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
