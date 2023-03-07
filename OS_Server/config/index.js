const config = {
  server: {
    port: process.env.SERVER_PORT, //服务端口号
  },
  db: {
    db_host: process.env.DB_HOST, //服务器地址
    db_name: process.env.DB_NAME, //数据库名
    db_user: process.env.DB_USER || "", //数据库用户名
    db_port: process.env.DB_PORT || "8087", //数据库端口
    db_pwd: process.env.DB_PASSWORD || "", //数据库密码
  },
  // 日志打印
  log: {
    appenders: {
      fileout: {
        type: "file",
        filename: "./logger/logs/fileout.log",
        maxLogSize: 1 * 1024 * 1024,
      },
      datafileout: {
        type: "dateFile",
        filename: "datafileout.log",
        pattern: ".yyyy-MM-dd-hh-mm-ss-SSS",
      },
      consoleout: { type: "console" },
      access: {
        type: "file",
        filename: "logs/cheese.log",
        maxLogSize: 1 * 1024 * 1024,
      },
    },
    categories: {
      default: { appenders: ["fileout", "consoleout"], level: "debug" },
      anything: { appenders: ["consoleout"], level: "debug" },
      access: { appenders: ["access"], level: "info" },
    },
  },
  jwt: {
    jwt_secret: process.env.JWT_SECRET, // JWT秘钥
    jwt_expire: process.env.JWT_EXPIRE, // JWT时间限制
  },
  static: {
    path: process.env.STATIC_PATH, // 静态服务目录
  },
};
module.exports = config;
