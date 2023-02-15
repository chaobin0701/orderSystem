<template>
  <el-dialog :title="title" :visible="dialogFormVisible" @close="outSubmit">
    <!-- 表单 -->
    <el-form ref="form" :model="form" label-width="80px" :rules="rules" label-position="right">
      <el-form-item label="类别">
        <el-select v-model="form.meals_category">
          <el-option v-for="x in categorys" :key="x" :label="x" :value="x"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜名" prop="meals_name">
        <el-input style="margin-left: 5px" size="small" v-model="form.meals_name" />
      </el-form-item>
      <el-form-item label="价格">
        <el-input-number v-model="form.meals_price" size="small" :precision="2" :step="1" :min="10" :max="1000">
        </el-input-number>
      </el-form-item>
      <el-form-item label="描述" prop="meals_describe">
        <el-input style="margin-left: 5px" size="small" v-model="form.meals_describe" />
      </el-form-item>
      <el-form-item label="库存" prop="meals_describe">
        <el-input-number v-model="form.meals_count" :min="0" size="small"></el-input-number>
      </el-form-item>
      <el-form-item label="图片">
        <el-image style="width: 55px; height: 55px" :src="form.meals_image"></el-image>
        <imgUpload ref="imgUpLoad" @successCallback="imageUpload">图片上传</imgUpload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认修改</el-button>
        <el-button @click="outSubmit">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { modifyMeals, addMeals } from '@/api/meals'
import imgUpload from '@/components/imgUpload.vue'

export default {
  components: { imgUpload },
  props: {
    title: {
      default: "修改商品信息",
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
    },
    dialogFormVisible: {
      type: Boolean
    },
    categorys: {
      type: Array
    },
    meals_image: {
      type: String
    }
  },
  data() {
    return {
      rules: {
        meals_name: [
          { required: true, message: '请输入菜品名称', trigger: 'blur' },
          { min: 2, max: 15, message: '菜品名称在 2 到 15 个字符', trigger: 'blur' }
        ],
        meals_describe: [
          { required: true, message: '请输入菜品描述', trigger: 'blur' },
          { min: 1, max: 50, message: '菜品描述在 1 到 50 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击确认按钮
    async onSubmit() {
      try {
        if (this.dialogState === 'edit') {
          await this.modifyMeals()
        } else {
          await this.addMeals()
        }
        this.$message({
            type: "success",
            message: `${this.dialogState === 'edit'? "编辑":"添加"}成功!`,
          })
      } catch (error) {
        this.$message.error(`${this.dialogState === 'edit'? "编辑":"添加"}失败,请检测输入信息`);
      }
      // 关闭弹窗
      this.$emit('update:dialogFormVisible', false)
    },
    outSubmit() { //取消按钮
      this.$emit('update:dialogFormVisible', false)
    },
    async modifyMeals() { //修改数据
      await modifyMeals(this.form)
      await this.$emit("queryMeals")
    },
    async addMeals() { //添加数据
      await addMeals(this.form)
      await this.$emit("queryMeals")
    },
    imageUpload(imgSrc) { //上传图片
      this.$emit("changeImageSrc", imgSrc)
    }
  }
}
</script>
<style scoped>

</style>