<template>
  <!-- 订单详情 -->
  <div class="orderDetails">
    <!-- 订单基本信息 -->
    <el-descriptions title="订单详情" :column="3" size="small" border>
      <template slot="extra">
        <el-button type="primary" size="small" @click="$router.back()"
          >返回</el-button
        >
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          订单编号
        </template>
        {{ orderInfo._id }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-time"></i>
          下单时间
        </template>
        {{ moment(orderInfo.createdAt).format("YYYY年MM月DD号 HH:MM:SS") }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-s-custom"></i>
          顾客名称
        </template>
        {{ orderInfo.customerName }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-s-claim"></i>
          订单状态
        </template>
        <el-tag size="small">{{
          changeColor(orderInfo.orderState) &&
          changeColor(orderInfo.orderState).state
        }}</el-tag>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-coin"></i>
          订单金额
        </template>
        <el-tag type="danger" effect="plain">
          ￥ {{ orderInfo.orderPrice }}
        </el-tag>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-information"></i>
          用餐方式
        </template>
        <el-tag>{{ orderInfo.diningMethod }}</el-tag>
      </el-descriptions-item>
      <template v-if="orderInfo.orderState == 4">
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-trophy"></i>
            订单评分
          </template>
          {{ orderInfo.orderAppraise.score }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-chat-dot-round"></i>
            订单评价
          </template>
          {{ orderInfo.orderAppraise.appraise }}
        </el-descriptions-item>
      </template>
    </el-descriptions>
    <!-- 订单_点餐 -->
    <el-table :data="orderInfo.goodsInfo" border style="width: 100%">
      <el-table-column label="菜品图片">
        <template slot-scope="{ row }">
          <el-image
            style="width: 85px; height: 85px"
            :src="row.goodsImgs[0].url"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="菜名" prop="goodsName"></el-table-column>
      <el-table-column label="类别">
        <template slot-scope="{ row }">
          <el-tag class="mr-3 mb-3">{{ row.goodsCategory.gc_name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="价格" prop="goodsPrice"></el-table-column>
      <el-table-column label="数量" prop="goodsCount"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { queryOrderById } from "@/api/order.js";
import moment from "moment";

export default {
  data() {
    return {
      orderInfo: {}, //订单信息
      moment, //处理时间的库
    };
  },
  methods: {
    async queryOrderById(_id) {
      let { data } = await queryOrderById(_id);
      return data;
    },
    changeColor(color) {
      // 根据订单状态返回对应的颜色
      switch (color) {
        case "1":
          return {
            state: "待付款",
            color: "#F56C6C",
          };
        case "2":
          return {
            state: "待收货",
            color: "#E6A23C",
          };
        case "3":
          return {
            state: "待评价",
            color: "#409EFF",
          };
        case "4":
          return {
            state: "已完成",
            color: "#67C23A",
          };
      }
    },
  },
  async created() {
    let _id = this.$router.history.current.query._id;
    // 通过_id查询订单信息
    this.orderInfo = await this.queryOrderById(_id);
  },
};
</script>

<style></style>
