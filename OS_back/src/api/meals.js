// 菜单管理
import request from "@/utils/request";
/**
 * 添加菜单
 * */
export function addMeals({meals_name,meals_category,meals_price,meals_image,meals_describe,meals_count}) {
  return request("/meals", "post", {meals_name,meals_category,meals_price,meals_image,meals_describe,meals_count});
}
/**
 * 查询菜单
 * */
export function queryMeals() {
  return request("/meals", "get");
}

/**
 * 删除菜单
 * */
export function delMeals(meals_id) {
  return request("/meals", "delete", {meals_id});
}
/**
 * 修改菜单
 * */
export function modifyMeals({meals_id,meals_name,meals_category,meals_price,meals_image,meals_describe,meals_count}) {
  return request("/meals", "put",{meals_id,meals_name,meals_category,meals_price,meals_image,meals_describe,meals_count});
}
