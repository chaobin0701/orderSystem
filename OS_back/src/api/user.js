import request from "@/utils/request";

/**
 * 用户登录方法
 */
export function login(data) {
  return request("/customer/login", "post", data);
}
