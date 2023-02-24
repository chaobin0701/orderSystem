<template>
    <!-- 订单详情 -->
    <div class="orderDetails">
        <!-- 订单基本信息 -->
        <el-descriptions title="订单详情" :column="3" size="small" border>
            <template slot="extra">
                <el-button type="primary" size="small" @click="$router.back()">返回</el-button>
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
                {{ moment(orderInfo.createdAt).format('YYYY年MM月DD号 HH:MM:SS') }}
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
                <el-tag size="small">{{ orderInfo.orderState }}</el-tag>
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
                    用餐餐桌
                </template>
                <el-tag>{{ orderInfo.diningFoodTable }}</el-tag>
            </el-descriptions-item>

            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-s-custom"></i>
                    服务员工
                </template>
                <el-tag> {{ orderInfo.staff }}</el-tag>
            </el-descriptions-item>
        </el-descriptions>
        <!-- 订单_点餐 -->
        <el-table :data="orderInfo.mealsInfo" border style="width: 100%">
            <el-table-column label="菜品图片">
                <template slot-scope="{row}">
                    <el-image style="width: 85px; height: 85px" :src="row.meals_image"></el-image>
                </template>
            </el-table-column>
            <el-table-column label="菜名" prop="meals_name"></el-table-column>
            <el-table-column label="类别" prop="meals_category"></el-table-column>
            <el-table-column label="价格" prop="meals_price"></el-table-column>
            <el-table-column label="数量" prop="meals_count"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import { queryOrderById } from '@/api/order.js'
import moment from "moment"

export default {
    data() {
        return {
            orderInfo: {}, //订单信息
            moment, //处理时间的库
        }
    },
    methods: {
        async queryOrderById(_id) {
            let { result } = await queryOrderById(_id)
            return result
        }
    },
    async created() {
        let _id = this.$router.history.current.query._id
        // 通过_id查询订单信息
        this.orderInfo = await this.queryOrderById(_id)
    }
}
</script>

<style>
.el-descriptions__header {
    align-items: center;
    box-sizing: border-box;
    padding: 0 15px;
    margin: 0;
    height: 50px;
    border-right: 1px solid #EBEEF5;
    border-left: 1px solid #EBEEF5;

}

.pagination-box {
    display: flex;
    justify-content: center;
    margin: 10px 0;
}

.el-descriptions {
    border-radius: 20px;
    box-sizing: border-box;
    padding: 20px;
    box-shadow: 3px 3px 10px rgb(220 220 220 / 20%);
    transition: all .5s;
    background: #fff;
    margin: 15px 0;
}
</style>