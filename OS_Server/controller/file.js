const multiparty = require("multiparty"); // 上传文件模块
const fs = require("fs"); // 文件操作模块
const utils = require(process.cwd() + "/utils");

// 图片上传 中间件
exports.img = (req, res) => {
  /* 生成multiparty对象，并配置上传目标路径 */
  let form = new multiparty.Form();
  form.encoding = "utf-8"; // 设置编码
  form.uploadDir = "./public/goods"; // 设置文件存储路径，以当前编辑的文件为相对路径

  // parse，表单解析器
  // fields :普通的表单数据
  // files:上传的文件的信息
  form.parse(req, function (err, fields, files) {
    try {
      // 文件为files.file[0]
      let upfile = files.file[0];
      // 为文件进行命名,修改upfile文件中的path,否则会随机生成文件名
      let newpath = form.uploadDir + "/" + upfile.originalFilename; //文件名
      // 重命名
      fs.renameSync(upfile.path, newpath);

      // 返回信息
      res.send({
        code: 200,
        msg: "File Success",
        name: upfile.originalFilename,
        file_size: (upfile.size / 1048576).toFixed(2) + "M",
        url: `http://${utils.getIPAdress()}:3280/static/goods/${
          upfile.originalFilename
        }`,
      });
    } catch {
      //  异常情况下的消息
      res.send({
        code: 401,
        msg: "File error",
        more_msg: err,
      });
    }
  });
};
