// 导入数据库操作模块
const dbMysql = require(process.cwd() + "/db/mysql");
const utils = require(process.cwd() + "/utils");
const tbaleName = "customerinfo";

// 添加顾客账号信息
exports.addCustomerInfo = (account, pwd) => {
  let sqlStr = `insert into ${tbaleName} (customer_account,customer_pwd)
  value ('${account}','${pwd}')`;
  console.log(sqlStr);
  return new Promise((resolve, reject) => {
    dbMysql.query(sqlStr, (err, result) => {
      if (err) {
        reject({ err, sqlStr });
      }
      resolve(result);
    });
  });
};

// 修改顾客账号信息
exports.modifyCustomerInfo = (id, pwd) => {
  let sqlStr = `update  ${tbaleName} 
  set customer_pwd='${pwd}' where  (customer_id = '${id}')`;
  return new Promise((resolve, reject) => {
    dbMysql.query(sqlStr, (err, result) => {
      if (err) {
        reject({ ...err, sqlStr });
      }
      resolve(result);
    });
  });
};

// 登录验证
exports.queryCustomerInfo = (account, pwd) => {
  let sqlStr = `SELECT customer_id FROM ${tbaleName} where customer_account = '${account}' and customer_pwd = '${pwd}'`;
  console.log(sqlStr)
  return new Promise((resolve, reject) => {
    dbMysql.query(sqlStr, (err, result) => {
      // sql语句运行错误
      if (err) {
        reject({ ...err, sqlStr });
      }
      // 未查到数据,账号密码出错
      if (result.length === 0) {
        reject("账号密码错误");
        return;
      }
      // 成功,返回id
      resolve(result[0].customer_id);
    });
  });
};
