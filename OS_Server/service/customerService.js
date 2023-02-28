const mongodb = require("../db/mongo");
const TABLENAME = "customer";
const jwt = require("jsonwebtoken"); //用于生成JWT字符串的包
const config = require("../config"); //配置文件

class CustomerService {
  // 添加新用户
  async saveCustomer(obj) {
    let result = await mongodb.save(TABLENAME, obj);
    return result;
  }
  // 修改用户信息
  async modifyCustomerInfo(_id, obj) {
    let result = mongodb.update(TABLENAME, { _id }, obj);
    return result;
  }
  // 修改用户密码
  async modifyCustomer(_id, obj) {
    let result = mongodb.update(TABLENAME, { _id }, obj);
    return result;
  }
  // 用户登录
  async login(customer_account, customer_pwd) {
    let result = await mongodb.findWhere(
      TABLENAME,
      {
        customer_pwd,
        customer_account,
      },
      {}
    );

    if (result.total === 1) {
      // 返回的数据处理
      result = {
        info: {
          customer_name: result.list[0].customer_name,
          customer_birthday: result.list[0].customer_birthday,
          customer_sex: result.list[0].customer_sex,
          _id: result.list[0]._id,
        },
      };
      // 返回token
      result.token = jwt.sign(
        {
          _id: result.info._id,
          customer_name: result.info.customer_name,
        },
        config.jwt.jwt_secret,
        { expiresIn: config.jwt.jwt_expire }
      );
      return result;
    } else {
      return false;
    }
  }
  // 获取全部用户信息
  async findAllCustomerInfo() {
    let result = await mongodb.find(
      TABLENAME,
      {},
      {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
        customer_pwd: 0,
        customer_account: 0,
      }
    );
    return result;
  }

  // 获取单个用户信息
  async findCustomerInfoById(_id) {
    let result = await mongodb.findById(TABLENAME, _id);
    return result;
  }
}

module.exports = new CustomerService();
