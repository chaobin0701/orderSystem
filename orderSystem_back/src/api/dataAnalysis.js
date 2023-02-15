import request from "@/utils/request";

// 1.商品销量分析
export function salesVolume(params) {
  return request('/dataAnalysis/category','get',params)
}

// 2.餐品销量分析
export function MealsVolume(params) {
  return request('/dataAnalysis/meals','get',params)
}
// 3.30天销量分析
export function salesAmountVolume() {
  return request('/dataAnalysis/dailySales','get')
}