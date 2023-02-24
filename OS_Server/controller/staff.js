// 导入数据库操作模块
const dbMysql = require(process.cwd() + "/db/mysql");
const tbaleName = "staff";
const response = require("../utils/response");



// 1.添加员工
exports.addStaff = (req, res) => {
  const { name, sex, age, salary } = req.body;
  let sqlStr = `insert into ${tbaleName} values (0,'${name}','${sex}',${age},${salary},0)`;
  dbMysql.query(sqlStr, (err, result) => {
    if (err) {
      res.send({
        status: "10211",
        message: res,
      });
      return;
    }
    dbMysql.query(
      `SELECT * FROM ${tbaleName} where staff_id = ${result.insertId}`,(err, result) => {
        if (err) {
          res.send({
            status: "10211",
            message: res,
          });
          return;
        }
        res.send({
          status: "10210",
          result:result[0]
        });
      }
    );
  });
};
// 2.删除员工
exports.delStaff = (req, res) => {
  const { id } = req.body;
  let sqlStr = `update  ${tbaleName} set deleted = 1 where (staff_id = '${id}')`;
  dbMysql.query(sqlStr, (err, result) => {
    if (err) {
      res.send({
        status: "10211",
        message: res,
      });
      return;
    }
    res.send({
      status: "10210",
      result,
    });
  });
};

// 3.编辑员工信息
exports.modifyStaff = (req, res) => {
  const { id, name, sex, age, salary } = req.body;

  let sqlStr = `update  ${tbaleName} set 
  staff_name='${name}' , staff_sex='${sex}' ,staff_age=${age} ,staff_salary=${salary}
  where  (staff_id = '${id}')`;
  dbMysql.query(sqlStr, (err, result) => {
    if (err) {
      res.send({
        status: "10211",
        message: res,
      });
      return;
    }
    res.send({
      status: "10210",
      result,
    });
  });
};

// 4.查询员工信息
exports.queryStaff = (req, res) => {
  const { id = false } = req.query;
  let sqlStr;
  if (id) {
    sqlStr = `SELECT * FROM ${tbaleName} where staff_id = '${id}'`;
  } else {
    sqlStr = `SELECT * FROM ${tbaleName}`;
  }
  dbMysql.query(sqlStr, (err, result) => {
    if (err) {
      res.send({
        status: "10211",
        message: res,
      });
      return;
    }
    res.send({
      status: "10210",
      result:result.filter(item => item.deleted === 0),
    });
  });
};