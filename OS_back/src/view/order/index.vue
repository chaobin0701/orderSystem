<template>
  <div class="order">
    <!-- 表格 -->
    <el-table
      :data="orderInfo"
      style="width: 100%"
      border
      :default-sort="{ prop: 'time', order: 'descending' }"
    >
      <el-table-column label="订单号" width="200">
        <template slot-scope="{ row }">
          <div>
            <i class="el-icon-tickets"></i>
            <span style="margin-left: 5px">{{ row._id | strSlice }}</span>
            <span v-if="row._id.length > 12">...</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="下单时间" width="200" sortable prop="time">
        <template slot-scope="{ row }">
          <div>
            <i class="el-icon-time"></i>
            <span style="margin-left: 5px">{{
              moment(row.createdAt).format("YYYY.MM.DD HH:MM")
            }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="客户姓名" width="150">
        <template slot-scope="{ row }">
          <div>
            <el-tag size="medium">
              <i class="el-icon-user-solid"></i>
              {{ row.customerName }}
            </el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="用餐方式" width="150">
        <template slot-scope="{ row }">
          <div>
            <el-tag size="medium">
              <i class="el-icon-dish-1"></i>
              {{ row.diningMethod }}
            </el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="订单金额" width="160">
        <template slot-scope="{ row }">
          <div>
            <i class="el-icon-s-goods"></i>
            <span style="margin-left: 5px">{{ row.orderPrice }}￥</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="订单状态" width="150" sortable prop="O_state">
        <template slot-scope="{ row }">
          <div :style="{ color: `${changeColor(row.orderState).color}` }">
            <i class="el-icon-dish-1"></i>
            <span style="margin-left: 5px"
              >{{ changeColor(row.orderState).state }}
            </span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button
            size="mini"
            @click="$router.push(`/orderDetails?_id=${row._id}`)"
            >查看详情</el-button
          >
          <el-button size="mini" type="danger" @click="handleDelete(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="currentChange"
      background
      layout="prev, pager, next"
      :page-size="pageCount"
      :total="recordCount"
    >
    </el-pagination>
  </div>
</template>

<script>
import { queryOrder } from "@/api/order.js";
import moment from "moment";
export default {
  name: "order",
  data() {
    return {
      orderInfo: [], //订单信息
      moment, //处理时间的库
      recordCount: 0, //数据总条数
      currentPage: 0, //当前分页数
      pageCount: 12 //分页的条数
    };
  },
  methods: {
    async handleDelete(row) {
      // 删除按钮
      try {
        await this.$confirm(`确定要删除该订单吗`, {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          type: "warning"
        });
        // todo:删除
        console.log("todo:删除");
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.queryOrder();
      } catch (error) {
        this.$message({
          type: "info",
          message: "取消删除"
        });
      }
    },
    async queryOrder(currentPage, pageCount) {
      //获取订单数据
      let { data: res } = await queryOrder({ currentPage, pageCount });
      this.recordCount = res.recordCount;
      this.orderInfo = res.result;
    },
    currentChange(key) {
      // 分页 - 页码改变
      this.currentPage = (key - 1) * this.pageCount;
      console.log(this.currentPage, this.pageCount);
      this.queryOrder(this.currentPage, this.pageCount);
    },
    changeColor(color) {
      // 根据订单状态返回对应的颜色
      switch (color) {
        case "1":
          return {
            state: "待付款",
            color: "#F56C6C"
          };
        case "2":
          return {
            state: "待收货",
            color: "#E6A23C"
          };
        case "3":
          return {
            state: "待评价",
            color: "#409EFF"
          };
        case "4":
          return {
            state: "已完成",
            color: "#67C23A"
          };
        default:
          return {
            state: "未知",
            color: "#F56C6C"
          }
      }
    }
  },
  async created() {
    await this.queryOrder(this.currentPage, this.pageCount);
  },
  filters: {
    strSlice(value) {
      return value.slice(0, 12);
    }
  }
};
</script>

<style scoped>
.order {
  min-height: 800px;
}

.el-table {
  flex: 0;
}

a {
  color: #ccc;
}

.food-table {
  width: 1140px;
  background-color: rgb(123, 134, 146);
}

.el-icon-dish-1.eat {
  color: red;
}

.el-radio {
  margin-right: 0px;
}

.addFoodTable {
  display: block;
  margin: 10px auto 10px;
}
</style>
