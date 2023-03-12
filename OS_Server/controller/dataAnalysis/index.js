// 导入数据库操作模块
const mongodb = require("../../db/mongo");
const moment = require("moment");
const response = require("../../utils/response");
const utils = require(process.cwd() + "/utils");

class DataAnalysis {
  //1.查询分类销售数据
  categorySales = async (req, res) => {
    // 解析时间，根据传入的时间不同，生成不同的时间戳传递给查询函数
    const { model = "day" } = req.query;
    let { startTime, endTime } = utils.momentHandle(model);
    const DB = mongodb.getConnection("orders"); //获取连接状态

    try {
      // 获取销售数据
      let info = await DB.aggregate(
        aggregateConfig.categorySales(startTime, endTime)
      );
      response.success(res, info);
    } catch (error) {
      response.error(res, "服务器错误", error);
    }
  };

  //2.查询商品销售数据
  mealsSales = async (req, res) => {
    // 解析时间，根据传入的时间不同，生成不同的时间戳传递给查询函数
    const { model = "day" } = req.query;
    let { startTime, endTime } = utils.momentHandle(model);
    const DB = mongodb.getConnection("orders"); //获取连接状态
    try {
      // 获取订单数据
      const info = await DB.aggregate(
        aggregateConfig.mealsSales(startTime, endTime)
      );
      response.success(res, info);
    } catch (error) {
      response.error(res, "服务器错误", error);
    }
  };

  // 3.查询商品销售数据
  dailySales = async (req, res) => {
    // 1.数据格式化
    let result = {};
    for (let i = 14; i >= 0; i--) {
      result[moment().startOf("day").subtract(i, "days").format("MM月DD日")] = {
        day: moment().startOf("day").subtract(i, "days").format("MM月DD日"),
        totalPrice: 0,
        totalCount: 0,
      };
    }
    // 2.时间戳处理
    let endTime = new Date(moment().endOf("day").valueOf()); //获取当天23时59分59秒
    let startTime = new Date(
      moment().startOf("day").subtract(15, "days").valueOf()
    ); //当前时间往后30天的时间戳
    const DB = await mongodb.getConnection("orders"); //获取连接状态
    try {
      const info = await DB.aggregate(
        aggregateConfig.dailySales(startTime, endTime)
      );
      info.forEach((item) => {
        if (result.hasOwnProperty(item.day)) {
          result[item.day] = {
            ...result[item.day],
            ...item,
          };
        }
      });
      result = Object.keys(result).map((key) => {
        return result[key];
      });
      response.success(res, result);
    } catch (error) {
      response.success(res, "服务器错误", error);
    }
  };
}

// 聚合查询的配置
const aggregateConfig = {
  // 查询分类销售数据
  categorySales: (startTime, endTime) => {
    return [
      //去除不需要的字段
      {
        $project: {
          _id: 0,
          orderPrice: 0,
          __v: 0,
          string: 0,
          orderState: 0,
          diningMethod: 0,
          staff: 0,
          staffId: 0,
          diningFoodTable: 0,
          diningFoodTableId: 0,
          customerName: 0,
          customerId: 0,
          updatedAt: 0,
        },
      },
      //对时间进行限制
      {
        $match: {
          createdAt: {
            $gte: startTime,
            $lte: endTime,
          },
        },
      },
      //取到订单中的点餐数据
      {
        $unwind: {
          path: "$goodsInfo",
        },
      },
      //根据餐品分类ID进行分类
      {
        $group: {
          _id: "$goodsInfo.goodsCategory.gc_name",
          //统计总金额
          total: {
            $sum: {
              $multiply: ["$goodsInfo.goodsPrice", "$goodsInfo.goodsCount"],
            },
          },
          //统计点餐数
          totalCount: {
            $sum: "$goodsInfo.goodsCount",
          },
        },
      },
      // 修改_id的名称
      {
        $project: {
          _id: 0,
          gc_name: "$_id",
          total: 1,
          totalCount: 1,
        },
      },
    ];
  },
  // 查询商品销售数据
  mealsSales: (startTime, endTime) => {
    return [
      {
        //过滤字段
        $project: {
          _id: 0,
          orderPrice: 0,
          __v: 0,
          string: 0,
          orderState: 0,
          diningMethod: 0,
          staff: 0,
          staffId: 0,
          diningFoodTable: 0,
          diningFoodTableId: 0,
          customerName: 0,
          customerId: 0,
          updatedAt: 0,
        },
      },
      {
        //对时间进行限制
        $match: {
          createdAt: {
            $gte: startTime, //大于
            $lte: endTime, //小于
          },
        },
      },
      {
        //取到订单中的点餐数据
        $unwind: {
          path: "$goodsInfo",
        },
      },
      {
        $group: {
          //根据菜品进行分类
          _id: "$goodsInfo.goodsName",
          //销售额度
          total: {
            $sum: {
              $multiply: ["$goodsInfo.goodsPrice", "$goodsInfo.goodsCount"],
            },
          },
          //销售量
          totalCount: {
            $sum: "$goodsInfo.goodsCount",
          },
        },
      },
      {
        $project: {
          _id: 0,
          goodsName: "$_id",
          total: 1,
          totalCount: 1,
        },
      },
    ];
  },
  // 查询商品销售数据
  dailySales: (startTime, endTime) => {
    return [
      // 过滤数据
      {
        $project: {
          _id: 0,
          __v: 0,
          string: 0,
          orderState: 0,
          diningMethod: 0,
          staff: 0,
          staffId: 0,
          diningFoodTable: 0,
          diningFoodTableId: 0,
          customerName: 0,
          customerId: 0,
          mealsInfo: 0,
          updatedAt: 0,
        },
      },
      //对时间进行限制
      {
        $match: {
          createdAt: {
            $gte: startTime,
            $lte: endTime,
          },
        },
      },
      // 排序
      {
        $sort: {
          createdAt: -1,
        },
      },
      // 数据处理
      {
        $project: {
          day: {
            $dateToString: {
              format: "%m月%d日",
              date: "$createdAt",
            },
          },
          orderPrice: 1,
        },
      },
      // 数据分组
      {
        $group: {
          _id: "$day",
          totalPrice: {
            $sum: "$orderPrice",
          },
          totalCount: {
            $sum: 1,
          },
        },
      },
      // 修改_id的名称
      {
        $project: {
          _id: 0,
          day: "$_id",
          totalPrice: 1,
          totalCount: 1,
        },
      },
    ];
  },
};

module.exports = new DataAnalysis();
