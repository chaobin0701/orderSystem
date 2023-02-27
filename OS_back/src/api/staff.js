// 员工管理
import request from "@/utils/request";

// 添加员工
export function addStaff(data) {
  return request("/staff", "post", data);
}

// 查询员工
export function queryStaff(_id) {
  return request("/staff", "get", { _id });
}

// 删除员工
export function delStaff(_id) {
  return request("/staff", "delete", {
    _id
  });
}
// 修改员工
export function modifyStaff(data) {
  return request("/staff", "put", data);
}
