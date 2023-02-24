// 导入数据库操作模块
const dbMysql = require(process.cwd() + "/db/mysql");
const response = require("../utils/response");
const utils = require(process.cwd() + "/utils");
const tbaleName = "meals";

// 1.添加餐品
exports.addMeals = (req, res) => {
  const { name, category, price, image, describe, count } = req.body;
  let sqlStr = `insert into ${tbaleName} 
  values (0,'${name}','${category}',${price},'${image}','${describe}',${count},0)`;
  dbMysql.query(sqlStr, (err, result) => {
    if (err) {
      res.send({
        status: "10511",
        message: res,
      });
      return;
    }
    dbMysql.query(
      `SELECT * FROM ${tbaleName} where meals_id = ${result.insertId}`,
      (err, result) => {
        if (err) {
          res.send({
            status: "10211",
            message: res,
          });
          return;
        }
        res.send({
          status: "10210",
          result: result[0],
        });
      }
    );
  });
};

// 2.删除餐品信息
exports.delMeals = (req, res) => {
  const { id } = req.body;
  let sqlStr = `update  ${tbaleName} set deleted=1  where (meals_id = ${id})`;
  dbMysql.query(sqlStr, (err, result) => {
    if (err) {
      res.send({
        status: "10511",
        message: res,
      });
      return;
    }
    res.send({
      status: "10510",
      result,
    });
  });
};

// 3.编辑餐品信息
exports.modifyMeals = (req, res) => {
  const { id, name, category, price, image, describe, count } = req.body;
  let sqlStr = `update  ${tbaleName} set 
  meals_name='${name}' , meals_category='${category}' ,meals_price=${price} ,
  meals_image='${image}',meals_describe='${describe}',meals_count=${count}
  where  (meals_id = '${id}')`;
  dbMysql.query(sqlStr, (err, result) => {
    if (err) {
      res.send({
        status: "10511",
        message: res,
      });
      return;
    }
    res.send({
      status: "10510",
      result,
    });
  });
};

// 4.查询餐品信息
exports.queryMeals = (req, res) => {
  const { id = false } = req.body;
  let sqlStr;
  if (id) {
    sqlStr = `SELECT * FROM ${tbaleName} where meals_id = '${id}'`;
  } else {
    sqlStr = `SELECT * FROM ${tbaleName}`;
  }
  dbMysql.query(sqlStr, (err, result) => {
    if (err) {
      res.send({
        status: "10511",
        message: res,
      });
      return;
    }
    res.send({
      status: "10510",
      result: result.filter((item) => item.deleted === 0),
    });
  });
};
