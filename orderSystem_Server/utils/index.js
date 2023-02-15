const os = require("os");
const moment = require("moment");
// 中间件 => 根据 "_" 对res.body中的属性进行划分并简化变量
exports.deconstructParams = (req, res, next) => {
  const keys = Object.keys(req.body).filter((key) => {
    return key.indexOf("_") >= 1;
  });
  keys.forEach((item) => {
    req.body[item.slice(item.indexOf("_") + 1)] = req.body[item];
  });
  next();
};

//获取本机ip
exports.getIPAdress = function () {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
};

// 获取相应的时间
exports.momentHandle = function (model) {
  let startTime, endTime;
  switch (model) {
    case "month":
      startTime = moment().startOf("month").valueOf(); //获取当前月第一天0时0分0秒
      endTime = moment().endOf("month").valueOf(); //获取当前月最后一天23时59分59秒
      break;
    case "week":
      startTime = moment().startOf("isoWeek").valueOf(); //获取当前周0时0分0秒
      endTime = moment().endOf("isoWeek").valueOf(); //获取当前周末23时59分59秒
      break;
    case "day":
      startTime = moment().startOf("day").valueOf(); //获取当天0时0分0秒
      endTime = moment().endOf("day").valueOf(); //获取当天23时59分59秒
      break;
  }
  return {
    startTime:new Date(startTime),
    endTime:new Date(endTime)
  };
};
