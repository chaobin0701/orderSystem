<template>
  <div class="goodsType">
    <MainHeader>
      <el-button size="mini" slot="left" @click="addGoodsType"
        >添加商品类型</el-button
      >
    </MainHeader>
    <!-- 表格 -->
    <el-table :data="goodsTypeInfo" style="width: 100%" border>
      <el-table-column
        label="名称"
        prop="gt_name"
        width="180"
      ></el-table-column>
      <el-table-column label="属性">
        <template slot-scope="{ row }">
          <el-tag class="mr-2" v-for="x in row.gt_attribute" :key="x.title">{{
            x.title
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="规格">
        <template slot-scope="{ row }">
          <el-tag
            class="mr-2"
            v-for="x in row.gt_specifications"
            :key="x.title"
            >{{ x.title }}</el-tag
          >
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="商品数量"
        prop="gt_count"
        width="150"
      ></el-table-column> -->
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
    <ModifyGoodsType
      :dialogFormVisible.sync="dialogFormVisible"
      @queryGoodsType="queryGoodsType"
      :title="title"
      :dialogState="dialogState"
      :id="id"
    ></ModifyGoodsType>
  </div>
</template>

<script>
import ModifyGoodsType from "./components/modifyGoodsType.vue";
import { delGoodsType } from "@/api/goodsType.js";
export default {
  data: () => {
    return {
      dialogFormVisible: false, //控制弹窗的显示和隐藏
      title: "", //弹窗的标题
      dialogState: "edit", //弹窗的状态
      id: "" // 当前编辑的单位
    };
  },
  components: { ModifyGoodsType },
  methods: {
    // 编辑
    handleEdit(row) {
      //编辑按钮
      this.title = row.gt_name;
      this.dialogState = "edit";
      this.dialogFormVisible = true;
      this.id = row._id;
    },
    // 删除
    async handleDelete(row) {
      // 删除按钮
      try {
        await this.$confirm(`确定要删除${row.gt_name}类型吗`, {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          type: "warning"
        });

        await this.delFoodTable(row._id);
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
    // 获取信息
    async queryGoodsType() {
      this.$store.dispatch("queryGoodsType");
    },
    // 删除
    async delFoodTable(value) {
      await delGoodsType(value);
      await this.queryGoodsType();
    },
    // 添加
    addGoodsType() {
      this.title = "添加商品类型";
      this.dialogState = "add";
      this.dialogFormVisible = true;
    }
  },
  computed: {
    goodsTypeInfo() {
      return this.$store.state.goodsTypeInfo;
    }
  }
};
</script>

<style scoped></style>
