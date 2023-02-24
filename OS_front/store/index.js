//引入Vue核心库
  import Vue from 'vue'
  import Vuex from 'vuex'
  import userInfo from './userInfo.js'
  Vue.use(Vuex)

   const actions = {
     // 获取菜单的数据
     getGoodsMsg({commit, state}, data){
        let msg = data.map(item => {
          item.M_number = 0
          return item
        })
        commit('GetGoodsMsg',msg)
        // 将菜单数据持久化存储到本地
        uni.setStorageSync('goodsMsg',msg)
     },
     // 增加(add) or 减少(reduce)点餐数量
     changeGoodNumber({commit, state}, data){
       let {id,change} = data
       // 查询索引值
       let index = state.goodsMsg.findIndex(item => {
         return item.M_id == id
       })
       // 判断是添加还是减少
       if(change === 'add'){
         commit('addGoodNumber',index)
       }else{
         commit('reduceGoodNumber',index)
       }
     },
     // 获取餐桌数据
      getFoodTableMsg({commit,state},data){
        commit('GetFoodTableMsg',data)
        // 持久化存储餐桌数据
        uni.setStorageSync('foodTable',data)
      },
      // 改变选择的餐桌
      changeSelectedFoodTable({commit,state},data){
        // 找到对应的 Cz_id
        let index = state.foodTable.findIndex(food=>{
          return food.Cz_num == data
        })
        commit('ChangeSelectedFoodTable',index)
      },
      // 添加用户订单输入
      getOrderData({commit,state},data){
        data = data.reduce((prev,next)=>{
          if(prev.hasOwnProperty(next.O_id)){ // 包含这个属性
            prev[next.O_id].push(next)
          } else{ // 不包含这个属性
            prev[next.O_id] = []
            prev[next.O_id].push(next)
          }
          return prev
        },{})
        commit('GetOrderData',data)
      },
      // 清除信息
      clearMsg({commit,state},data){
        state.userInfo.userState = false; // 用户登录状态
        commit('ResetGoodCart')
      }
   }

   const mutations = {
     // 添加菜单数据
      GetGoodsMsg(state,data){
        state.goodsMsg = data
      },
      // 增加菜品数量
      addGoodNumber(state,index){
        state.goodsMsg[index].M_number += 1
        uni.setStorageSync('goodsMsg',state.goodsMsg)
      },
      // 减少菜品数量
      reduceGoodNumber(state,index){
        state.goodsMsg[index].M_number -= 1
        uni.setStorageSync('goodsMsg',state.goodsMsg)
      },
      // 根据序号_改变选择的餐桌
      ChangeSelectedFoodTable(state,index){
        // 改变餐桌编号
        state.selectedFoodTable = state.foodTable[index].Cz_num
        // 改变餐桌id
         state.selectedFoodTable_id = state.foodTable[index].Cz_id
      },
      // 根据id_改变选择的餐桌
      ChangeSelectedFoodTable_id(state,data){
        // 改变餐桌编号
        state.selectedFoodTable = data.Cz_num
        // 改变餐桌id
         state.selectedFoodTable_id = data.Cz_id
      },
      // 获取餐桌数据
      GetFoodTableMsg(state,data){
          state.foodTable = data
      },
      // 添加用户订单输入
      GetOrderData(state,data){
        state.orderData = data
      },
      // 重置购物车
      ResetGoodCart(state,data){
        console.log(state.goodsMsg);
        state.goodsMsg = state.goodsMsg.map(item => {
           item.M_number = 0
           return item
        })
        // 改变本地存储的菜单数据
        uni.setStorageSync('goodsMsg',state.goodsMsg)
      }
   }

   const state = {
     goodsMsg : [], // 存放原始的菜单数据
     keyWord:'',  // 搜索的关键词
     foodTable:[], // 餐桌信息
     selectedFoodTable:'', // 选择的餐桌
     selectedFoodTable_id:'', // 选择的餐桌的id
     orderData:'', // 订单数据
   }

   const getters = {
     // 返回处理好的菜单数据
     goodsMsg(state){
       return state.goodsMsg.reduce((prev,next)=>{
          if(prev.hasOwnProperty(next.M_class)){ //存在这个属性
              prev[next.M_class].push(next)
          }else{ // 不存在这个属性
              prev[next.M_class] = []
              prev[next.M_class].push(next)
          }
          return prev
        },{})
     },
     // 返回购物车的总价
     getTotalPrice(state){
      let a = state.goodsMsg.reduce((prev,next)=>{
          prev += next.M_number * next.M_price
          return prev
       },0)
       return a
     },
     // 返回 keyWord对应的商品列表
     getGoodForKeyWord(state){
       return state.goodsMsg.filter(item => {
         return (item.M_name.indexOf(state.keyWord) >= 0)
       })
     },
     // 返回已经添加到购物车的商品
     getSelectedGood(state){
       let res =  state.goodsMsg.filter(item=>{
         return item.M_number > 0
       })
       // 排序
       res.sort((good1,good2)=>{
         if(good1.M_class > good2.M_class){
           return -1
         }else if(good1.M_class < good2.M_class){
           return 1
         }else{
           return 0
         }
       })
       return res
     },
     // 返回菜单编号信息
     getFoodTableNumber(state){
       return state.foodTable.reduce((prev,next)=>{
         prev.push(next.Cz_num)
         return prev
       },[])
     },
     // 返回加入购物车的餐份数
     shoppingCartNumber(state){
       return state.goodsMsg.reduce((prev,next)=>{
         prev += next.M_number
         return prev
       },0)
     }
   }
   
     
   export default new Vuex.Store({
   	actions,mutations,state,getters,modules:{userInfo}
   })