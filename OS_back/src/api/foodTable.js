// 餐桌管理
import request from "@/utils/request";
// 添加餐桌
export function addFoodTable(data) {
  return request("/foodtable", "post", data);
}
// 查询餐桌
export function queryFoodTable(_id) {
  return request("/foodtable", "get", { _id });
}

// 删除餐桌
export function delFoodTable(_id) {
  return request("/foodtable", "delete", { _id });
}
//  修改餐桌
export function modifyFoodTable(data) {
  return request("/foodtable", "put", data);
}
