<template>
  <el-dialog :title="title" :visible="dialogFormVisible" @close="outSubmit">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules" label-position="right">
      <el-form-item label="餐桌位置" prop="foodtable_describe">
        <el-input v-model="form.foodtable_describe"   type="textarea" />
      </el-form-item>
      <el-form-item label="用餐人数" prop="foodtable_number
">
        <el-input-number v-model="form.foodtable_number
        " size="small" :min="2" :step="1" :max="15"></el-input-number>
      </el-form-item>
      <el-form-item label="餐桌状态">
        <el-radio v-model="form.foodtable_state" size="mini" border :label="true" :key="true">就餐中</el-radio>
        <el-radio v-model="form.foodtable_state" size="mini" border :label="false" :key="false">空桌</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认修改</el-button>
        <el-button @click="outSubmit">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { modifyFoodTable, addFoodTable } from '@/api/foodTable.js'
export default {
  data() {
    return {
      rules: {
        Cz_num: [
          { required: true, message: '请输入菜单编号', trigger: 'blur' }
        ],
        foodtable_describe: [
          { required: true, message: '请输入餐桌位置', trigger: 'blur' }
        ],
        foodtable_number
          : [
            { min: 2, max: 15, message: '用餐人数在 2 到 15 人之间', trigger: 'blur' }
          ]
      }
    }
  },
  props: {
    title: {
      default: "默认标题",
      type: String
    },
    dialogState: {
      type: String
    },
    dialogFormVisible: {
      type: Boolean
    },
    form: {
      type: Object
    }
  },
  methods: {
    async onSubmit() {
      // 1.提交表单数据，进行数据更改
      // 2.重新获取数据
      if (this.dialogState === 'edit') {
        await this.modifyFoodTable()
      } else {
        await this.addFoodTable()
      }
      // 3.关闭弹窗
     this.outSubmit()
    },
    outSubmit() {
      // 1.关闭弹窗
      this.$emit('update:dialogFormVisible', false)
    },
    async modifyFoodTable() { //修改数据
      await modifyFoodTable(this.form)
      await this.$emit("queryFoodTable")
    },
    async addFoodTable() {
      await addFoodTable(this.form)
      await this.$emit("queryFoodTable")
    }
  },
}
</script>
<style scoped>

</style>