'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
    // console.log('--------------*********-----------------------------', __dirname);
    // __dirname是/Users/wangxia/work/wanlian/blockchain_browser_front/web-ui/config
    // __dirname is the directory name of current module,这里为什么是config呢？？？？？？？？
module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: { // 需要用proxyTable代理的接口，可跨域
            '/api': {
                target: 'https://explorer.intchain.io', // 接口的域名
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true // 如果接口跨域，需要进行这个参数配置
            },
          '/socket.io': {
            target: 'https://explorer.intchain.io', // 接口的域名
            secure: false, // 如果是https接口，需要配置这个参数
            changeOrigin: true // 如果接口跨域，需要进行这个参数配置
          }
        },

        // Various Dev Server settings
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined 运行测试页面的端口
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: { // production environment
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'), // 编译输入的index.html文件

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'), // 编译输出的静态资源路径
        assetsSubDirectory: 'static', // 编译输出的二级目录
        assetsPublicPath: '/', // 编译发布的根目录，可配置为资源服务器域名或CDN域名

        /**
         * Source Maps
         */

        productionSourceMap: true, // 是否开启SourceMap
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false, // 是否开启Gzip
        productionGzipExtensions: ['js', 'css'], // 需要使用的Gzip压缩的文件扩展名

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}
