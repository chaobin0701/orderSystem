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
      <el-form-item label="属性">
        <div
          v-for="(item, index) in form.gt_attribute"
          :key="item.gt_name"
          class="flex justify-between mb-3 flex-col"
        >
          <!-- 属性名和类型 -->
          <div class="flex space-x-3 mb-1">
            <el-input
              type="text"
              placeholder="名称"
              v-model="item.title"
              class="w-2/3"
            ></el-input>
            <el-select v-model="item.type" placeholder="请选择">
              <el-option label="文本" value="text"> </el-option>
              <el-option label="选项" value="option"> </el-option>
            </el-select>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="delAttribute(form.gt_attribute, index)"
            ></el-button>
          </div>
          <!-- 如果是选项,就选择选项 -->
          <div v-if="item.type === 'option'">
            <el-tag
              :key="tag"
              v-for="(tag, i) in item.value"
              closable
              :disable-transitions="false"
              @close="delAttributeItem(item.value, i)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="item.text"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="addAttributeItem(item.value, item.text)"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
              >+ New Tag</el-button
            >
          </div>
        </div>
        <!-- 添加更多商品属性 -->
        <el-button
          icon="el-icon-plus"
          circle
          class="m-2"
          @click="addAttribute(form.gt_attribute)"
        >
        </el-button>
      </el-form-item>

      <el-form-item label="规格">
        <div
          v-for="(item, index) in form.gt_specifications"
          :key="item.gt_title"
          class="flex justify-between mb-3 flex-col"
        >
          <!-- 属性名和类型 -->
          <div class="flex space-x-3 mb-1">
            <el-input
              type="text"
              placeholder="名称"
              v-model="item.title"
              class="w-2/3"
            ></el-input>
            <el-select v-model="item.type" placeholder="请选择">
              <el-option label="文本" value="text"> </el-option>
              <el-option label="选项" value="option"> </el-option>
            </el-select>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="delAttribute(form.gt_specifications, index)"
            ></el-button>
          </div>
          <!-- 如果是选项,就选择选项 -->
          <div v-if="item.type === 'option'">
            <el-tag
              :key="tag"
              v-for="(tag, i) in item.value"
              closable
              :disable-transitions="false"
              @close="delAttributeItem(item.value, i)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="item.text"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="addAttributeItem(item.value, item.text)"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
              >+ New Tag</el-button
            >
          </div>
        </div>
        <!-- 添加更多商品属性 -->
        <el-button
          icon="el-icon-plus"
          circle
          class="m-2"
          @click="addAttribute(form.gt_specifications)"
        >
        </el-button>
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
      inputVisible: false,
      // form表单
      form: {
        gt_name: "",
        gt_attribute: [],
        gt_specifications: []
      }
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
  },
  methods: {
    async onSubmit() {
      // 1.提交表单数据，进行数据更改
      // 2.重新获取数据
      if (this.dialogState === "edit") {
        await this.modifyGoodsType();
      } else {
        await this.addGoodsType();
      }
      // 3.关闭弹窗
      this.outSubmit();
    },
    outSubmit() {
      // 1.关闭弹窗
      this.$emit("update:dialogFormVisible", false);
    },
    async modifyGoodsType() {
      //修改数据
      await modifyGoodsType(this.form);
      await this.$emit("queryGoodsType");
    },
    // 添加商品类别
    async addGoodsType() {
      await addGoodsType(this.form);
      await this.$emit("queryGoodsType");
    },
    // 删除商品属性\规格
    delAttribute(obj, index) {
      obj.splice(index, 1);
    },
    // 添加商品属性\规格
    addAttribute(obj) {
      obj.push({ title: "", type: "text", value: [] });
    },
    // 添加商品属性的属性
    addAttributeItem(obj, text) {
      obj.push(text);
      obj.text = "";
      this.inputVisible = false;
    },
    // 删除商品属性的属性
    delAttributeItem(obj, i) {
      obj.splice(i, 1);
    },
    showInput() {
      this.inputVisible = true;
    },
    // 查询单个商品属性
    async queryGoodsType(id) {
      const result = await queryGoodsType(id);
      this.form = result.data;
    }
  }
};
</script>

<style scoped></style>
