// vue.config.js
module.exports = {
  // 选项...
  css: {
    loaderOptions: {
      postcss: {
        plugins: [require("tailwindcss"), require("autoprefixer")]
      }
    }
  }
};
