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
}
