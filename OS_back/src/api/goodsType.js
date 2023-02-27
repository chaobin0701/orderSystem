// 商品类别管理
import request from "@/utils/request";
// 添加商品类别
export function addGoodsType(data) {
  return request("/goodstype", "post", data);
}
// 查询商品类别
export function queryGoodsType(_id) {
  return request("/goodstype", "get", { _id });
}
// 删除商品类别
export function delGoodsType(_id) {
  return request("/goodstype", "delete", { _id });
}
//  修改商品类别
export function modifyGoodsType(data) {
  return request("/goodstype", "put", data);
}
