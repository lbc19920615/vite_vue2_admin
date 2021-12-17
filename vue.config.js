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
        '@expose': 'http://192.168.1.67:7002/public/expose'
      }
    },
  },
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
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
