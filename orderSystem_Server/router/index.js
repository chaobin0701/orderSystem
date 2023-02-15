const express = require("express");
const router = express.Router();

// 处理函数
const file_Handler = require("../controller/file");

// 上传图片接口
router.post('/file/upload',file_Handler.img)

module.exports = router;
