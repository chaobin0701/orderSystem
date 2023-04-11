<template>
  <div class="modifyGoods">
    <h3>基本信息</h3>
    <div class="item">
      <el-form label-position="top" label-width="100px" :model="form">
        <el-form-item label="商品名称">
          <el-input v-model="form.goodsName"></el-input>
        </el-form-item>

        <el-form-item label="图片">
          <el-upload
            action="http://127.0.0.1:3280/api/file/upload"
            multiple
            :limit="3"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :file-list="form.goodsImgs"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
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
            >{{ computedGoodsCategory(gc.goodsCategory_id) }}</el-tag
          >
        </el-form-item>
      </el-form>
    </div>
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
import { queryGoodsCategory } from "@/api/goodsCategory.js";
export default {
  data() {
    return {
      rules: {}, //表单校验规则
      inputVisible: false,
      goods_id: "",
      form: {
        goodsName: "",
        goodsState: true,
        goodsPrice: 0,
        goodsStock: 10,
        goodsSalesVolume: 0,
        goodsDescribe: "",
        goodsImgs: [],
        goodsCategory: [],
      },
      goods_id: "",
    };
  },
  methods: {
    // 提交表单数据
    async onSubmit() {
      let result = null;
      if (this.$route.params.model === "add") {
        result = await addGoods(this.form);
      } else if (this.$route.params.model === "edit") {
        result = await modifyGoods(this.form);
      }
      await this.$store.dispatch("queryGoods");
      this.$router.push("/goods");
    },
    // 查询单个商品属性
    async queryGoods(id) {
      const result = await queryGoods(id);
      this.form = result.data[0];
    },
    // 选中类别
    selectGoodsCategory(gc) {
      this.form.goodsCategory.push({
        gc_name: gc.gc_name,
        goodsCategory_id: gc._id,
        goods_id: this.goods_id,
      });
    },
    // 计算类型的名称
    computedGoodsCategory(id) {
      let goodsCategory = this.$store.state.goodsCategoryInfo.find((item) => {
        return item._id === id;
      });
      return goodsCategory.gc_name;
    },
    // 删除类别
    removeGC(index) {
      this.form.goodsCategory.splice(index, 1);
    },
    handleSuccess(file) {
      this.form.goodsImgs.push({ name: file.file_name, url: file.url });
    },
    handleRemove(file, fileList) {
      this.form.goodsImgs = fileList;
    },
  },
  async created() {
    this.goods_id = this.$route.params.id;
    if (this.$route.params.model === "add") {
      let result = await queryGoodsCategory(this.$route.params.id);
      this.selectGoodsCategory(result.data[0]);
    } else if (this.$route.params.model === "edit") {
      await this.queryGoods(this.$route.params.id);
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
.modifyGoods {
  background: #f5f5f5;
}
.modifyGoods h3 {
  @apply mb-3 mt-3 font-bold text-base;
}
.modifyGoods .item {
  @apply bg-white pt-5 pb-5 pr-10 pl-10 rounded-2xl;
  height: auto;
}
</style>
