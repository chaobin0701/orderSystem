// 上传文件模块
const multiparty = require('multiparty')
// 文件操作模块
const fs = require('fs')
const os = require('os')

// 图片上传
// 中间件
exports.imgBefore = (req,res,next) =>{
  /* 生成multiparty对象，并配置上传目标路径 */
  let form = new multiparty.Form();
  // 设置编码
  form.encoding = 'utf-8';
  // 设置文件存储路径，以当前编辑的文件为相对路径
  form.uploadDir = './public/images';
  // parse，表单解析器
  // fields :普通的表单数据
  // files:上传的文件的信息
  form.parse(req, function (err, fields, files) {
      try {
          // 文件为files.file[0] --> 获取到文件的信息
          let upfile = files.file[0]
          // 为文件进行命名,修改upfile文件中的path,否则会随机生成文件名 -- > 获取到路径
          let newpath = form.uploadDir + '/' + upfile.originalFilename  //文件名
          //  renameSync -- > 重命名
          fs.renameSync(upfile.path, newpath);
          
          // 返回信息,((upfile.size)/1048576).toFixed(2)将文件由B转换为M的单位并进行取小数点后两位进行四舍五入向上取操作
          req.state = {
              code:200,
              msg:'File Success',
              file_name:upfile.originalFilename,
              file_size:((upfile.size)/1048576).toFixed(2)+'M'
          }
          next()
          
      } catch {
          //  异常情况下的消息
          req.state = {
              code:401,
              msg:'File error',
              more_msg:err
          }
          next()
      }
  })
}
