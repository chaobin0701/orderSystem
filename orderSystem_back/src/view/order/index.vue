<template>
    <div class="order">
        <!-- 表格 -->
        <el-table :data="orderInfo" style="width: 100%" border :default-sort="{ prop: 'time', order: 'descending' }">
            <el-table-column label="订单号" width="200">
                <template slot-scope="{row}">
                    <div>
                        <i class="el-icon-tickets"></i>
                        <span style="margin-left: 5px">{{
                                row._id | strSlice
                        }}</span>
                        <span v-if="row._id.length > 12">...</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="下单时间" width="200" sortable prop="time">
                <template slot-scope="{row}">
                    <div>
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 5px">{{
                                moment(row.createdAt).format('YYYY.MM.DD HH:MM')
                        }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="客户姓名" width="150">
                <template slot-scope="{row}">
                    <div>
                        <el-tag size="medium">
                            <i class="el-icon-user-solid"></i>
                            {{ row.customerName }}
                        </el-tag>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="用餐方式" width="150">
                <template slot-scope="{row}">
                    <div>
                        <el-tag size="medium">
                            <i class="el-icon-dish-1"></i>
                            {{ row.diningMethod }}
                        </el-tag>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="服务员" width="150">
                <template slot-scope="{row}">
                    <div>
                        <el-tag size="medium">{{ row.staff }}</el-tag>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="订单金额" width="160">
                <template slot-scope="{row}">
                    <div>
                        <i class="el-icon-s-goods"></i>
                        <span style="margin-left: 5px">{{
                                row.orderPrice
                        }}￥</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="订单状态" width="150" sortable prop="O_state">
                <template slot-scope="{row}">
                    <div :style="{ color: `${changeColor(row.orderState)}` }">
                        <i class="el-icon-dish-1"></i>
                        <span style="margin-left: 5px">{{ row.orderState }}
                        </span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="{row}">
                    <el-button size="mini" @click="handleEdit(row)">编辑
                    </el-button>
                    <!-- <el-button size="mini" type="danger" @click="handleDelete(row)">删除</el-button> -->
                    <el-button size="mini" @click="$router.push(`/orderDetails?_id=${row._id}`)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination @current-change="currentChange" background layout="prev, pager, next" :page-size="pageCount"
            :total="recordCount">
        </el-pagination>
        <!-- 弹窗 -->
        <ModifyOrder :dialogFormVisible.sync="dialogFormVisible" :form="form"
            :diningFoodTable.sync="form.diningFoodTable" :staff.sync="form.staff" @queryOrder="queryOrder" />
    </div>
</template>

<script>
import ModifyOrder from './components/modifyOrder.vue'
import { queryOrder} from '@/api/order.js'
import moment from "moment"
export default {
    name: "order",
    components: { ModifyOrder },
    data() {
        return {
            dialogFormVisible: false,
            orderInfo: [], //订单信息
            moment, //处理时间的库
            recordCount: 0,//数据总条数
            currentPage: 0, //当前分页数
            pageCount: 12,//分页的条数
            form: { //订单对象
                _id: "", //订单id
                orderPrice: 0, //订单价格
                orderState: "已完成", //订单状态
                diningMethod: "堂食",//用餐方式
                staff: "",//服务员工
                diningFoodTable: "",//用餐餐桌
                customerName: "",//顾客名称
                customerId: "",//顾客id
                orderAppraise: { //订单评价
                    score: 8, //订单分数
                    apprise: "不错"//订单评论
                },
                mealsInfo: [
                    {
                        melas_id: "",//菜品id
                        melas_name: "",//菜品名称
                        melas_category: "",//菜品类别
                        melas_price: "",//菜品价格
                        melas_describe: "",//菜品描述
                        melas_count: "",//菜品库存
                        melas_image: "",//菜品图片地址
                    }
                ]
            }
        };
    },
    methods: {
        handleEdit(row) {// 编辑按钮
            this.dialogFormVisible = true
            this.form = { ...row }
        },
        async handleDelete(row) {// 删除按钮
            try {
                await this.$confirm(`确定要删除该订单吗`, {
                    cancelButtonText: "取消",
                    confirmButtonText: "确定",
                    type: "warning",
                })
                // todo:删除
                console.log("todo:删除")
                this.$message({
                    type: "success",
                    message: "删除成功!",
                })
                this.queryOrder()
            } catch (error) {
                this.$message({
                    type: "info",
                    message: "取消删除",
                });
            }
        },
        async update(row) { //修改数据
            await updateOrder(row)
            await this.queryOrder()
        },
        async queryOrder(currentPage,pageCount) { //获取订单数据
            let {data:res} = await queryOrder({currentPage,pageCount})            
            this.recordCount = res.recordCount
            this.orderInfo = res.result
        },
        currentChange(key) { // 分页 - 页码改变
            this.currentPage = (key - 1) * this.pageCount
            console.log(this.currentPage,this.pageCount)
            this.queryOrder(this.currentPage,this.pageCount)
        },
        changeColor(color) { // 根据订单状态返回对应的颜色
            switch (color) {
                case '待付款':
                    return '#F56C6C'
                case '待收货':
                    return '#E6A23C'
                case '待评价':
                    return '#409EFF'
                case '已完成':
                    return '#67C23A'
            }
        }
    },
    async created() {
        await this.queryOrder(this.currentPage,this.pageCount)
    },
    filters: {
        strSlice(value) {
            return value.slice(0, 12)
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