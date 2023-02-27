const mongodb = require("../../db/mongo");
const response = require("../../utils/response");
const CUSTOMER_TABLENAME = "customer";
const { customer } = require("../../tables");
const jwt = require("jsonwebtoken"); //用于生成JWT字符串的包
const config = require("../../config"); //配置文件

class gui {
  // 添加新用户
  saveCustomer = async (req, res) => {
    // 数据处理
    const where = {};
    Object.keys(customer).forEach((key) => {
      where[key] = req.body[key];
    });
    // 提交数据
    let result = await mongodb.save(CUSTOMER_TABLENAME, where);
    if (result === false) {
      response.error(res, "服务器错误");
    } else {
      response.success(res, result);
    }
  };
  // 修改用户信息
  modifyCustomerInfo = async (req, res) => {
    let { customer_name, customer_birthday, customer_sex, _id } = req.body;
    let where = { customer_name, customer_birthday, customer_sex, _id };
    // 提交修改数据
    let result = mongodb.update(CUSTOMER_TABLENAME, { _id }, where);
    if (result === false) {
      response.error(res, "数据库错误");
    } else {
      response.success(res, result);
    }
  };
  // 修改用户密码
  modifyCustomer = async (req, res) => {
    let { customer_pwd, customer_account, _id } = req.body;
    let where = { customer_pwd, customer_account, _id };
    // 提交修改数据
    let result = mongodb.update(CUSTOMER_TABLENAME, { _id }, where);
    if (result === false) {
      response.error(res, "数据库错误");
    } else {
      response.success(res, result);
    }
  };
  // 用户登录
  login = async (req, res) => {
    let { customer_pwd, customer_account } = req.body;
    if (!customer_pwd && !customer_account) {
      response.error(res, "缺少账号或密码");
    }

    let result = await mongodb.findWhere(
      CUSTOMER_TABLENAME,
      { customer_pwd, customer_account },
      {},
      {}
    );
    // TOKEN 处理
    if (result.total === 1) {
      response.success(res, {
        token: jwt.sign(
          {
            _id: result.list[0]._id,
            customer_name: result.list[0].customer_name,
          },
          config.jwt.jwt_secret,
          { expiresIn: config.jwt.jwt_expire }
        ),
      });
    } else {
      response.error(res, "登录失败");
    }
  };
  // 获取用户信息
  findCustomerInfo = async (req, res) => {
    let result = null;
    if (req.query._id) {
      result = await mongodb.findById(CUSTOMER_TABLENAME, req.query._id);
    } else {
      result = await mongodb.find(CUSTOMER_TABLENAME, {});
    }
    if (result === false) {
      response.error(res, "数据库错误");
    } else {
      response.success(res, result);
    }
  };
}

module.exports = new gui();
