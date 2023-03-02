<template>
  <div class="modifyGoods">
    <h3>基本信息</h3>
    <div class="item">
      <el-form label-position="top" label-width="100px" :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <!-- <el-input v-model="form.goodsImgs"></el-input> -->
          <imgUpload></imgUpload>
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
          <el-select
            value=""
            placeholder="请选择"
            @change="selectGoodsCategory"
          >
            <el-option
              v-for="item in goodsCategoryInfo"
              :key="item._id"
              :label="item.gc_name"
              :value="item"
            >
            </el-option>
          </el-select>
          <el-tag
            v-for="(gc, index) in form.goodsCategory"
            :key="gc._id"
            class="mr-3"
            closable
            @close="removeGC(index)"
            >{{ gc.gc_name }}</el-tag
          >
        </el-form-item>
      </el-form>
    </div>
    <template v-if="goodsTypeInfo.gt_attribute">
      <h3>属性</h3>
      <div class="item">
        <el-form label-position="top" label-width="100px" :model="form">
          <el-form-item
            v-for="(item, index) in goodsTypeInfo.gt_attribute"
            :key="index"
            :label="item.title"
          >
            <el-input
              v-model="form.goodsType.gt_attribute[index].value"
              v-if="item.type === 'text'"
            ></el-input>
            <template v-else>
              <el-radio
                v-for="(x, i) in item.value"
                :key="i"
                v-model="form.goodsType.gt_attribute[index].value"
                :label="x"
                border
                >{{ x }}</el-radio
              >
            </template>
          </el-form-item>
        </el-form>
      </div>
    </template>

    <template v-if="goodsTypeInfo.gt_specifications">
      <h3>规格</h3>
      <div class="item">
        <el-form label-position="top" label-width="100px" :model="form">
          <el-form-item
            v-for="(item, index) in goodsTypeInfo.gt_specifications"
            :key="index"
            :label="item.title"
          >
            <el-input
              v-model="form.goodsType.gt_specifications[index].value"
              v-if="item.type === 'text'"
            ></el-input>
            <template v-else>
              <el-radio
                v-for="(x, i) in item.value"
                :key="i"
                v-model="form.goodsType.gt_specifications[index].value"
                :label="x"
                border
                >{{ x }}</el-radio
              >
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
        <el-form-item label="价格" class="inline-block">
          <el-input-number v-model="form.goodsPrice"></el-input-number>
        </el-form-item>
        <el-form-item label="库存" class="inline-block">
          <el-input-number v-model="form.goodsStock" :min="0"></el-input-number>
        </el-form-item>
      </el-form>
    </div>

    <div class="mb-5 mt-5">
      <Router-link to="/goods">
        <el-button> 取消 </el-button>
      </Router-link>
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </div>
  </div>
</template>

<script>
import { queryGoods, modifyGoods, addGoods } from "@/api/goods.js";
import { queryGoodsType } from "@/api/goodsType.js";
import imgUpload from "@/components/imgUpload.vue";
export default {
  components: { imgUpload },
  data() {
    return {
      rules: {}, //表单校验规则
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
        goodsType: {},
        goodsType_id: this.$route.params.goodsType_id,
      },
      goodsTypeInfo: {}, //商品类别数据
      goodsType_id: "",
      goods_id: "",
    };
  },
  methods: {
    // 提交表单数据
    async onSubmit() {
      let result = null;
      if (this.goodsType_id && this.goods_id) {
        result = await modifyGoods(this.form);
      } else {
        result = await addGoods(this.form);
      }
      await this.$store.dispatch("queryGoods");
      this.$router.push("/goods");
    },
    // 查询单个商品属性
    async queryGoods(id) {
      const result = await queryGoods(id);
      this.form = result.data;
    },
    // 查询商品类别信息
    async queryGoodsType(id) {
      const result = await queryGoodsType(id);
      // 处理form表单的goodsType
      const gt_attribute = result.data.gt_attribute.map((item) => {
        return { title: item.title, value: "" };
      });
      const gt_specifications = result.data.gt_specifications.map((item) => {
        return { title: item.title, value: "" };
      });
      this.form.goodsType = { gt_attribute, gt_specifications };
      this.goodsTypeInfo = result.data;
    },
    // 选中类别
    selectGoodsCategory(gc) {
      this.form.goodsCategory.push({
        gc_name: gc.gc_name,
        goodsCategory_id: gc._id,
        goods_id: this.goods_id,
      });
    },
    // 删除类别
    removeGC(index) {
      this.form.goodsCategory.splice(index, 1);
    },
  },
  async created() {
    let { goodsType_id, goods_id } = this.$route.params;
    this.goods_id = goods_id;
    this.goodsType_id = goodsType_id;

    if (goodsType_id) {
      await this.queryGoodsType(goodsType_id);
    }
    if (goods_id) {
      await this.queryGoods(goods_id);
    }
  },
  computed: {
    //商品类型数据
    goodsCategoryInfo() {
      // 排除以选择的类别
      return this.$store.state.goodsCategoryInfo.filter((item) => {
        let index = this.form.goodsCategory.findIndex((gc) => {
          return gc.goodsCategory_id === item._id;
        });
        return index;
      });
    },
  },
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
