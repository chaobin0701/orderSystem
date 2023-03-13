<script>
	export default {
		methods: {
			// 获取餐桌数据
			async getFoodTableMsg() {
				let {data:foodTable} = await uni.$http.get('/foodtable')
				this.$store.dispatch('getFoodTableMsg', foodTable.data)
				return  foodTable.data
			},
		},
		onLaunch:async  function(options) {
			// 1.设置用户信息
			if(uni.getStorageSync("token") && uni.getStorageSync("userInfo") ){
				this.$store.dispatch("userInfo/saveUserInfo",{
					userInfo:uni.getStorageSync("userInfo"),
					token:uni.getStorageSync("token")
				})
			}
			const foodTableInfo = await this.getFoodTableMsg()
			let _id = options.query.foodtable_id
				
		
			if(_id){
				let info = foodTableInfo.find(item => {
					return item._id === _id
				})
				this.$store.dispatch('changeSelectedFoodTable', info)
			}
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
