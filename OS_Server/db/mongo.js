const mongoose = require("mongoose");
const config = require("../config");
const options = config.db;
const tableConfig = require("../tables");
const logger = require("../logger");

const db = mongoose.connect("mongodb://127.0.0.1:27017/superdeer");
mongoose.Promise = global.Promise;
mongoose.set({ strictQuery: true });
// 连接回调
mongoose.connection.on("connected", function (err) {
  console.log("连接成功");
  if (err) log.error("Database connection failure");
});
// 错误回调
mongoose.connection.on("error", function (err) {
  console.log("连接失败");
  log.error("Mongoose connected error " + err);
});
// 断开回调
mongoose.connection.on("disconnected", function () {
  console.log("断开连接");
  log.error("Mongoose disconnected");
});

// # 断开数据库连接
process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("断开连接");
  });
});

const mongoClient = {};
/**
 * @param 数据库配置
 * @return mongodb对象
 * */
// 数据库连接
const isConnet = (options) => {
  // 是否可以连接数据库
  // 构建数据库连接链接
  let dbURL = "";
  if (options.db_pwd) {
    // 若有密码则写法如下，注意：没密码切勿用此写法
    dbURL =
      "mongodb://" +
      options.db_user +
      ":" +
      options.db_pwd +
      "@" +
      options.db_host +
      ":" +
      options.db_port +
      "/" +
      options.db_name +
      "?authSource=admin";
  } else {
    dbURL =
      "mongodb://" +
      options.db_host +
      ":" +
      options.db_port +
      "/" +
      options.db_name; // mongodb://localhost:27017/koaadmin
  }
  // 连接数据库
  const db = mongoose.connect(dbURL); // , {useMongoClient: true}
  return db; // 返回db对象
};

/**
 * @param 数据库名称
 * @return 数据库连接对象
 * */
const getConnection = (table_name) => {
  // 获取链接状态并构建数据表
  // 未传递参数
  if (!table_name) return;
  // 尝试连接无配置的表
  if (!DB.tabConf[table_name]) {
    logger.error("No table structure");
    return false;
  }
  // 检查是否创建过连接对象
  let client = mongoClient[table_name];
  // 没有连接对象，创建连接对象
  if (!client) {
    // 获取检查模型
    let tConf = DB.tabConf[table_name];
    //构建用户信息表结构
    let nodeSchema = new mongoose.Schema(tConf, { timestamps: true }); // 构建用户表不要乱添加插入字段，自动生成配置文件时把id,创建日期，更新日期，用户id都自动添加上即可
    //构建model
    client = mongoose.model(table_name, nodeSchema, table_name);
    // 添加连接对象
    mongoClient[table_name] = client;
  }
  // 返回连接对象
  return client;
};

const fieldsCheck = (table_name, fields) => {
  let err_num = 0;
  let errArr = []; // 记录一下传递错误的字段，好排查错误
  for (let i in fields) {
    if (!DB.tabConf[table_name][i]) {
      errArr.push(i + "--" + DB.tabConf[table_name][i]);
      err_num++; // 比对所传参数，表中是否有配置
    }
  }

  if (err_num > 0) {
    logger.error("保存失败，所传参数不正确,错误的参数有" + errArr.join("  "));
    return true;
  } else {
    return false;
  }
};

/**
 * @param 数据库名称
 * @param 数据
 * @return 数据的id
 * */
const save = async (table_name, fields) => {
  // 保存数据
  if (!fields || !table_name) {
    logger.error("保存失败，表内容与表名称不能为空");
    return false;
  }
  const error = fieldsCheck(table_name, fields);
  if (error) {
    return;
  }
  let node_model = getConnection(table_name); //获取连接状态
  let mongooseEntity = node_model(fields); //传入数据
  return await mongooseEntity.save(); //保存数据
};

/**
 * @param 数据库名称
 * @param 唯一id
 * @param 筛选参数
 * @return 数据
 * */
const findOne = async (table_name, conditions, filterParams) => {
  // 查询详情
  let node_model = getConnection(table_name);
  return await node_model.findOne(conditions, filterParams, { lean: true });
};

/**
 * @param 数据库名称
 * @param 唯一id
 * @param 配置
 * @param 筛选数据
 * @return 数据
 * */
const findWhere = async (
  table_name,
  conditions,
  options = {},
  filterParams = {}
) => {
  // 条件查询   filterParams为对象表示过滤0为过滤   filterParams{name:1} 则会显示name值
  let node_model = getConnection(table_name);
  let list = node_model.find(conditions);
  let total = await node_model.find(conditions).count();
  list = await node_model
    .find(conditions, filterParams, { lean: true })
    .select(options.fields || "")
    .sort(options.sort || {})
    .limit(options.limit || {})
    .skip(options.skip || 0);
  return {
    total,
    list,
  };
};

/**
 * @param 数据库名称
 * @param 数据,删选条件
 * @return
 * */
const count = async (table_name, conditions) => {
  let node_model = getConnection(table_name);
  let total = await node_model.find(conditions).count();
  return total;
};

/**
 * @param 数据库名称
 * @param 条件
 * @param 数据筛选
 * @return 数据
 * */
const find = async (
  table_name,
  conditions,
  fields = { createdAt: 0, updatedAt: 0, __v: 0 }
) => {
  // 查询多条数据
  let node_model = getConnection(table_name);
  return (
    (await node_model.find(conditions, fields || null, { lean: true })) || []
  ); // 没有数据则返回空数组
};

/**
 * @param 数据库名称
 * @param 唯一id
 * @param 数据过滤
 * @return 数据
 * */
const findById = async (
  table_name,
  _id,
  fields = {
    createdAt: 0,
    updateAt: 0,
    __v: 0,
  }
) => {
  // 根据id查询
  let node_model = getConnection(table_name);
  return await node_model.findById(_id, fields);
};

/**
 * @param 数据库名称
 * @param 唯一id
 * @return
 * */
const remove = async (table_name, conditions) => {
  // 删除数据
  let node_model = getConnection(table_name);
  return await node_model.deleteMany(conditions);
};

/**
 * @param 数据库名称
 * @param 查询条件
 * @param 修改数据
 * @return 新数据
 * */
const update = async (table_name, conditions, update_fields) => {
  // 更新数据
  let node_model = getConnection(table_name);
  return await node_model.findOneAndUpdate(
    conditions,
    {
      $set: update_fields,
    },
    {
      new: true,
      multi: true,
      upsert: false,
    }
  );
};
/**
 * @param 数据库名称
 * @param 唯一id
 * @return
 * */
const updateData = async (table_name, conditions, update_fields) => {
  // 更新数据自己写操作符
  let node_model = getConnection(table_name);
  return await node_model.findOneAndUpdate(conditions, update_fields, {
    multi: true,
    upsert: false,
  });
};

var DB = {
  isConnet,
  mongoClient,
  getConnection,
  tabConf: tableConfig,
  save,
  findOne,
  findWhere,
  findById,
  update,
  updateData,
  remove,
  find,
  count,
};

module.exports = DB;
