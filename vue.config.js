'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'workflow' // page title

// 本地环境是否需要使用cdn
const devNeedCdn = true

// cdn链接
const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    axios: 'axios',
    'vue-router': 'VueRouter',
    'element-ui': 'ELEMENT',
    'echarts': 'echarts'
  },
  // cdn的css链接
  css: [
    'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/element-ui/2.15.7/theme-chalk/index.min.css'
  ],
  // cdn的js链接
  js: [
    'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/vue/2.6.14/vue.min.js',
    'https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/vue-router/3.0.2/vue-router.min.js',
    'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/axios/0.26.0/axios.min.js',
    'https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/element-ui/2.15.7/index.min.js',
    'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/echarts/5.3.0/echarts.min.js',
    'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/vuex/3.6.2/vuex.min.js'
  ]
}

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 清除注释
const CompressionWebpackPlugin = require('compression-webpack-plugin'); // 开启压缩

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'web',
  assetsDir: 'static/web',
  lintOnSave: false, // process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    host: 'localhost',
    port: port,
    open: true,
    proxy: {
      '/api': { //   以'/api'开头的请求会被代理进行转发
        target: 'http://localhost:8001', //   要发向的后台服务器地址  如果后台服务跑在后台开发人员的机器上，就写成 `http://ip:port` 如 `http:192.168.12.213:8081`   ip为后台服务器的ip
        changeOrigin: true
      },
      '/login': { //   以'/login'开头的请求会被代理进行转发
        target: 'http://localhost:8001', //   要发向的后台服务器地址  如果后台服务跑在后台开发人员的机器上，就写成 `http://ip:port` 如 `http:192.168.12.213:8081`   ip为后台服务器的ip
        changeOrigin: true
      },
      '/refresh_token': { //   以'/refresh_token'开头的请求会被代理进行转发
        target: 'http://localhost:8001', //   要发向的后台服务器地址  如果后台服务跑在后台开发人员的机器上，就写成 `http://ip:port` 如 `http:192.168.12.213:8081`   ip为后台服务器的ip
        changeOrigin: true
      },
      '/swagger': { //   以'/swagger'开头的请求会被代理进行转发
        target: 'http://localhost:8001', //   要发向的后台服务器地址  如果后台服务跑在后台开发人员的机器上，就写成 `http://ip:port` 如 `http:192.168.12.213:8081`   ip为后台服务器的ip
        changeOrigin: true
      },
      '/static/uploadfile': { //   以'/static/uploadfile'开头的请求会被代理进行转发
        target: 'http://localhost:8001', //   要发向的后台服务器地址  如果后台服务跑在后台开发人员的机器上，就写成 `http://ip:port` 如 `http:192.168.12.213:8081`   ip为后台服务器的ip
        changeOrigin: true
      }
    },
    disableHostCheck: true
  },
  configureWebpack: (config) => {
    const plugins = []
    // 用cdn方式引入，则构建时要忽略相关资源
    if (process.env.NODE_ENV === 'development' || devNeedCdn) {
      config.externals = cdn.externals
      config.mode = 'production'
      config['performance'] = {// 打包文件大小配置
        'maxEntrypointSize': 10000000,
        'maxAssetSize': 30000000
      }
      // config.plugins.push(
      //   new MonacoWebpackPlugin()
      // )
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false, // 去掉注释
            },
            warnings: false,
            compress: {
              drop_console: false,
              drop_debugger: false,
              // pure_funcs: ['console.log']//移除console
            }
          }
        })
      )
      // 服务器也要相应开启gzip
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.(js|css)$/,// 匹配文件名
          threshold: 10000, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 不删除源文件
          minRatio: 0.8 // 压缩比
        })
      )
    }
    config.name = name,
    config.resolve['alias'] = {
      '@': resolve('src')
    }
  },
  chainWebpack(config) {
    // ============注入cdn start============
    config.plugin('html').tap(args => {
      if (devNeedCdn) args[0].cdn = cdn
      return args
    })
    config.plugin('webpack-bundle-analyzer') // 查看打包文件体积大小
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    // ============注入cdn end============

    // 移除 preload(预载) 插件
    config.plugins.delete('preload')
    // 移除 prefetch(预取) 插件
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
