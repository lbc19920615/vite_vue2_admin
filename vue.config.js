// vue.config.js
// console.log(1)
/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  // 选项...
  configureWebpack: {
    resolve: {
      alias: {
        '@expose': 'http://localhost:7002/public/expose'
      }
    },
  },
  devServer: {
    proxy: {
      // 字符串简写写法
      // '/api': 'http://192.168.1.51:10010',
      '/api': {
        target: 'http://192.168.1.51:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    },
  }
}
