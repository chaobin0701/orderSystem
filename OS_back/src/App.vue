<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
* {
  font-family: "Helvetica Neue";
}

#app {
  margin: 0 auto;
  min-height: 100%;
  background-color: #f5f5f5;
}
/* 表格的样式 */
.el-descriptions__header {
  align-items: center;
  box-sizing: border-box;
  padding: 0 15px;
  margin: 0;
  height: 50px;
  border-right: 1px solid #ebeef5;
  border-left: 1px solid #ebeef5;
}

.pagination-box {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}

.el-descriptions {
  border-radius: 20px;
  box-sizing: border-box;
  padding: 20px;
  box-shadow: 3px 3px 10px rgb(220 220 220 / 20%);
  transition: all 0.5s;
  background: #fff;
  margin: 15px 0;
}
/* 表格外层 */
.el-table {
  border-radius: 20px;
  box-sizing: border-box;
  padding: 20px;
  margin-top: 10px;
  box-shadow: 3px 3px 10px rgba(220, 220, 220, 0.2);
  transition: all 0.5s;
}

.el-table:hover {
  box-shadow: 0px 0px 10px rgba(150, 150, 150, 0.3);
}

/* 底下分页 */
.pagination-box {
  margin: 20px 0;
}

html,
body {
  border: 0;
  margin: 0;
  padding: 0;
  height: 100%;
}

body {
  font: 100%/1.25 Arial, Helvetica, sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
  font-weight: normal;
}

img {
  border: 0;
}

a,
a:link,
a:visited,
a:hover {
  text-decoration: underline;
}

form {
  margin: 0;
  padding: 0;
  display: inline;
}
</style>
