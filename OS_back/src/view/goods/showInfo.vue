<template>
  <div>
    <MainHeader>
      <el-select
        v-model="goodsType"
        placeholder="添加商品"
        slot="left"
        size="mini"
      >
        <Router-link
          v-for="(item, index) in goodsTypeInfo"
          :key="index"
          :to="`goods/add/${item._id}`"
        >
          <el-option
            :label="item.gt_name"
            :value="item._id"
            @click="addGoods(item._id)"
          >
          </el-option>
        </Router-link>
      </el-select>
    </MainHeader>
    <!-- 表格 -->
    <el-table :data="goodsInfo" style="width: 100%" border>
      <el-table-column label="标题" prop="goodsName"></el-table-column>
      <el-table-column label="类型" prop="goodsType_id"></el-table-column>
      <!-- <el-table-column label="规格" prop="goodsType"></el-table-column> -->
      <el-table-column label="SKU" prop="_id"></el-table-column>
      <el-table-column
        label="价格"
        prop="goodsPrice"
        width="100"
      ></el-table-column>
      <el-table-column
        label="库存"
        prop="goodsStock"
        width="100"
      ></el-table-column>
      <el-table-column
        label="销量"
        prop="goodsSalesVolume"
        width="100"
      ></el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="{ row }">
          <span v-if="row.goodsState" class=" text-green-600">上架</span>
          <span v-else class=" text-red-600">下架</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ModifyGoods from "./components/modifyGoods.vue";
import { delGoods } from "@/api/goods";
export default {
  data() {
    return {
      goodsType: ""
    };
  },
  components: { ModifyGoods },
  methods: {
    // 编辑
    handleEdit(row) {
      //编辑按钮
      this.title = row.goodsName;
      this.dialogState = "edit";
      this.dialogFormVisible = true;
      this.id = row._id;
      this.$router.push(`/goods/add/${row.goodsType_id}/${row._id}`);
    },
    // 删除
    async handleDelete(row) {
      // 删除按钮
      try {
        await this.$confirm(`确定要删除${row.goodsName}商品吗`, {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          type: "warning"
        });
        await this.delGoods(row._id);
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
    async queryGoods() {
      this.$store.dispatch("queryGoods");
    },
    // 删除
    async delGoods(value) {
      await delGoods(value);
      await this.queryGoods();
    },
    // 添加
    addGoods(_id) {
      this.title = "添加商品";
      this.dialogState = "add";
      this.dialogFormVisible = true;
    }
  },
  computed: {
    goodsInfo() {
      return this.$store.state.goodsInfo;
    },
    goodsTypeInfo() {
      return this.$store.state.goodsTypeInfo;
    }
  },
  created() {
    this.$store.dispatch("queryGoods");
    this.$store.dispatch("queryGoodsType");
  }
};
</script>

<style scoped></style>
