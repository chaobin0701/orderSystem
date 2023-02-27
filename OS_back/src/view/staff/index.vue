<template>
  <div class="works">
    <MainHeader>
      <el-button size="mini" slot="left" @click="addWork">添加新员工</el-button>
    </MainHeader>
    <!-- 表格 -->
    <el-table :data="staffInfo" style="width: 100%" border>
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <i class="el-icon-user"></i>
          <span style="margin-left: 5px">{{ scope.row.staff_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="性别" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 5px" v-if="scope.row.staff_sex == 1"
            >男</span
          >
          <span style="margin-left: 5px" v-else>女</span>
        </template>
      </el-table-column>

      <el-table-column label="年龄" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.staff_age }}周岁</span>
        </template>
      </el-table-column>

      <el-table-column label="薪资" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.staff_salary }}元</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 5px" v-if="scope.row.staff_state">在职</span>
          <span style="margin-left: 5px" v-else>离职</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <ModifyStaff
      :dialogFormVisible.sync="dialogFormVisible"
      @queryStaff="queryStaff"
      :form="form"
      :title="title"
      :dialogState="dialogState"
    />
  </div>
</template>

<script>
import { delStaff } from "@/api/staff.js";
import ModifyStaff from "./components/ModifyStaff.vue";
export default {
  name: "foodTable",
  components: { ModifyStaff },
  data() {
    return {
      dialogFormVisible: false, //控制弹窗的显示和隐藏
      title: "", //弹窗的标题
      dialogState: "edit", //弹窗的状态
      // form表单
      form: {
        staff_name: "",
        staff_sex: "",
        staff_age: "",
        staff_salary: "",
        staff_state: true
      }
    };
  },
  methods: {
    handleEdit(row) {
      //编辑按钮
      this.title = "修改员工信息";
      this.dialogState = "edit";
      this.dialogFormVisible = true;
      this.form = { ...row };
    },
    async handleDelete(row) {
      // 删除按钮
      try {
        await this.$confirm(`确定要删除${row.staff_name}员工吗`, {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          type: "warning"
        });
        // 确认删除
        await this.deleteMsg(row._id);
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
    async queryStaff() {
      // 获取数据
      this.$store.dispatch("queryStaff");
    },
    async deleteMsg(value) {
      //删除数据
      console.log(value);
      await delStaff(value);
      await this.queryStaff();
    },
    async addWork() {
      this.title = "添加新员工";
      this.dialogState = "add";
      // 1.生成新的from表单内容
      this.form = {
        staff_name: "张三",
        staff_sex: "男",
        staff_age: "18",
        staff_salary: "2500"
      };
      this.dialogFormVisible = true;
    }
  },
  computed: {
    // 员工信息
    staffInfo() {
      return this.$store.state.staffInfo;
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

.addWorks {
  display: block;
  margin: 10px auto 10px;
}
</style>
