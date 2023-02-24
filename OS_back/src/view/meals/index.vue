<template>
    <div class="menus">
        <MainHeader>
            <div slot="left">
                <el-button size="mini" @click="activeCategory = '全部菜品'"
                    :class="{active:activeCategory === '全部菜品'}">全部菜品</el-button>
                <el-button size="mini" v-for="item in categorys" :key="item" @click="activeCategory = item"
                    :class="{ active: activeCategory === item }">{{ item }}</el-button>
            </div>
            <el-button size="mini" slot="left" @click="addMenu">添加新菜品</el-button>
        </MainHeader>
        <!-- 表格区域 -->
        <el-table :data="mealsFilter.slice((page - 1) * 7, page * 7)" border>

            <el-table-column label="类别" width="200">
                <template slot-scope="scope">
                    <i class="el-icon-s-order"></i>
                    <span style="margin-left: 5px">{{ scope.row.meals_category }}</span>
                </template>
            </el-table-column>

            <el-table-column label="菜名" width="250">
                <template slot-scope="scope">
                    <i class="el-icon-food"></i>
                    <span style="margin-left: 5px">{{ scope.row.meals_name }}</span>
                </template>
            </el-table-column>

            <el-table-column label="价格" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-s-goods"></i>
                    <span style="margin-left: 5px">{{ scope.row.meals_price }}￥</span>
                </template>
            </el-table-column>

            <el-table-column label="描述" width="350">
                <template slot-scope="scope">
                    <i class="el-icon-s-order"></i>
                    <span style="margin-left: 5px">{{ scope.row.meals_describe | describeFilter }}</span>
                </template>
            </el-table-column>

            <el-table-column label="库存" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-s-order"></i>
                    <span style="margin-left: 5px">{{ scope.row.meals_count }}</span>
                </template>
            </el-table-column>

            <el-table-column label="图片" width="180">
                <template slot-scope="scope">
                    <el-image style="width: 55px; height: 55px" :src="scope.row.meals_image" fit="contain"
                        @click="showImg(scope.row.meals_image)" :preview-src-list="srcList"></el-image>
                </template>
            </el-table-column>

            <el-table-column label="修改">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination-box">
            <el-pagination @current-change="currentChange" background layout="prev, pager, next"
                :hide-on-single-page="mealsFilter.length <= 8" :page-size="8" :total="mealsFilter.length">
            </el-pagination>
        </div>
        <modifyMeals :dialogFormVisible.sync="dialogFormVisible" :form="form" @queryMeals="queryMeals" :title="title"
            :dialogState="dialogState" @changeImageSrc="changeImageSrc" :categorys="categorys" />
    </div>
</template>

<script>
import { queryMeals, delMeals } from '@/api/meals'
import modifyMeals from './components/modifyMeals.vue'
export default {
    components: { modifyMeals },
    data() {
        return {
            dialogFormVisible: false, //控制弹窗的显示和隐藏
            title: "", //弹窗的标题
            dialogState: 'edit',//弹窗的状态
            // form表单
            form: {
                meals_category: '',
                meals_describe: "",
                meals_id: '',
                meals_image: '',
                meals_name: '',
                meals_price: 0
            },
            menus: [],  //商品的元数据
            mealsGroup: {},//
            srcList: [], // 单击放大图片
            page: 1, //分页页码
            activeCategory: "全部菜品", //当前筛选的商品
        };
    },
    filters: {
        describeFilter(text, i) {
            if (text.length < 20) {
                return text
            } else {
                return text.slice(0, 20) + '...'
            }
        }
    },
    methods: {
        handleEdit(row) { //点击编辑按钮
            this.title = "修改菜品信息"
            this.dialogState = "edit"
            this.dialogFormVisible = true
            this.form = { ...row }
        },
        async handleDelete(row) {  // 删除餐品
            try {
                await this.$confirm(`确定要删除${row.meals_name}餐吗`, {
                    cancelButtonText: "取消",
                    confirmButtonText: "确定",
                    type: "warning",
                })
                // 确认删除
                await this.deleteMsg(row.meals_id)
                await this.queryMeals()
                this.$message({
                    type: "success",
                    message: "删除成功!",
                })
            } catch (error) {
                this.$message({
                    type: "info",
                    message: "已取消删除",
                });
            }
        },
        async queryMeals() {// 获取菜品数据
            let { result } = await queryMeals()
            this.menus = result.sort((obj1, obj2) => {
                return obj1.meals_category == obj2.meals_category ? 0 : obj1.meals_category > obj2.meals_category ? -1 : 1;
            })
            this.handleMsg(result)
        },
        async deleteMsg(value) { //删除菜品
            await delMeals(value)
            await this.queryMeals()
        },
        currentChange(page) { //改变页码
            this.page = page
        },
        showImg(src) { //展示图片
            this.srcList.shift()
            this.srcList.push(src)
        },
        // 处理数据
        handleMsg(data) {
            this.mealsGroup = data.reduce((prev, next) => {
                if (prev.hasOwnProperty(next.meals_category)) { //存在这个属性
                    prev[next.meals_category].push(next)
                } else { // 不存在这个属性
                    prev[next.meals_category] = []
                    prev[next.meals_category].push(next)
                }
                return prev
            }, {})
        },
        addMenu() { //点击添加按钮
            this.title = "添加新菜品"
            this.dialogState = "add"
            // 1.生成新的from表单内容
            this.form = {
                meals_category: '',
                meals_describe: "菜品描述",
                meals_image: 'http://118.31.47.122:3280/menus/低GI嫩煎龙利鱼活力碗.jpg',
                meals_name: 'xxx',
                meals_price: 10,
                meals_count: 10
            }
            this.dialogFormVisible = true
        },
        changeImageSrc(imageSrc) { //修改图片路径
            this.form.meals_image = imageSrc
        }
    },
    computed: {
        // 数据分页
        mealsFilter() {
            this.page = 1
            if (this.activeCategory == '全部菜品') {
                return this.menus
            }
            if (this.mealsGroup[this.activeCategory] == undefined) {
                return []
            } else {
                return this.mealsGroup[this.activeCategory]
            }
        },
        categorys() {
            return this.$store.state.categoryInfo.map(item => {
                return item.category_name
            })
        }
    },
    async created() {
        // 获取菜单数据
        await this.queryMeals()
    }
};
</script>

<style scoped>
.menus .content {
    height: 750px;
}

.food-table {
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
}

/* 导航与内容区域 */
.el-table,
.tac {
    display: inline-block;
}

.el-col {
    height: 100%;
    border: solid 1px #e6e6e6;
    border-right: none;
}

.el-menu {
    height: 100%;
    border: none;
}

.content {
    display: flex;
}

/* 表格区域样式 */
.el-table__row {
    height: 80px;
}

/* 分页 */
.pagination-box {
    display: flex;
    justify-content: center;
}


/* header */
.header {
    display: flex;
    height: 50px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}

.header .user {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #25ABBE;
}

.el-button.active {
    background-color: rgb(236, 245, 255);
    color: #409EFF;
}
</style>