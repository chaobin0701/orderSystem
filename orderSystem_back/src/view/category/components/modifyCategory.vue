<template>
  <el-dialog :title="title" :visible="dialogFormVisible" @close="outSubmit">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules" label-position="right">
      <el-form-item label="分类名称" prop="category_name">
        <el-input v-model="form.category_name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认修改</el-button>
        <el-button @click="outSubmit">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { modifyCategory, addCategory } from '@/api/category.js'
export default {
  data() {
    return {
      rules: {
        category_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ],
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
        await this.modifyCategory()
      } else {
        await this.addCategory()
      }
      // 3.关闭弹窗
      this.$emit('update:dialogFormVisible', false)
    },
    outSubmit() {
      // 1.关闭弹窗
      this.$emit('update:dialogFormVisible', false)
    },
    async modifyCategory() { //修改数据
      await modifyCategory(this.form)
      await this.$emit("queryCategory")
    },
    async addCategory() {
      await addCategory(this.form)
      await this.$emit("queryCategory")
    }
  },
}
</script>
<style scoped>

</style>