let { localStorage } = window;
// 获取token
export function getToken() {
  return localStorage.getItem("token");
}
// 设置token
export function setToken(token) {
  return localStorage.setItem("token", token);
}
//删除token
export function removeToken() {
  return localStorage.removeItem("token");
}
