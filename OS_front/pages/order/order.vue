<template>
	<view class="order">
		<!-- 支付确认框 -->
		<uni-popup ref="payReceiving" type="dialog">
			<uni-popup-dialog cancelText="取消支付" confirmText="确认支付" title="确认支付吗?" @confirm="updateOrderState('2')">
			</uni-popup-dialog>
		</uni-popup>
		<!-- 收货确认框 -->
		<uni-popup ref="receivingOrder" type="dialog">
			<uni-popup-dialog cancelText="取消收货" confirmText="确认收货" title="确认收货吗?"  @confirm="updateOrderState('3')"></uni-popup-dialog>
		</uni-popup>

		<!-- 未登录状态 -->
		<view class="not-login" v-if="!isLogin">
			<text>您还没登录</text>
			<button @click="toLogin">点我跳转登陆</button>
		</view>
		<!-- 顶部筛选栏 -->
		<filterOrder @changeOrderFliter="changeOrderFliter" v-if="isLogin"></filterOrder>
		<!-- 订单 -->
		<view class="box" v-if="isLogin">
			<view class="not-good" v-if="filterOrderData.length == 0">
				暂无订单，去下单吧！
				<uni-icons type="cart-filled" size="60" color="b4b4b4"></uni-icons>
			</view>
			<view class="order" v-for="order in filterOrderData" :key="order._id" v-else>
				<!-- 顶部区域 -->
				<view class="top">
					<view class="left">
						<uni-icons type="shop-filled" size="24" color="rgb(37, 171, 190)"></uni-icons>
						<text class="name">超能鹿战队</text>
						<uni-icons type="forward" size="18" color="rgb(37, 171, 190)"></uni-icons>
					</view>
					<view class="right">
						<text class="order-state">{{orderMap[order.orderState].des}}</text>
					</view>
				</view>
				<!-- 图片区域 -->
				<view class="img" @click="toOrderDetail(order._id)">
					<view class="img-box">
						<view class="img-content" v-for="goods in order.goodsInfo.slice(0,3)" :key="goods._id">
							<img :src="goods.goodsImgs[0].url">
						</view>
					</view>
					<view class="order-number">
						<text>共{{order.goodsInfo.length}}件 </text>
						<uni-icons type="forward" size="14" color="#8b8b8b"></uni-icons>
					</view>
				</view>
				<!-- 价格/下单时间/操作 -->
				<view class="price-box">
					<text class="orderTiem">{{momentHandle(order.createdAt)}}</text>
					<view class="price">
						￥{{order.orderPrice}}.00元
						<button
							@click="changeOrderState(order._id,order.orderState)">{{orderMap[order.orderState].btnText}}</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment';
	import filterOrder from '@/components/filterOrder.vue'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				filterOrderKey: '0', // 筛选订单的条件
				receiptID: '', //点击收货时候的id,用于回调函数使用
				isLogin: false, //用户登录状态 true or false
				orderData: [],
				orderMap: { //映射订单的状态信息
					"1": {
						des: "待付款",
						btnText: "支付"
					},
					"2": {
						des: "待收货",
						btnText: "收货"
					},
					"3": {
						des: "待评价",
						btnText: "评价"
					},
					"4": {
						des: "已完成",
						btnText: "已完成"
					}
				}
			};
		},
		components: {
			filterOrder
		},
		computed: {
			...mapState({
				userInfo: 'userInfo'
			}),
			// 筛选符合条件的订单
			filterOrderData() {
				if (this.filterOrderKey == '0') {
					return this.orderData
				}
				return this.orderData.filter(order => {
					return order.orderState == this.filterOrderKey
				})


			},
		},
		methods: {
			// 处理时间戳
			momentHandle(time) {
				return moment(time).format('YYYY-MM-DD')
			},
			// 根据条件筛选订单
			changeOrderFliter(key) {
				this.filterOrderKey = key
			},
			// 改变订单的状态
			async changeOrderState(_id, orderState) {
				this.receiptID = _id
				switch (orderState) {
					case "1":
						await this.$refs.payReceiving.open() //支付弹窗
						break;
					case "2":
						await this.$refs.receivingOrder.open()//收货弹窗
						break;
					case "3":
						this.toOrderAppraise(_id) // 进入评价页面
						break;
					default:
						console.log("未知状态")
						break;
				}
			},
			// 跳转订单详情
			toOrderDetail(orderId) {
				uni.navigateTo({
					url: `orderDetail?orderId=${orderId}`
				})
			},
			// 跳转至订单评价
			toOrderAppraise(id) {
				uni.navigateTo({
					url: `orderAccess?orderId=${id}`
				})
			},
			// 修改订单状态的方法
			async updateOrderState(state) {
				await uni.$http.put('/order/modify', {
					_id:this.receiptID,
					orderState: state
				})
				await this.getOrderDate()
			},
			// 获取订单信息
			async getOrderDate() {
				let orders = await uni.$http.get("/order/user")
				this.orderData = orders.data.data
				console.log(this.orderData)
			},
			toLogin() {
				uni.reLaunch({
					url: '/pages/user/login'
				})
			}
		},
		onShow() {
			// 未登陆不进行查询
			if (this.$store.state.userInfo.token) {
				this.isLogin = true
				this.getOrderDate() //获取订单信息	
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			if (this.$store.state.userInfo.token) {
				this.getOrderDate() //获取订单信息	
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F3F3F3;
	}

	// 没有商品状态
	.not-good {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 800rpx;
		color: #b4b4b4;

		uni-icons {
			margin: 50rpx 0;
		}
	}

	// 未登录状态
	.not-login {
		height: 800rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		button {
			margin: 30rpx 0;
		}
	}

	// 主体内容
	.box {
		padding: 70rpx 15rpx 15rpx;
		overflow-y: auto;

		.order {
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			border-radius: 20rpx;
			margin: 20rpx 0;
			height: 290rpx;
			padding: 20rpx;
			background-color: #fff;

			// 顶部区域
			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 0 0 20rpx;

				.left {
					display: flex;
					align-items: center;

					.name {
						padding-left: 14rpx;
						color: rgb(37, 171, 190);
						font-weight: 700;
						font-size: 16px;
					}
				}

				.right {
					.order-state {
						color: orange;
						font-size: 28rpx;
					}
				}
			}

			//图片区域
			.img {
				display: flex;
				align-items: center;
				height: 140rpx;
				justify-content: space-between;

				.img-content {
					margin: 0 6rpx;
					width: 140rpx;
					height: 140rpx;
					border-radius: 10rpx;
					overflow: hidden;
					display: inline-block;

					img {
						display: block;
						width: 100%;
						height: 100%;
					}
				}

				.order-number {
					display: flex;
					align-items: center;

					text {
						font-size: 14px;
						color: #8b8b8b;
					}
				}
			}

			// 底部区域
			.price-box {
				display: flex;
				justify-content: space-between;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 16px;

				.orderTime {
					font-weight: 300;
					font-size: 14px;
				}

				.price {
					font-weight: 600;
					display: flex;
					align-items: center;

					button {
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
