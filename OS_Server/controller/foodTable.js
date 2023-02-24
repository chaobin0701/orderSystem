// 导入数据库操作模块
const dbMysql = require(process.cwd() + "/db/mysql");
const tbaleName = "foodtable";
// 1.添加餐桌
exports.addFoodTable = (req, res) => {
  const { number, position,state } = req.body;
  let sqlStr = `insert into ${tbaleName}  values (0,${number},'${state}','${position}',0)`;;
  dbMysql.query(sqlStr, (err, result) => {
    if (err) {
      res.send({
        status: "10111",
        message: res,
      });
      return;
    }
    res.send({
      status: "10110",
      result,
    });
  });
};

// 2.删除餐桌
exports.delFoodTable = (req, res) => {
  const { id } = req.body;
  let sqlStr = `update  ${tbaleName} set deleted=1 where (foodtable_id = '${id}')`;
  dbMysql.query(sqlStr, (err, result) => {
    if (err) {
      res.send({
        status: "10111",
        message: res,
      });
      return;
    }
    dbMysql.query(
      `SELECT * FROM ${tbaleName} where foodtable_id = ${result.insertId}`,(err, result) => {
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

// 3.编辑餐桌信息
exports.modifyFoodTable = (req, res) => {
  const { id, number, state, position } = req.body;
  let sqlStr = `update  ${tbaleName} set 
  foodtable_number=${number} , foodtable_state='${state}' ,foodtable_position='${position}' 
  where  (foodtable_id = '${id}')`;
  dbMysql.query(sqlStr, (err, result) => {
    if (err) {
      res.send({
        status: "10111",
        message: res,
      });
      return;
    }
    res.send({
      status: "10110",
      result,
    });
  });
};

// 4.查询餐桌信息
exports.queryFoodTable = (req, res) => {
  const { id = false } = req.body;
  let sqlStr;
  if (id) {
    sqlStr = `SELECT * FROM ${tbaleName} where foodtable_id = '${id}'`;
  } else {
    sqlStr = `SELECT * FROM ${tbaleName}`;
  }
  dbMysql.query(sqlStr, (err, result) => {
    if (err) {
      res.send({
        status: "10111",
        message: res,
      });
      return;
    }
    res.send({
      status: "10110",
      result:result.filter(item => item.deleted === 0),
    });
  });
};
