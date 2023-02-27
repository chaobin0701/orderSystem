import Vue from "vue";
import Router from "vue-router";
//导入组件
import axios from "axios";

axios.defaults.baseURL = "http://118.31.47.122:3280/api/back"; //设置默认路由前缀 - 服务器

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      component: () => import("@/layout"),
      children: [
        {
          path: "/",
          name: "首页",
          component: () => import("@/view/home/index.vue"),
          icon: "el-icon-s-home"
        },
        {
          path: "/order",
          name: "订单管理",
          component: () => import("@/view/order/index.vue"),
          icon: "el-icon-s-order"
        },
        {
          path: "/goodsType",
          name: "商品类别",
          icon: "el-icon-s-grid",
          component: () => import("@/view/goodsType/index.vue")
        },
        {
          path: "/goods",
          icon: "el-icon-s-goods",
          component: () => import("@/view/goods/index.vue"),
          children: [
            {
              path: "/",
              name: "商品管理",
              component: () => import("@/view/goods/showInfo.vue")
            },
            {
              path: "add/:goodsType",
              component: () => import("@/view/goods/components/modifyGoods.vue")
            },
            {
              path: "add/:goodsType/:_id",
              component: () => import("@/view/goods/components/modifyGoods.vue")
            }
          ]
        },
        {
          path: "/goodsCategory",
          name: "商品类型",
          icon: "el-icon-menu",
          component: () => import("@/view/goodsCategory/index.vue")
        },

        {
          path: "/foodTable",
          name: "餐桌管理",
          component: () => import("@/view/foodTable/index.vue"),
          icon: "el-icon-dish"
        },
        {
          path: "/staff",
          name: "员工管理",
          component: () => import("@/view/staff/index.vue"),
          icon: "el-icon-s-custom"
        },
        {
          path: "/orderDetails",
          name: "订单详情",
          component: () => import("@/view/orderDetail/index.vue"),
          hidden: true
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/view/login/index.vue")
    },
    {
      path: "*",
      name: 404,
      component: () => import("@/view/404")
    }
  ]
});

export default router;
