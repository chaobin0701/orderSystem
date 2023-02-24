// 导入 mysql 模块
const mysql = require("mysql");

// 创建数据库连接对象
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "admin123",
  database: "superdeer",
});

// 向外导出对象
module.exports = db;