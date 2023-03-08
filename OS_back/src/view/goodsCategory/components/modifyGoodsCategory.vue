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
          <el-tag
            class="mr-2"
            v-for="item in form.goods_goodsCategory"
            :key="item._id"
            closable
            @close="delRelevance"
          >
            {{ computedGC(item.goods_id) }}
          </el-tag>
        </div>
        <div>
          <el-select
            placeholder="请选择"
            v-model="goods"
            @change="addRelevance"
          >
            <el-option
              v-for="item in goodsInfo"
              :key="item._id"
              :label="item.goodsName"
              :value="item"
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
    form: {
      type: Object
    }
  },
  methods: {
    async onSubmit() {
      if (this.dialogState === "edit") {
        await modifyGoodsCategory(this.form);
      } else {
        await addGoodsCategory(this.form);
      }
      await this.$store.dispatch("queryGoodsCategory");
      // 3.关闭弹窗
      this.outSubmit();
    },
    outSubmit() {
      // 1.关闭弹窗
      this.$emit("update:dialogFormVisible", false);
    },
    // 删除关联
    delRelevance(index) {
      this.form.goods_goodsCategory.splice(index, 1);
    },
    // 添加关联
    addRelevance(goods) {
      this.form.goods_goodsCategory.push({
        goods_id: goods._id,
        goodsCategory_id: this.form._id
      });
    },
    computedGC(id) {
      let goods = this.$store.state.goodsInfo.find(item => {
        return item._id === id;
      });
      return goods.goodsName;
    }
  },
  computed: {
    //可选择的商品数据
    goodsInfo() {
      // 排除以选择的商品
      return this.$store.state.goodsInfo.filter(item => {
        let index = this.form.goods_goodsCategory.findIndex(goods => {
          return goods.goods_id === item._id;
        });
        return index < 0;
      });
    }
  }
};
</script>

<style scoped></style>
