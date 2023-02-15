// 1.创建一个新的axios实例
import axios from "axios";
import store from "@/store";
import router from "@/router";

// 导出基准地址 原因：其它地方不是通过axios发请求的地方用上基准地址
// export const baseURL = "http://118.31.47.122:3280/api/back"; // 网络地址
export const baseURL = "http://127.0.0.1:3280/api/"; //本地地址

const instance = axios.create({
  baseURL,
  timeout: 5000 //设置5000ms请求超时
});

// 2.请求拦截器，如果有token进行头部携带
instance.interceptors.request.use(
  config => {
    // 携带token
    config.headers.Authorization = "Bearer " + store.getters.token;
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// 3.响应拦截器：1.剥离无效数据 2.处理token失效
instance.interceptors.response.use(
  res => {
    return res.data;
  },
  // 处理失败
  error => {
    if (error.response.data.status !== 401) {
      // token过时 TODO
      store.dispatch("user/logout");
      router.push("/login");
    } else {
      // 其它错误
    }
    return Promise.reject(error);
  }
);

// 4.导出一个函数，调用当前的axios实例发请求，返回promise
export default (url, method, submitData) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === "get" ? "params" : "data"]: submitData
  });
};
