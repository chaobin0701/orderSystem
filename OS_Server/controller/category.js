// 导入数据库操作模块
const dbMysql = require(process.cwd() +"/db/mysql");
const tbaleName = "category";

// 1.添加类别
exports.addCategory = (req, res) => {
  const { name } = req.body;
  let sqlStr = `insert into ${tbaleName} (Category_name)
  value ('${name}')`;
  dbMysql.query(sqlStr, (err, result) => {
    if (err) {
      res.send({
        status: "10611",
        message: res,
      });
      return;
    }
    dbMysql.query(
      `SELECT * FROM ${tbaleName} where category_id = ${result.insertId}`,(err, result) => {
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

// 2.删除类别信息
exports.delCategory = (req, res) => {
  const { id } = req.body;
  let sqlStr = `update  ${tbaleName} set deleted=1 where category_id = ${id}`;
  dbMysql.query(sqlStr, (err, result) => {
    if (err) {
      res.send({
        status: "10611",
        message: res,
      });
      return;
    }
    res.send({
      status: "10610",
      result,
    });
  });
};

// 3.编辑类别信息
exports.modifyCategory = (req, res) => {
  const { id, name } = req.body;
  let sqlStr = `update  ${tbaleName} set 
  category_name='${name}' where  (category_id = ${id})`;
  dbMysql.query(sqlStr, (err, result) => {
    if (err) {
      res.send({
        status: "10611",
        message: res,
      });
      return;
    }
    res.send({
      status: "10610",
      result,
    });
  });
};

// 4.查询餐桌信息
exports.queryCategory = (req, res) => {
  const { id = false } = req.body;
  let sqlStr;
  if (id) {
    sqlStr = `SELECT * FROM ${tbaleName} where category_id = ${id}`;
  } else {
    sqlStr = `SELECT * FROM ${tbaleName}`;
  }
  dbMysql.query(sqlStr, (err, result) => {
    if (err) {
      res.send({
        status: "10611",
        message:sqlStr
      });
      return;
    }
    res.send({
      status: "10610",
      result:result.filter(item => item.deleted === 0),
    });
  });
};
