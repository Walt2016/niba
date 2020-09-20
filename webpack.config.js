const path = require('path');
var webpack = require('webpack'); //热更新
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");
const config = {
  mode: 'development', //production
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '../dist/', // 配置生成输出路径
    // filename: 'bundle.js'
    filename: '[name]_bundle.js'
    // filename: 'bundle-[hash:5].js' // 带hash值得js
  },
  devtool:'eval-source-map' ,
  module: {
    rules: [
      // { // loader js
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'babel-loader'
      // }, 

      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   exclude: path.resolve(__dirname, 'node_modules'),
      //   include: path.resolve(__dirname, 'src'),
      //   // query:{
      //   //     presets:['latest']
      //   // }
      // },

      {
        test: /\.css$/,
        // use: [
        //   // process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
        //   // MiniCssExtractPlugin.loader,
        //   // {
        //   //   loader: 'style-loader',
        //   // },
        //   // {
        //   //   loader: 'css-loader'
        //   // }
        //   'style-loader',
        //   // MiniCssExtractPlugin.loader,
        //   'css-loader'

        // ]
        // ,
        use: [
          // // 配置引用css
          // {
          //   loader: 'style-loader/url' // 可以把css放在页面上
          // },
          // {
          //   loader: 'file-loader' // 放在后面的先被解析
          // }
          {
            loader: 'style-loader', // 可以把css放在页面上
            // options: {
            //   insertInto: '#app', // 可以指定加在哪个标签下
            //   singleton: true, // 使用一个style标签
            //   transform: './css.transform.js' // transform 是css的变形函数,相对于webpack.config的路径
            // }
          },
          {
            loader: 'css-loader' // 放在后面的先被解析
          },
          {
            loader: 'postcss-loader',
            // options:{}
            options: {
              ident: 'postcss',
              plugins: [
                // require('autoprefixer')(),
                require('postcss-cssnext')(),
                require('cssnano')()
              ]
            }
          },
        ]
      }
      // { test: /\.css$/, use: 'css-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      /*压缩文件，removeAttributeQuotes指去掉属性的双引号，目前你随便不用也行*/
      minify: {
        removeAttributeQuotes: true
      },
      /*加入hash值，为了避免浏览器缓存js*/
      // hash: true,
      template: './public/index.html',
      filename: 'index.html', // 生成文件名字
      title: "mycanvas",
      // inject: false,    // 不把生成的css，js插入到html中
      // chunks: ['app'],  //指定某一个入口，只会把入口相关载入html
      minify: { // 压缩html
        collapseWhitespace: true // 空格
      }
    }),
    new CleanWebpackPlugin(),
    // new OptimizeCssAssetsPlugin({
    //   assetNameRegExp: /\.css$/g,
    //   cssProcessor: require("cssnano"),
    //   cssProcessorPluginOptions: {
    //     preset: ['default', {
    //       discardComments: {
    //         removeAll: true
    //       }
    //     }]
    //   },
    //   canPrint: true
    // })
    // ,
    // new uglify()

  ]
};

module.exports = config;
const isDev = process.env.NODE_ENV === "development";
if (isDev) {
  config.devtool = "＃廉价模块-EVAL-源映射" //代码映射
  config.devServer = {
    port: 8000, //启动服务监听端口
    host: '0.0.0.0', //可以通过localhost访问
    overlay: { //在页面上显示错误信息
      errors: false,
    },
    open: false, //启动webpack-dev-server时自动打开浏览器
    hot: true //启用热更
  }
  config.plugins.push(
    new webpack.DefinePlugin({}), //但是index.js里面是属于Webpack要构建的产物，如果里面也想读取环境变量。可以通过这个DefinePlugin定一下index.js里面就可以读到了。
    new webpack.HotModuleReplacementPlugin(), //在webpack工程中要实现热加载，就是只更新局部的修改
    new webpack.NoEmitOnErrorsPlugin() //热更相关插件
  )
}