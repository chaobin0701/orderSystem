<template>
  <div class="layout">
    <!-- 右侧内容区 -->
    <navMenu :activeIndex.sync="activeIndex"></navMenu>
    <div class="main">
      <!-- 顶部区域 -->
      <headerUI></headerUI>
      <!-- 内容区域 -->
      <router-view class="wrapper" :activeIndex="activeIndex"></router-view>
    </div>
  </div>
</template>

<script>
import navMenu from "./components/navMenu.vue";
import headerUI from "./components/header.vue";
export default {
  components: { navMenu, headerUI },
  data() {
    return {
      activeIndex: "全部菜单" //传递给菜单页面的筛选key
    };
  },
  // todo：请求 员工数据/餐桌数据 并保存到vuex中
  created() {
    this.$store.dispatch("queryStaff");
    this.$store.dispatch("queryFoodTable");
    this.$store.dispatch("queryGoodsType");
    this.$store.dispatch("queryGoodsCategory");
    this.$store.dispatch("queryGoods");
  }
};
</script>
<style scoped>
.layout {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100%;
}

.main {
  position: relative;
  margin-left: 200px;
  height: 100%;
}

/* 路由外层 */
.main > .wrapper {
  flex: 1;
  box-sizing: border-box;
  overflow-x: scroll;
  padding: 0px 15px;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
