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
        <el-input
          type="text"
          v-model="form.gt_name"
          placeholder="名称"
        ></el-input>
      </el-form-item>

      <editAttribute
        label="属性"
        :attributes="form.gt_attribute"
      ></editAttribute>

      <editAttribute
        label="规格"
        :attributes="form.gt_specifications"
      ></editAttribute>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认修改</el-button>
        <el-button @click="outSubmit">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import editAttribute from "./editAttribute.vue";
import {
  queryGoodsType,
  modifyGoodsType,
  addGoodsType
} from "@/api/goodsType.js";
export default {
  data() {
    return {
      rules: {
        gt_name: [
          { required: true, message: "请输入类型名称", trigger: "blur" }
        ]
      },
      // form表单
      form: {
        gt_name: "",
        gt_attribute: [],
        gt_specifications: []
      }
    };
  },
  components: { editAttribute },
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

  methods: {
    // 提交表单数据
    async onSubmit() {
      if (this.dialogState === "edit") {
        await this.modifyGoodsType();
      } else {
        await this.addGoodsType();
      }
      // 3.关闭弹窗
      this.outSubmit();
    },
    // 关闭弹窗
    outSubmit() {
      this.$emit("update:dialogFormVisible", false);
    },
    //修改数据
    async modifyGoodsType() {
      await modifyGoodsType(this.form);
      await this.$emit("queryGoodsType");
    },
    //添加数据
    async addGoodsType() {
      await addGoodsType(this.form);
      await this.$emit("queryGoodsType");
    },
    // 查询单个商品属性
    async queryGoodsType(id) {
      const result = await queryGoodsType(id);
      this.form = result.data;
    }
  },
  watch: {
    async dialogFormVisible(newValue) {
      if (newValue) {
        // 展开
        if (this.dialogState === "edit") {
          await this.queryGoodsType(this.id);
        } else {
          this.form = {
            gt_name: "",
            gt_attribute: [],
            gt_specifications: []
          };
        }
      } else {
        // 关闭
      }
    }
  }
};
</script>

<style scoped></style>
