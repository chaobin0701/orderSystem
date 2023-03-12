<template>
  <div class="login" @keydown.enter="login">
    <h1>餐厅点餐后台管理系统</h1>
    <div class="loginBox">
      <el-image
        :src="require('@/assets/login_1.png')"
        style="width: 300px; height: 300px"
      ></el-image>
      <div class="control">
        <el-input
          v-model="customer_account"
          placeholder="请输入账号"
          prefix-icon="el-icon-user"
        ></el-input>
        <el-input
          placeholder="请输入密码"
          v-model="customer_pwd"
          show-password
          prefix-icon="el-icon-unlock"
        ></el-input>
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      customer_account: "admin",
      customer_pwd: "admin"
    };
  },
  methods: {
    async login() {
      let result = await this.$store.dispatch("user/login", {
        customer_account: this.customer_account,
        customer_pwd: this.customer_pwd
      });
      // 判断登录状态
      if (result.msg === "success") {
        //后续需要改成状态码
        // 跳转页面
        this.$message({
          showClose: true,
          message: "登陆成功",
          type: "success",
          duration: 1000
        });
        this.$router.push("/");
      } else {
        // 登陆失败
        this.$message({
          message: "密码错误,请重新登陆",
          type: "warning",
          duration: 2000
        });
      }
    }
  }
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
}

.loginBox {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(100, 100, 100, 0.1);
  width: 700px;
  height: 400px;
  display: flex;
  box-sizing: border-box;
  padding: 30px;
  justify-content: center;
  align-items: center;
}

.control {
  flex: 1;
  box-sizing: border-box;
  padding: 0 40px;
  flex-direction: column;
  display: flex;
}

.control > div {
  margin: 5px 0;
}

.control > button {
  margin-top: 20px;
}

h1 {
  position: fixed;
  top: 20%;
  font-weight: bold;
  font-size: 40px;
  color: rgba(0, 0, 0, 0.8);
}
</style>
