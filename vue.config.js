const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  // 基本路劲
  publicPath: './',
  // 放置静态资源的目录
  assetsDir: 'static',
  // 构建时输出的目录
  outputDir: 'dist',
  // 文件名hash
  filenameHashing: true,
  // 生产环境生成map
  productionSourceMap: false,
  css: {
    // false 时只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块
    // true 时可以去掉文件名中的 .module， 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块
    // modules: false,

    // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
    // 生产环境下是 true，开发环境下是 false
    // extract: true,
    loaderOptions: {
      sass: {
        implementation: require('sass') // This line must in sass option
      },
      scss: {
        prependData: `@import "./src/assets/css/variables";` //注意
      }
    }
  },
  //调整内部的 webpack 配置
  configureWebpack: {
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // 去除consle
              drop_debugger: true // 去除debugger
            }
          }
        })
      ]
    }
  }, //(Object | Function)

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('plugins', resolve('src/plugins'))
      .set('server', resolve('src/server'))
      .set('utils', resolve('src/utils'))
      .set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js') ////解决警告You are running the esm-bundler build of vue-i18n
    const imagesRule = config.module.rule('images')
    imagesRule
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 8000 }))
      .end()
  }
  // devServer: {
  //   port: '8080',
  //   https: false
  // }
}
