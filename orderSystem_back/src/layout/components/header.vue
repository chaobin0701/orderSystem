<template>
    <div class="headerFunArea">
        <div class="header">
            <div class="control">
                <span class="el-dropdown-link">
                    <i class="el-icon-s-unfold" style="font-size: 22px"></i>
                    <span>{{ $route.name }}</span>
                </span>
            </div>
            <div class="user">
                <el-button class="outLogin" size="mini" round @click="outLogin">退出登录</el-button>
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                <span>欢迎你：管理员</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "headerUi",
    props: ["headerData"],
    methods: {
        handleCommand(command) {
            this.$router.push(`addInfo?activeName=${command}`);
        },
        async outLogin() {
            // 退出登录
            try {
                await this.$confirm(
                    "是否退出登录?",
                    "",
                    {
                        distinguishCancelAndClose: true,
                        confirmButtonText: "退出",
                        cancelButtonText: "取消",
                    }
                )
                // 确认退出 删除token 并跳转 /login
                this.$message({
                    type: 'info',
                    message: '正在退出登录',
                    duration: 1000
                })
                setTimeout(() => {
                    this.$store.dispatch("user/removeToken")
                    this.$router.push('/login?handle=outLogin')
                }, 500)
            } catch (error) {
                // 取消退出
                this.$message({
                    type: 'info',
                    message: '取消退出',
                    duration: 1000
                })
            }

        },
    },
};
</script>

<style>
.headerFunArea {
    height: 60px;
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    z-index: 99;
    padding: 0 10px;
    background-color: #fff;
    border-bottom: 1px solid #dcdfe6;
}

.el-dropdown-link span {
    line-height: 35px;
    height: 35px;
    font-size: 18px;
    font-weight: 600;
    color: #606266;
}

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
    color: #25abbe;
}

.user>* {
    margin: 0 5px;
}

.outLogin {
    opacity: 0.35;
    transition: all 0.3s;
    cursor: pointer;
}

.outLogin:hover {
    opacity: 1;
}
</style>