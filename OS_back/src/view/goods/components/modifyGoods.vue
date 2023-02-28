<template>
  <div class="modifyGoods">
    <h3>基本信息</h3>
    <div class="item">
      <el-form label-position="top" label-width="100px" :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-input v-model="form.goodsImgs"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.goodsDescribe" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="上架">
          <el-switch
            v-model="form.goodsState"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="form.value" placeholder="请选择">
            <el-option
              v-for="item in goodsCategoryInfo"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template v-if="goodsTypeInfo.gt_attribute">
      <h3>属性</h3>
      <div class="item">
        <el-form label-position="top" label-width="100px" :model="form">
          <el-form-item v-for="(item,index) in goodsTypeInfo.gt_attribute" :key="index" :label="item.title">
            <el-input v-model="form[item.title]"  v-if="item.type === 'text'"></el-input>
            <template v-else>
              <el-radio v-for="(x,i) in item.value" :key="i" v-model="form[item.title]" :label="x" border>{{ x}}</el-radio>           
            </template>
          </el-form-item>
        </el-form>
      </div>
    </template>

    <template v-if="goodsTypeInfo.gt_specifications">
      <h3>规格</h3>
      <div class="item">
        <el-form label-position="top" label-width="100px" :model="form">
          <el-form-item v-for="(item,index) in goodsTypeInfo.gt_specifications" :key="index" :label="item.title">
            <el-input v-model="form[item.title]"  v-if="item.type === 'text'"></el-input>
            <template v-else>
              <el-radio v-for="(x,i) in item.value" :key="i" v-model="form[item.title]" :label="x" border>{{ x}}</el-radio>           
            </template>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <h3>售卖信息</h3>
    <div class="item">
      <el-form
        label-position="top"
        label-width="100px"
        :model="form"
        class="space-x-5"
      >
        <el-form-item label="价格" class=" inline-block">
          <el-input-number
            v-model="form.goodsPrice"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="库存" class=" inline-block">
          <el-input-number
            v-model="form.goodsStock"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { queryGoods, modifyGoods, addGoods } from "@/api/goods.js";
import { queryGoodsType } from "@/api/goodsType.js";
export default {
  data() {
    return {
      rules: {},
      inputVisible: false,
      form: {
        goodsName: "",
        goodsState: true,
        goodsPrice: 0,
        goodsStock: 10,
        goodsSalesVolume: 0,
        goodsDescribe: "",
        goodsImgs: "",
        goodsCategory: [],
        goodsType: []
      },
      goodsTypeInfo: {},
      goodsCategoryInfo: []
    };
  },
  watch: {
    async dialogFormVisible(newValue) {
      if (newValue) {
        // 展开
        if (this.dialogState === "edit") {
          await this.queryGoods(this.id);
        } else {
          // TOOD
          this.form = {};
        }
      } else {
        // 关闭
      }
    }
  },
  methods: {
    async onSubmit() {
      // 1.提交表单数据，进行数据更改
      // 2.重新获取数据
      if (this.dialogState === "edit") {
        await this.modifyGoods();
      } else {
        await this.addGoods();
      }
      // 3.关闭弹窗
      this.outSubmit();
    },
    outSubmit() {
      // 1.关闭弹窗
      this.$emit("update:dialogFormVisible", false);
    },
    async modifyGoods() {
      //修改数据
      await modifyGoods(this.form);
      await this.$emit("queryGoods");
    },
    // 添加商品类别
    async addGoods() {
      await addGoods(this.form);
      await this.$emit("queryGoods");
    },
    // 查询单个商品属性
    async queryGoods(id) {
      const result = await queryGoods(id);
      this.form = result.data;
    },
    async queryGoodsType(id) {
      const result = await queryGoodsType(id);
      console.log(`output-> result.data`, result.data);
      this.goodsTypeInfo = result.data;
    }
  },
  async created() {
    let { goodsType, _id } = this.$route.params;
    if (goodsType) {
      await this.queryGoodsType(goodsType);
    }
    if (_id) {
      await this.queryGoods(_id);
    }
  }
};
</script>

<style scoped>
.modifyGoods h3 {
  @apply mb-3 mt-3 font-bold text-base;
}
.modifyGoods .item {
  @apply bg-white pt-5 pb-5 pr-10 pl-10 rounded-2xl;
}
</style>
