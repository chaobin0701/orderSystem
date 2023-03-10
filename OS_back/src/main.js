import Vue from "vue";
import store from "./store";
import ElementUI from "element-ui";
Vue.use(ElementUI); //全局注册Element-UI组件
import "element-ui/lib/theme-chalk/index.css"; //引入Element-UI样式

import MainHeader from "@/components/mainHeader.vue"; // 顶部组件(全局注册)
Vue.component("MainHeader", MainHeader);
import defaultImg from "@/public/images/defaultFood.png";
// import "@/permission"; // 路由守卫 控制
import "tailwindcss/tailwind.css";
import App from "./App";
import router from "./router/index";
import "echarts";
import ECharts from "vue-echarts";
Vue.component("VueEcharts", ECharts);
Vue.config.productionTip = false;
Vue.directive("lazyload", {
  inserted(el, binding) {
    const observer = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          observer.unobserve(el);
          el.onerror = () => {
            el.src = defaultImg;
          };
          el.src = binding.value;
        }
      },
      {
        threshold: 0.01
      }
    );
    observer.observe(el);
  }
});
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>",
  data() {
    return {
      isLogin: false
    };
  }
});
