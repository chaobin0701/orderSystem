<template>
  <el-dialog :title="title" :visible="dialogFormVisible" @close="outSubmit">
    <!-- 表单 -->
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      :rules="rules"
      label-position="right"
    >
      <el-form-item label="姓名" prop="staff_name">
        <el-input v-model="form.staff_name" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="form.staff_sex" size="mini" border label="1" key="1"
          >男</el-radio
        >
        <el-radio v-model="form.staff_sex" size="mini" border label="0" key="0"
          >女</el-radio
        >
      </el-form-item>
      <el-form-item label="年龄">
        <el-input-number
          v-model="form.staff_age"
          :min="16"
          :max="60"
          size="small"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="薪资">
        <el-input-number
          v-model="form.staff_salary"
          :min="2000"
          :max="20000"
          :step="100"
          size="small"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="是否在职">
        <el-switch
          v-model="form.staff_state"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="outSubmit">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { modifyStaff, addStaff } from "@/api/staff.js";
export default {
  props: {
    title: {
      default: "修改员工信息",
      type: String
    },
    dialogFormVisible: {
      type: Boolean
    },
    form: {
      type: Object
    },
    dialogState: {
      type: String
    }
  },
  data() {
    return {
      rules: {
        staff_name: [
          { required: true, message: "请输入员工名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "员工名称在 2 到 10 个字符",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    async onSubmit() {
      // 1.提交表单数据，进行数据更改
      // 2.重新获取数据
      if (this.dialogState === "edit") {
        await this.modifyStaff(this.form);
      } else {
        await this.addStaff(this.form);
      }
      // 3.关闭弹窗
      this.$emit("update:dialogFormVisible", false);
    },
    outSubmit() {
      // 1.关闭弹窗
      this.$emit("update:dialogFormVisible", false);
    },
    async modifyStaff(staffObj) {
      //修改数据

      await modifyStaff(staffObj);
      await this.$emit("queryStaff");
    },
    async addStaff(staffObj) {
      await addStaff(staffObj);
      await this.$emit("queryStaff");
    }
  }
};
</script>
<style scoped></style>
