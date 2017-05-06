var path = require('path')//路径模块
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')//导出HTML
var ExtractTextPlugin = require('extract-text-webpack-plugin')//抽离css

module.exports = {
    entry: {
        index: './src/js/index.js',
        home: './src/js/home.js'
    },//入口文件
    output: {
        path: path.resolve(__dirname, 'dist'),//打包后的文件存放的地方
        publicPath: '',//资源公共路径,可用于CDN
        filename: 'js/[name].min.js'//打包后输出文件的文件名
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?minimize=true&-url'//带参数压缩css,加-url防止css内图片路径被转化
                })
            },//处理css
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: [
                    'url-loader?limit=10000&name=./img/[name].[ext]',
                    'image-webpack-loader?{optimizationLevel: 5, interlaced: false, pngquant:{quality: "55-70", speed: 4}, mozjpeg: {quality: 60}}'
                ]
            },//处理图片
            {
                test: /\.(woff|woff2|eot|ttf|svg)(\?.*)?$/,
                loader: 'url-loader?importLoaders=1&limit=1000&name=./font/[name].[ext]'
            },//处理font文件
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].min.css'), //用ExtractTextPlugin 来抽离css
        new webpack.optimize.UglifyJsPlugin({        //压缩js代码
            compress: {
                warnings: false
            },
            except: ['Swiper', '$super', '$', 'exports', 'require']//排除关键字
        }),
        new HtmlWebpackPlugin({                      //插入css/js标签生成最终index.html
            favicon: './src/favicon.ico',
            filename: 'index.html',
            template: './src/index.html',
            hash: true,//静态资源后加hash
            minify: {
                removeComments: true,//移除注释
                collapseWhitespace: true,//移除空格
            },
            chunks: [
                'index'
            ]//只选择加载入口文件 index.js
        }),
        new HtmlWebpackPlugin({                      //插入css/js标签生成最终home.html
            favicon: './src/favicon.ico',
            filename: 'home.html',
            template: './src/home.html',
            hash: true,//静态资源后加hash
            inject: 'head',//添加在<head>头部
            minify: {
                removeComments: true,//移除注释
                collapseWhitespace: true,//移除空格
            },
            chunks: [
                'home'
            ]//只选择加载入口文件 home.js
        }),
        new HtmlWebpackPlugin({                      //插入css/js标签生成最终pc.html
            favicon: './src/favicon.ico',
            filename: 'pc.html',
            template: './src/pc.html',
            hash: true,//静态资源后加hash
            minify: {
                removeComments: true,//移除注释
                collapseWhitespace: true,//移除空格
            },
            chunks: []//无需加载js
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        host: '0.0.0.0',//局域网调试
        port: 8080
    }
}