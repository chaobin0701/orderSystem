// 员工管理
import request from "@/utils/request";
/**
 * 添加员工
 * */
export function addStaff({staff_name, staff_sex, staff_age, staff_salary}) {
  return request("/staff", "post", {
    staff_name,
    staff_sex,
    staff_age,
    staff_salary
  });
}
/**
 * 查询员工
 * */
export function queryStaff() {
  return request("/staff", "get", {});
}

/**
 * 删除员工
 * */
export function delStaff(staff_id) {
  return request("/staff", "delete", {
    staff_id
  });
}
/**
 * 修改员工
 * */
export function modifyStaff({staff_id,staff_name, staff_sex, staff_age, staff_salary}) {
  return request("/staff", "put", {staff_id,staff_name, staff_sex, staff_age, staff_salary});
}
