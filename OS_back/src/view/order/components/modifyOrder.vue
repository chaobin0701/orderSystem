<template>
  <el-dialog :title="title" :visible="dialogFormVisible" @close="outSubmit">
    <!-- 表单 -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="订单号">
        <el-input v-model="form._id" :disabled="true" />
      </el-form-item>
      <el-form-item label="下单时间">
        <el-input :value="moment(form.createdAt).format('YYYY-MM-DD HH:MM')" :disabled="true" />
      </el-form-item>
      <el-form-item label="客户姓名">
        <el-input v-model="form.customerName" :disabled="true" />
      </el-form-item>
      <el-form-item label="用餐方式">
        <el-select v-model="form.diningMethod" size='mini'>
          <el-option v-for="item in diningMethods" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用餐餐桌">
        <el-select v-model="form.diningFoodTableId" size='mini' @change="selectFoodtableHandler">
          <el-option v-for="item in foodtableInfo" :key="item.foodtable_id" :label="item.foodtable_describe"
            :value="item.foodtable_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务员">
        <el-select v-model="form.staffId" size='mini' @change="selectStaffHandler">
          <el-option v-for="item in staffInfo" :key="item.staff_id" :label="item.staff_name" :value="item.staff_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格/元">
        <el-input v-model="form.orderPrice" :disabled="true" />
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="form.orderState" size='mini'>
          <el-option v-for="item in state" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认修改</el-button>
        <el-button @click="outSubmit">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { modifyOrder } from '@/api/order.js'
import moment from "moment"
export default {
  props: {
    title: {
      default: "修改订单",
      type: String
    },
    dialogFormVisible: {
      type: Boolean
    },
    form: {
      type: Object
    }
  },
  data() {
    return {
      moment,//处理时间的库
      state: ["提交订单", "已支付", "已完成", "已评价"],
      diningMethods: ["堂食", "打包"]
    }
  },
  methods: {
    async onSubmit() {
      // 1.提交表单数据，进行数据更改
      // 2.重新获取数据
      await this.modifyOrder()
      // 3.关闭弹窗
      this.$emit('update:dialogFormVisible', false)
    },
    outSubmit() {
      // 1.关闭弹窗
      this.$emit('update:dialogFormVisible', false)
    },
    async modifyOrder() { //修改数据
      await modifyOrder(this.form)
      await this.$emit("queryOrder")
    },
    selectFoodtableHandler(foodtable_id) { //选择餐桌的回调
      this.$emit("update:diningFoodTable", this.foodtableInfo.filter(item => item.foodtable_id === foodtable_id)[0].foodtable_describe)
    },
    selectStaffHandler(staff_id) { //选择服务员工的回调
      this.$emit("update:staff", this.staffInfo.filter(item => item.staff_id === staff_id)[0].staff_name)
    }
  },
  computed: {
    staffInfo() {
      return this.$store.state.staffInfo
    },
    foodtableInfo() {
      return this.$store.state.foodtableInfo
    }
  }
}
</script>
<style scoped>

</style>