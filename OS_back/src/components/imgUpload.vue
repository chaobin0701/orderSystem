<template>
  <el-upload class="upload-demo" ref="upload" :action="`${baseURL}file/upload`" :limit="1" :multiple="false"
    :on-success="successHandle" :file-list="fileList" list-type="picture" :headers="{ Authorization: token }"
    :auto-upload="false">
    <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="mini" type="success" @click="submitUpload">上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件,且不超过500kb</div>
  </el-upload>
</template>

<script>
import { baseURL } from '@/utils/request.js'
export default {
  data() {
    return {
      fileList: [],
      baseURL,
      // token 测试
      token: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6NSwiY3VzdG9tZXJfbmFtZSI6ImNjYiIsImlhdCI6MTY3MDc0NTkwNiwiZXhwIjoxNjcxNjA5OTA2fQ.0rXtS9pdtGA0C-e2AZk9b0Eb7xp_SqOWK32Pd4lhAt8"
    };
  },
  methods: {
    submitUpload() { //上传图片
      this.$refs.upload.submit();
    },
    successHandle(response, file, fileList) { //文件上传成功钩子
      this.$emit("successCallback", response.imgSrc)
      this.$message({
        type: "success",
        message: "上传成功!",
      })
      setTimeout(() => {
        this.fileList = []
      },500)
    },
  }
}
</script>

<style>

</style>