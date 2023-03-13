<script>
	export default {
		methods: {
		
		},
		onLaunch:async  function(options) {
			// 1.设置用户信息
			if(uni.getStorageSync("token") && uni.getStorageSync("userInfo") ){
				this.$store.dispatch("userInfo/saveUserInfo",{
					userInfo:uni.getStorageSync("userInfo"),
					token:uni.getStorageSync("token")
				})
			}
		},
		onShow: function() {

		},
		onHide: function() {

		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';

	// 设置整个项目的背景色
	page {
		height: 100%;
		background-color: #F8F8F8;

		.container {
			height: 100%;
		}
	}

	image {
		width: 100%;
		height: 100%;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
