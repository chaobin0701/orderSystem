import Vue from "vue";
import Router from "vue-router";
//导入组件
import order from "@/view/order/index.vue";
import foodTable from "@/view/foodTable/index.vue";
import category from "@/view/category/index.vue";
import meals from "@/view/meals/index.vue";
import staff from "@/view/staff/index.vue";
import login from "@/view/login/index.vue";
import orderDetails from "@/view/orderDetail/index.vue";
import home from "@/view/home/index.vue";
import layout from "@/layout";

import axios from "axios";
// axios.defaults.baseURL = 'http://127.0.0.1:3000/api/back' //设置默认路由前缀 - 本地
axios.defaults.baseURL = "http://118.31.47.122:3280/api/back"; //设置默认路由前缀 - 服务器

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      component: layout,
      children: [
        {
          path: "/",
          name: "首页",
          component: home,
          icon: "el-icon-s-home"
        },
        {
          path: "/order",
          name: "订单管理",
          component: order,
          icon: "el-icon-s-order"
        },
        {
          path: "/foodTable",
          name: "餐桌管理",
          component: foodTable,
          icon: "el-icon-dish"
        },
        {
          path: "/category",
          name: "分类管理",
          component: category,
          icon: "el-icon-menu"
        },
        {
          path: "/meals",
          name: "菜单管理",
          component: meals,
          icon: "el-icon-food"
        },
        {
          path: "/staff",
          name: "员工管理",
          component: staff,
          icon: "el-icon-s-custom"
        },
        {
          path: "/orderDetails",
          name: "订单详情",
          component: orderDetails,
          hidden: true
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "*",
      name: 404,
      component: () => import("@/view/404")
    }
  ]
});

export default router;
