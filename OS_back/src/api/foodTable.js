// 餐桌管理
import request from "@/utils/request";
/**
 * 添加餐桌
 * */
export function addFoodTable({foodtable_number,foodtable_position,foodtable_state}) {
  return request("/foodtable", "post", {foodtable_number,foodtable_position,foodtable_state});
}
/**
 * 查询餐桌
 * */
export function queryFoodTable() {
  return request("/foodtable", "get");
}

/**
 * 删除餐桌
 * */
export function delFoodTable(foodtable_id) {
  return request("/foodtable", "delete", {foodtable_id});
}
/**
 * 修改餐桌
 * */
export function modifyFoodTable({foodtable_id,foodtable_number,foodtable_position,foodtable_state}) {
  return request("/foodtable", "put", {foodtable_id,foodtable_number,foodtable_position,foodtable_state});
}
