// 商品类型管理
import request from "@/utils/request";
// 添加商品类型
export function addGoodsCategory(data) {
  return request("/goodscategory", "post", data);
}
// 查询商品类型
export function queryGoodsCategory(_id) {
  return request("/goodscategory", "get", { _id });
}
// 删除商品类型
export function delGoodsCategory(_id) {
  return request("/goodscategory", "delete", { _id });
}
//  修改商品类型
export function modifyGoodsCategory(data) {
  return request("/goodscategory", "put", data);
}
