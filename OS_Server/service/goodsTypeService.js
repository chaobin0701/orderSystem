const mongodb = require("../db/mongo");
const TABLENAME = "goodsType";
// const { customRandom, urlAlphabet } = require('nanoid')
const goodsService = require("./goodsService");
class GoodsTypeService {
  // 新增商品类型
  saveGoodsType = async (obj) => {
    obj.gt_attribute.forEach((item) => {
      item._id;
    });
    obj.gt_specifications.forEach((item) => {});
    let result = await mongodb.save(TABLENAME, obj);
    return result;
  };

  // 删除商品类型
  removeGoodsType = async (_id) => {
    let result = await mongodb.remove(TABLENAME, { _id });
    return result;
  };

  // 修改商品类型
  modifyGoodsType = async (_id, obj) => {
    let result = mongodb.update(TABLENAME, {}, obj);
    // 修改所有关联商品的类型
    let relevanceGoods = await goodsService.findGoodsByGoodsTypeId(_id);
    // 1.为每个属性和规格添加一个唯一id
    // 2.1当添加个更改的时候，利用原来的数据进行判断，删除掉的属性和规格对所有商品进行删除
    // 2.2添加了属性和规格对所有属性进行添加,如果值为输入框则默认为空，如果为选项则默认为第一个值
    // 2.3 对修改了属性名和类型名的商品进行修改
    // 2.4 如果规格或者属性的值被删除了，那就更改原来的值为第一个值

    return result;
  };

  // 查询所有商品类型
  findAllGoodsCategory = async () => {
    let result = mongodb.find(TABLENAME, {});
    return result;
  };
  // 根据id查询商品类型
  findGoodsCategoryById = async (_id) => {
    let result = await mongodb.findById(TABLENAME, _id);
    return result;
  };
}

module.exports = new GoodsTypeService();
