/**
 * 基础请求成功值
 * @param {*} ctx
 * @param {*} data
 * @param {*} msg
 * @param {*} code
 */
function success(res, data = [], msg = "success", code = 200) {
  // 成功默认返回格式
  result = {
    code,
    msg,
    data,
  };
  res.send(result);
}
/**
 * 基础错误信息格式
 * @param {*} ctx
 * @param {*} msg
 * @param {*} data
 * @param {*} code
 */
function error(res, msg = "error", data = [], code = 1) {
  // 成功默认返回格式
  result = {
    code,
    msg,
    data,
  };
  res.send(result);
}

module.exports = {
  success,
  error,
};
