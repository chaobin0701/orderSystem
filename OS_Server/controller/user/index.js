/* 用户信息接口 */
// 处理函数
const customer_Handler = require("./customer");
const customerInfo_Handler = require("./customerInfo");
const jwt = require("jsonwebtoken"); //用于生成JWT字符串的包
const config = require("../../config"); //配置文件


// 新添用户
exports.addUser = async (req, res) => {
  const { name, sex, birthday, pwd, account } = req.body;
  try {
    const result1 = await customer_Handler.addCustomer(name, sex, birthday);
    const result2 = await customerInfo_Handler.addCustomerInfo(account, pwd);
    res.send({
      status: "10411",
      message: "添加成功",
      result: {
        result1,
        result2,
      },
    });
  } catch (error) {
    res.send({
      status: "10410",
      error,
    });
  }
};

// 修改用户基本信息
exports.modifyUser = async (req, res) => {
  const { id, name, sex, birthday } = req.body;
  try {
    const result = await customer_Handler.modifyCustomer(
      id,
      name,
      sex,
      birthday
    );
    res.send({
      status: "10411",
      message: "修改成功",
      result,
    });
  } catch (error) {
    res.send({
      status: "10410",
      error,
    });
  }
};
// 修改用户账户和密码
exports.modifyUserInfo = async (req, res) => {
  const { id, pwd } = req.body;
  try {
    const result = await customerInfo_Handler.modifyCustomerInfo(id, pwd);
    console.log(result)
    res.send({
      status: "10411",
      message: "修改成功",
      result,
    });
  } catch (error) {
    res.send({
      status: "10410",
      error,
    });
  }
};

// 用户登录
exports.login = async (req, res) => {
  const { account, pwd } = req.body;
  try {
    const id = await customerInfo_Handler.queryCustomerInfo(account, pwd);
    const result = await customer_Handler.queryCustomer(id);
    res.send({
      status: "10411",
      message: "登录成功",
      // 根据用户信息生成token并返回
      token: jwt.sign(
        {
          customer_id: result[0].customer_id,
          customer_name: result[0].customer_name,
        },
        config.jwt.jwt_secret,
        { expiresIn: config.jwt.jwt_expire }
      ),
    });
  } catch (error) {
    res.send({
      status: "10410",
      message: "登录失败",
      error,
    });
  }
};

// 5.查找用户信息接口
exports.queryUserInfo = async (req, res) => {
  const { id } = req;
  try {
    const result = await customer_Handler.queryCustomer(id);
    res.send({
      status: "10411",
      message: "查询成功",
      result,
    });
  } catch (error) {
    res.send({
      status: "10410",
      message: "查询失败",
      error,
    });
  }
};
