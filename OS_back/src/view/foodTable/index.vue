<template>
    <div class="foodTable">
        <MainHeader>
            <el-button size="mini" slot="left" @click="addFoodTable">添加新餐桌</el-button>
        </MainHeader>
        <!-- 表格 -->
        <el-table :data="foodtableInfo" style="width: 100%" border>
            <el-table-column label="餐桌位置" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-location-outline"></i>
                    <span style="margin-left: 5px">{{ scope.row.foodtable_position }}</span>
                </template>
            </el-table-column>

            <el-table-column label="用餐人数" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-user-solid"></i>
                    <span style="margin-left: 5px">{{ scope.row.foodtable_number }}</span>
                </template>
            </el-table-column>

            <el-table-column label="餐桌状态" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-dish-1" :class="scope.row.foodtable_state == '有人' ? 'eat' : ''"></i>
                    <span style="margin-left: 5px">{{ scope.row.foodtable_state }}</span>
                </template>
            </el-table-column>

            <el-table-column label="">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <ModifyFoodTable :dialogFormVisible.sync="dialogFormVisible" :form="form" @queryFoodTable="queryFoodTable"
            :title="title" :dialogState="dialogState" />
    </div>
</template>

<script>
import {delFoodTable } from '@/api/foodTable'
import ModifyFoodTable from './components/modifyFoodTable.vue'
export default {
    components: { ModifyFoodTable },
    data() {
        return {
            dialogFormVisible: false, //控制弹窗的显示和隐藏
            title: "", //弹窗的标题
            dialogState: 'edit',//弹窗的状态
            // form表单
            form: {
                foodtable_number: '',
                foodtable_position: '',
                foodtable_state: '',
            },
            msg: [],
        };
    },
    methods: {
        handleEdit(row) { //编辑按钮
            this.title = "修改餐桌信息"
            this.dialogState = "edit"
            this.dialogFormVisible = true
            this.form = {...row};

        },
        async handleDelete(row) {// 删除按钮
            try {
                await this.$confirm(`确定要删除${row.foodtable_position}餐桌吗`, {
                    cancelButtonText: "取消",
                    confirmButtonText: "确定",
                    type: "warning",
                })
                await this.delFoodTable(row.foodtable_id)
                this.$message({
                    type: "success",
                    message: "删除成功!",
                });

            } catch (error) {
                this.$message({
                    type: "info",
                    message: "已取消删除",
                });
            }
        },
        async queryFoodTable() { // 获取餐桌数据
            this.$store.dispatch("queryFoodTable")
        },
        async delFoodTable(value) { // 删除数据
            await delFoodTable(value)
            await this.queryFoodTable()
        },
        addFoodTable() {
            this.title = "添加新餐桌"
            this.dialogState = "add"
            // 1.生成新的from表单内容
            this.form = {
                foodtable_number: 5,
                foodtable_position: '几楼几桌',
                foodtable_state: '空',
            }
            this.dialogFormVisible = true
        }
    },
    computed:{
        foodtableInfo(){
            return this.$store.state.foodtableInfo
        }
    }
};
</script>

<style scoped>
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