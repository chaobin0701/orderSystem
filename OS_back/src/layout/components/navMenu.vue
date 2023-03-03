<template>
  <div class="menu">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      @select="handleSelect"
      @open="handleOpen"
    >
      <el-image :src="require('@/assets/logo.png')"> </el-image>
      <template v-for="(route, index) in routes">
        <el-menu-item v-if="!route.hidden" :key="index" :index="route.path">
          <i :class="route.icon"></i>
          {{ route.title }}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "navMenu",
  data() {
    return {
      activeIndex: "/home", // 导航的当前标签
      routes: [], //二级子路由
    };
  },
  methods: {
    handleSelect(key) {
      this.$router.push(key);
    },
    handleOpen(index) {
      // 打开菜单回调
      this.handleSelect(index);
      this.activeIndex = "全部菜单";
      this.$emit("update:activeIndex", "全部菜单");
    },
  },
  created() {
    this.routes = this.$router.options.routes[0].children;
    this.activeIndex = this.$route.path;
  },
};
</script>

<style>
.menu {
  width: 200px;
  position: fixed;
  height: 100%;
  top: 0;
}

/* 背景 */
.menu ul {
  background-color: #25abbe;
}

.menu > ul {
  width: 100%;
  height: 100%;
  border-radius: 0px 20px 20px 0px;
}

/* 图片 */
.menu .el-image {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.menu .el-image img {
  width: 100px;
}

/* hover效果 */
.el-menu-item:hover,
.el-submenu__title:hover {
  color: #25abbe;
  background-color: rgba(255, 255, 255, 0.8);
}

.el-menu-item:hover i,
.el-submenu__title:hover i {
  color: #25abbe;
}

/* 选中效果 */
.el-menu-item.is-active {
  background-color: white;
  color: #25abbe;
}

/* 默认状态 */
.el-menu-item,
.el-submenu__title {
  color: #fff;
  padding: 0;
  box-sizing: border-box;
  min-width: none;
  border-radius: 0 5px 5px 0;
}

.el-submenu__title i,
.el-menu-item i {
  color: white;
}

.el-menu-item {
  margin: 0;
}

.el-menu-item-group ul {
  margin: 0;
}

.el-menu-item-group__title {
  padding: 0;
}
</style>