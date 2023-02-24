// 分类管理分类
import request from "@/utils/request";
/**
 * 添加分类
 * */
export function addCategory({category_name}) {
  return request("/category", "post", {category_name});
}
/**
 * 查询分类
 * */
export function queryCategory() {
  return request("/category", "get");
}

/**
 * 删除分类
 * */
export function delCategory(category_id) {
  return request("/category", "delete", {category_id});
}
/**
 * 修改分类
 * */
export function modifyCategory({category_name,category_id}) {
  return request("/category", "put", {category_name,category_id});
}
