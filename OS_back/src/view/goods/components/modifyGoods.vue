<template>
  <el-dialog
    :title="title"
    :visible="dialogFormVisible"
    @close="outSubmit"
    width="40%"
  >
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认修改</el-button>
        <el-button @click="outSubmit">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { queryGoods, modifyGoods, addGoods } from "@/api/goods.js";
import { queryGoodsType } from "@/api/goodsType.js";
export default {
  data() {
    return {
      rules: {},
      inputVisible: false,
      form: {},
      goodsTypeInfo: {}
    };
  },

  props: {
    title: {
      default: "默认标题",
      type: String
    },
    dialogState: {
      Type: String
    },
    dialogFormVisible: {
      type: Boolean
    },
    id: {
      type: String
    }
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

<style scoped></style>
