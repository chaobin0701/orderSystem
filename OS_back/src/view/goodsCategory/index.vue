<template>
  <div class="goodsType">
    <MainHeader>
      <el-button size="mini" slot="left" @click="addGoodsCategory"
        >添加商品类型</el-button
      >
    </MainHeader>
    <!-- 表格 -->
    <el-table :data="goodsCategoryInfo" style="width: 100%" border>
      <el-table-column label="名称" prop="gc_name"></el-table-column>
      <el-table-column label="商品数量">
        <template slot-scope="{ row }">
          <el-tag>{{ row.goods_goodsCategory.length }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.gc_state">上架</el-tag>
          <el-tag v-else type="danger">下架</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope"
          ><el-button size="mini" type="primary" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗 -->
    <ModifyGoodsCategory
      :dialogFormVisible.sync="dialogFormVisible"
      :title="title"
      :dialogState="dialogState"
      :form="form"
    ></ModifyGoodsCategory>
  </div>
</template>

<script>
import ModifyGoodsCategory from "./components/modifyGoodsCategory.vue";
import { delGoodsCategory } from "@/api/goodsCategory.js";
export default {
  data: () => {
    return {
      dialogFormVisible: false, //控制弹窗的显示和隐藏
      title: "", //弹窗的标题
      dialogState: "edit", //弹窗的状态
      form: {
        gc_name: "",
        gc_state: true,
        goods_goodsCategory: []
      }
    };
  },
  components: { ModifyGoodsCategory },
  methods: {
    // 编辑
    handleEdit(row) {
      //编辑按钮
      this.title = row.gc_name;
      this.dialogState = "edit";
      this.dialogFormVisible = true;
      this.form = JSON.parse(JSON.stringify(row));
    },
    // 删除
    async handleDelete(row) {
      // 删除按钮
      try {
        await this.$confirm(`确定要删除${row.gc_name}类别吗`, {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          type: "warning"
        });

        await this.delGoodsCategory(row._id);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      } catch (error) {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      }
    },
    // 删除
    async delGoodsCategory(_id) {
      await delGoodsCategory(_id);
      this.$store.dispatch("queryGoodsCategory");
    },
    // 添加
    addGoodsCategory() {
      this.form = {
        gc_name: "",
        gc_state: true,
        goods_goodsCategory: []
      };
      this.title = "添加商品类别";
      this.dialogState = "add";
      this.dialogFormVisible = true;
    },
  },
  computed: {
    goodsCategoryInfo() {
      return this.$store.state.goodsCategoryInfo;
    }
  }
};
</script>

<style scoped></style>
