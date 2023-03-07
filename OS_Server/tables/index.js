const goodsType = require("./goodsType");
const orders = require("./orders");
const goodsCategory = require("./goodsCategory");
const goods = require("./goods");
const staff = require("./staff");
const foodtable = require("./foodtable");
const customer = require("./customer");
const goods_goodsCategory = require("./goods_goodsCategory");
// 导出schema
module.exports = {
  orders,
  goodsType,
  goodsCategory,
  goods,
  staff,
  foodtable,
  customer,
  goods_goodsCategory,
};
