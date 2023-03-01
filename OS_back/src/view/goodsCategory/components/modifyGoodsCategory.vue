<template>
  <el-dialog
    :title="title"
    :visible="dialogFormVisible"
    @close="outSubmit"
    width="40%"
  >
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      :rules="rules"
      label-position="right"
    >
      <el-form-item label="名称">
        <el-input v-model="form.gc_name"></el-input>
      </el-form-item>
      <el-form-item label="关联商品">
        <div>
          <el-tag v-for="item in form.goods" :key="item._id">
            {{ item.goodsName }}
          </el-tag>
        </div>
        <div>
          <el-select placeholder="请选择" v-model="goods">
            <el-option
              v-for="item in goodsInfo"
              :key="item._id"
              :label="item.goodsName"
              :value="item._id"
            >
            </el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch
          v-model="form.gc_state"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认修改</el-button>
        <el-button @click="outSubmit">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  queryGoodsCategory,
  modifyGoodsCategory,
  addGoodsCategory
} from "@/api/goodsCategory.js";
export default {
  data() {
    return {
      rules: {
        gc_name: [
          { required: true, message: "请输入类型名称", trigger: "blur" }
        ]
      },
      inputVisible: false,
      // form表单
      form: {
        gc_name: "",
        gc_state: true,
        goods: []
      },
      goods: ""
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
          await this.queryGoodsCategory(this.id);
        } else {
          this.form = {
            gc_name: "",
            gc_state: true,
            goods: []
          };
        }
      } else {
        // 关闭
      }
    }
  },
  methods: {
    async onSubmit() {
      if (this.dialogState === "edit") {
        await this.modifyGoodsCategory();
      } else {
        await this.addGoodsCategory();
      }
      // 3.关闭弹窗
      this.outSubmit();
    },
    outSubmit() {
      // 1.关闭弹窗
      this.$emit("update:dialogFormVisible", false);
    },
    async modifyGoodsCategory() {
      //修改数据
      await modifyGoodsCategory(this.form);
      await this.$emit("queryGoodsCategory");
    },
    async addGoodsCategory() {
      await addGoodsCategory(this.form);
      await this.$emit("queryGoodsCategory");
    },
    // 查询单个商品属性
    async queryGoodsCategory(id) {
      const result = await queryGoodsCategory(id);
      this.form = result.data;
    }
  },
  computed: {
    goodsInfo() {
      return this.$store.state.goodsInfo;
    }
  }
};
</script>

<style scoped></style>
