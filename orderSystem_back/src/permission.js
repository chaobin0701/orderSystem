// 权限拦截在路由跳转 导航守卫
import router from "@/router";
import store from "@/store"; // 引入store实例

// 不需要导出 因为只需要让代码执行即可
// 前置守卫
router.beforeEach(async (to, form, next) => {
  if (store.getters.token) {
    // 有token TODO
    if (to.path === "/login") {
      next("/"); //跳转到默认路由
    } else {
      // 动态路由TODO(参考HR-Sass项目)
      next(); //跳转
    }
  } else {
    // 没有token TODO
    // 动态路由TODO(参考HR-Sass项目)
    next("/login"); //跳转到登录页面
  }
});
// 后置守卫
router.afterEach(() => {});
