<template>
  <div>
    <!-- 订单基本信息 -->
    <el-descriptions title="订单详情" :column="2" size="small" border>
      <template slot="extra">
        <el-button type="primary" size="small" @click="payHandle"
          >结算</el-button
        >
        <el-button type="primary" size="small" @click="$router.back()" plain
          >返回</el-button
        >
      </template>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-time"></i>
          下单时间
        </template>
        {{ moment(new Date()).format("MM月DD日 hh:mm") }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-coin"></i>
          订单金额
        </template>
        <el-tag type="danger" effect="plain">
          ￥ {{ this.totalAmount }}
        </el-tag>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-coin"></i>
          用餐方式
        </template>
        <el-tag>{{ this.form.diningMethod }}</el-tag>
      </el-descriptions-item>

      <template v-if="this.form.diningMethod == '堂食'">
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-information"></i>
            用餐餐桌
          </template>
          <el-tag>{{ this.form.diningFoodTable }}</el-tag>
        </el-descriptions-item>
      </template>
    </el-descriptions>

    <!-- 订单_点餐 -->
    <el-table
      :data="goodsCart"
      style="width: 100%"
      class="h-40 overflow-hidden"
    >
      <el-table-column label="菜品图片">
        <template slot-scope="{ row }">
          <img
            v-lazyload="row.goodsImgs[0] && row.goodsImgs[0].url"
            class="w-24 h-24"
          />
        </template>
      </el-table-column>
      <el-table-column label="菜名" prop="goodsName"></el-table-column>
      <el-table-column label="类别" prop="gt_name"></el-table-column>
      <el-table-column label="价格" prop="goodsPrice"></el-table-column>
      <el-table-column label="数量" prop="goodsCount"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { addOrder } from "@/api/order.js";
import moment from "moment";
export default {
  data() {
    return {
      form: {},
      moment,
    };
  },
  methods: {
    async payHandle() {
      this.form.goodsInfo = this.goodsCart;
      this.form.orderPrice = this.totalAmount;
      
      await addOrder(this.form);
      this.$message({
        type: "success",
        message: "下单成功!",
      });
      this.$store.dispatch("removeAll")
      this.$router.back();
    },
  },
  computed: {
    // 购物车中的商品
    goodsCart() {
      return this.$store.getters.goodsCart;
    },
    totalAmount() {
      // 商品总金额
      return this.$store.getters.totalAmount;
    },
  },
  created() {
    this.form.customerId = "admin";
    this.form.customerName = "管理员";
    // 传递的信息处理
    this.form.diningMethod = this.$route.query.diningMethod;
    if (this.$route.query.diningMethod == "堂食") {
      this.form.diningFoodTable = this.$route.query.diningFoodTable;
    }
  },
};
</script>

<style scoped></style>
