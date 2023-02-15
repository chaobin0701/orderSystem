// 导入数据库操作模块
const dbMysql = require(process.cwd() + "/db/mysql");
const utils = require(process.cwd() + "/utils");
const tbaleName = "customer";

// 添加顾客信息
exports.addCustomer = (name, sex, birthday) => {
  let sqlStr = `insert into ${tbaleName} (customer_name,customer_birthday,customer_sex)
  value ('${name}','${birthday}','${sex}')`;

  return new Promise((resolve, reject) => {
    dbMysql.query(sqlStr, (err, result) => {
      if (err) {
        reject({ err, sqlStr });
      }
      resolve(result);
    });
  });
};

// 编辑顾客信息
exports.modifyCustomer = (id, name, sex, birthday) => {
  let sqlStr = `update  ${tbaleName} set 
  customer_name='${name}' , customer_sex='${sex}' ,customer_birthday='${birthday}'
  where  (customer_id = '${id}')`;
  return new Promise((resolve, reject) => {
    dbMysql.query(sqlStr, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

// 查询顾客信息
exports.queryCustomer = (id = false) => {
  let sqlStr;
  if (id) {
    sqlStr = `SELECT * FROM ${tbaleName} where customer_id = ${id}`;
  } else {
    sqlStr = `SELECT * FROM ${tbaleName}`;
  }
  return new Promise((resolve, reject) => {
    dbMysql.query(sqlStr, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};
