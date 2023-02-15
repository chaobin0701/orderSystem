<script>
	export default {
    methods:{
      // 获取餐桌数据
      getFoodTableMsg(){
        return new Promise((resolve,reject)=>{
          // 判断是否有持久化数据
          if(uni.getStorageSync('foodTable')){ //用本地持久化数据
            this.$store.commit('GetFoodTableMsg', uni.getStorageSync('foodTable'))
            resolve() 
            return 
          }
          return uni.$http.get('/getDataTable?tableName=foodtable')
          .then(res=>{
            this.$store.dispatch('getFoodTableMsg',res.data.tableArr)
            resolve()
          },err=>{
            console.log('获取菜单数据失败',err);
            reject('获取菜单数据失败')
          })
        })
      },
    },
		onLaunch: function(options) {
			if(!! options.query.Cz_id && !!options.query.Cz_num){
         // 保存餐桌id 和餐桌编号
         let {Cz_num,Cz_id} = options.query
         this.$store.commit('ChangeSelectedFoodTable_id',{
           Cz_num,Cz_id
         })
         // 获取餐桌数据
         this.getFoodTableMsg()
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
  image{
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
