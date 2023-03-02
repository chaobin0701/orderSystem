// 其他模块
const express = require("express");
const app = express(); //创建服务器的实例对象
const cors = require("cors"); // cors跨域
const utils = require("./utils");
const dotenv = require("dotenv"); // 对环境变量进行转换
dotenv.config(); // 对环境变量进行转换

const config = require("./config"); //配置文件

// api路由模块
const Route = require("./router");

app.use(cors()); //讲cors注册为全局中间件
const expressJWT = require("express-jwt"); //将客户端发送过来的JWT字符串，解析还原成JSON 对象的包
app.use(express.urlencoded({ extended: false })); // 解析 url-encoded格式的表单数据
app.use(express.json()); // 解析json格式的表单数据

// 文件夹映射
app.use(config.static.path, express.static("public"));
/* JWT配置 */
app.use(
  expressJWT
    .expressjwt({
      secret: config.jwt.jwt_secret, // 秘钥
      algorithms: ["HS256"],
      requestProperty: "auth", //token数据在response中的位置
    })
    .unless({
      path: [/^\/api/], // 指定路径不经过 Token 解析
      // path: "/api/customer/login", // 指定路径不经过 Token 解析
    })
);

// 处理body中的参数
app.use("/", utils.deconstructParams);

// 失败级中间件
app.use((err, req, res, next) => {
  // token解析失败导致的错误
  if (err.name === "UnauthorizedError") {
    res.status(401); //401 => 无权限
    return res.send({ statud: 401, message: "无效的token", err });
  }
  // 其它原因导致的错误
  res.send({ status: 500, message: "未知错误", err });
});

// // 配置路由
app.use("/api", Route);

// 启动端口
app.listen(3280, () => {
  console.log("后端启动了 at https://127.0.0.1:3280");
});
