<template>
	<view class="login-box">
		<!-- 提示信息弹窗 -->
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000">
			</uni-popup-message>
		</uni-popup>
		<!-- 登陆组件 -->
		<uni-transition mode-class="slide-right" :show="state == 'login'" :duration="700">
			<loginDl @loginHandel="loginHandel" @goRegister="goRegister"></loginDl>
		</uni-transition>
		<!-- 注册组件 -->
		<uni-transition mode-class="slide-right" :show="state == 'register'" :duration="700">
			<loginRegister @registerHandel="registerHandel" @goLogin="goLogin"></loginRegister>
		</uni-transition>
	</view>
</template>

<script>
	import loginDl from '@/components/login-dl.vue'
	import loginRegister from '@/components/login-register.vue'
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex'
	export default {
		components: {
			loginDl,
			loginRegister
		},
		data() {
			return {
				state: 'login',
				msgType: '',
				messageText: '',
			};
		},
		methods: {
			...mapActions({
				saveUserInfo: 'userInfo/saveUserInfo'
			}),
			// 登录按钮
			async loginHandel(obj) {
				let result = await uni.$http.post("/customer/login",{
					customer_account: obj.userNumber,
					customer_pwd: obj.password
				} )
				if (result.data.msg === "登录失败") {
					this.open('error', '登录失败,请检查用户密码是否正确')
				} else {
					this.open('success', '登陆成功,跳转至用户中心')
					this.saveUserInfo({
						userInfo: result.data.info,
						token: result.data.token
					})
					setTimeout(() => {
						uni.switchTab({
							url: 'user'
						})
					}, 500)
				}

			},
			// 注册按钮回调
			async registerHandel(obj) {
				try {
					let result = await uni.$http.post("/customer", {
						"customer_name": obj.customer_name,
						"customer_birthday": "2000-12-29",
						"customer_sex": '1',
						"customer_pwd": obj.customer_pwd,
						"customer_account": obj.customer_account
					})
					this.open('success', '注册成功,返回登陆中')
					setTimeout(() => {
						this.state = 'login'
					}, 1000)
				} catch (e) {
					this.open('error', '未知错误，创建账号失败，请重试！')
				}
			},
			// 返回登陆的回调
			goLogin() {
				this.state = 'login'
			},
			// 返回注册的回调
			goRegister() {
				this.state = 'register'
			},
			open(type, text) {
				this.msgType = type
				this.messageText = text
				this.$refs.message.open()
			}
		}
	}
</script>

<style lang="scss">
	.login-box {
		width: 100%;
		height: 100%;
		position: relative;
		background: linear-gradient(30deg, #52bbc8 0%, #25ABBE 100%);

		.login,
		.register {
			position: absolute;

			.box {
				box-shadow: 0px 0px 60rpx 0rpx rgba(100, 100, 100, .4);
			}
		}
	}
</style>
