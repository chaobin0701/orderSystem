<template>
	<view class="orderDetail">
		<!-- 商品详情 -->
		<view class="box">
			<!-- 商店信息 -->
			<view class="shopInfo">
				<uni-icons type="shop-filled" size="24" color="rgb(37, 171, 190)"></uni-icons>
				<text class="name">超能鹿战队</text>
			</view>
			<view class="order-item" v-for="goods in orderInfo.goodsInfo" :key="goods._id">
				<view class="img">
					<img :src="goods.goodsImgs[0].url" alt="">
				</view>
				<view class="order-info">
					<view class="menu-class">
						<text class="name">{{goods.goodsName}}</text>
						<text class="class">{{goods.goodsCategory.gc_name}}</text>
					</view>
					<view class="menu-price">
						<text class="price">实付￥{{goods.goodsPrice * goods.goodsCount}}.00元</text>
						<view>
							<text class="price-d">￥{{goods.goodsCount}}.00</text>
							<text class="number">×{{goods.goodsPrice}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 其他信息 -->
			<view class="orderOtherInfo">
				<view class="payment">
					<text class="des">实付款：</text>
					<text class="payment-price">{{orderInfo.orderPrice}}.00元</text>
				</view>
				<view class="order-id">
					<text class="des">订单编号：</text>
					<text>{{orderInfo._id}}</text>
				</view>
				<view class="order-state">
					<text class="des">订单状态：</text>
					<text>{{orderMap[orderInfo.orderState].des}}</text>
				</view>
				<view class="trading-time">
					<text class="des">交易时间：</text>
					<text>{{momentHandle(orderInfo.updatedAt)}}</text>
				</view>
				
				<template v-if="orderInfo.orderState == '4'">
					<view class="trading-time">
						<text class="des">订单评分：</text>
						<text>{{orderInfo.orderAppraise? orderInfo.orderAppraise.score + "星": "未评价"}}</text>
					</view>
					
					<view class="trading-time">
						<text class="des">订单评价：</text>
						<text>{{orderInfo.orderAppraise? orderInfo.orderAppraise.appraise: "未评价"}}</text>
					</view>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment';
	export default {
		data() {
			return {
				orderInfo: {},
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
		methods: {
			// 处理时间戳
			momentHandle(time) {
				return moment(time).format('YYYY-MM-DD h:mm:ss')
			},
		},
		async onLoad(option) {
			this.orderId = option.orderId
			let orderInfo = await uni.$http.get(`/order/detail?_id=${option.orderId}`)
			this.orderInfo = orderInfo.data.data
		}
	}
</script>

<style lang="scss">
	.orderDetail {
		background-color: #f3f3f3;
		box-sizing: border-box;
		padding: 20rpx 14rpx;
		overflow-y: auto;

		.box {

			// 商店信息
			.shopInfo {
				display: flex;
				align-items: center;

				.name {
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
	.order-item {
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		border-radius: 20rpx;
		margin: 20rpx 0;
		height: 220rpx;
		padding: 30rpx;
		background-color: #f8f8f8;

		.img {
			width: 160rpx;
			height: 160rpx;

			img {
				height: 100%;
				width: 100%;
			}
		}

		.order-info {
			flex: 1;
			display: flex;

			.menu-class {
				flex: 1;
				padding: 0 40rpx 0 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.name {
					font-weight: 700;
					font-size: 14px;
					text-align: left;
				}

				.class {
					color: #b6b6b6;
					font-size: 14px;
					text-align: left;
					margin-bottom: 10rpx;
				}
			}

			.menu-price {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				box-sizing: border-box;
				padding-bottom: 10rpx;
				font-size: 14px;
				text-align: right;

				view {
					display: flex;
					flex-direction: column;

					.price-d {
						font-size: 16px;
						color: #b6b6b6;
					}

					.number {
						margin: 10rpx 0 0;
						color: #b6b6b6;
					}
				}

				.price {
					font-size: 16px;
					font-weight: 700;
				}
			}
		}
	}

	// 订单其它信息
	.orderOtherInfo {
		color: #b6b6b6;

		.des {
			color: #000;
		}

		>view {
			display: flex;
			justify-content: space-between;
			padding: 10rpx 0;
		}

		.payment-price {
			color: rgb(37, 171, 190);
			font-weight: 700;
		}
	}
</style>
