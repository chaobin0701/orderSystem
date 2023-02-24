module.exports = {
  resolve: {
    aliass: {
      //告诉 webpack,程序员写的代码中，＠符号表示 src 这一层目录
      "@": path.join(__dirname, "./src/")
    }
  }
};
