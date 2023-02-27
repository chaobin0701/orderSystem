// 商品管理
import request from "@/utils/request";
// 添加商品
export function addGoods(data) {
  return request("/goods", "post", data);
}
// 查询商品
export function queryGoods(_id) {
  return request("/goods", "get", { _id });
}
// 删除商品
export function delGoods(_id) {
  return request("/goods", "delete", { _id });
}
//  修改商品
export function modifyGoods(data) {
  return request("/goods", "put", data);
}
