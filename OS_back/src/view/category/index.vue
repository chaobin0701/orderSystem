<template>
    <div class="category">
        <MainHeader>
            <el-button size="mini" slot="left" @click="addCategory">添加新分类</el-button>
        </MainHeader>
        <!-- 表格 -->
        <el-table :data="staffInfo" style="width: 100%" border>
            <el-table-column label="分类名称" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-location-outline"></i>
                    <span style="margin-left: 5px">{{ scope.row.category_name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <ModifyCategory :dialogFormVisible.sync="dialogFormVisible" :form="form" @queryCategory="queryCategory"
            :title="title" :dialogState="dialogState" />
    </div>
</template>

<script>
import { queryCategory, delCategory } from '@/api/category'
import ModifyCategory from './components/ModifyCategory.vue'
export default {
    components: { ModifyCategory },
    data() {
        return {
            dialogFormVisible: false, //控制弹窗的显示和隐藏
            title: "", //弹窗的标题
            dialogState: 'edit',//弹窗的状态
            // form表单
            form: {
                category_name: '',
            },
        };
    },
    methods: {
        handleEdit(row) { //编辑按钮
            this.title = "修改分类信息"
            this.dialogState = "edit"
            this.dialogFormVisible = true
            this.form = {...row};

        },
        async handleDelete(row) {// 删除按钮
            try {
                await this.$confirm(`确定要删除${row.category_name}分类吗`, {
                    cancelButtonText: "取消",
                    confirmButtonText: "确定",
                    type: "warning",
                })
                await this.delCategory(row.category_id)
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
        async queryCategory() { // 获取分类数据
            this.$store.dispatch("queryCategory")
        },
        async delCategory(value) { // 删除数据
            await delCategory(value)
            await this.queryCategory()
        },
        addCategory() {
            this.title = "添加新分类"
            this.dialogState = "add"
            // 1.生成新的from表单内容
            this.form = {
                category_name: null,
            }
            this.dialogFormVisible = true
        }
    },
    computed:{
        staffInfo(){
            return this.$store.state.categoryInfo
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

.addCategory {
    display: block;
    margin: 10px auto 10px;
}
</style>