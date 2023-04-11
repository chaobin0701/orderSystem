// 订单管理
import request from "@/utils/request";
/**
 * 添加订单
 * */
export function addOrder(data) {
  return request("/order", "post", data);
}

/**
 * 查询全部订单
 * */
export function queryOrder(data) {
  return request("/order", "get", data);
}

/**
 * 根据id查询单个订单
 * */
export function queryOrderById(_id) {
  return request("/order/detail", "get", { _id });
}

/**
 * 删除订单
 * */
export function deleteOrder(_id) {
  return request("/order", "delete", {_id});
}
/**
 * 修改订单
 * */
export function modifyOrder(orderObj) {
  const {
    _id,
    diningMethod,
    staff,
    staffId,
    diningFoodTable,
    diningFoodTableId,
    orderState
  } = orderObj;
  return request("/order/modify", "put", {
    _id,
    diningMethod,
    staff,
    staffId,
    diningFoodTable,
    diningFoodTableId,
    orderState
  });
}
