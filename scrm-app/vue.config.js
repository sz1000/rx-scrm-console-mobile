// 使用等比适配插件
module.exports = {
    lintOnSave: true,
    css: {
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [
                    require('postcss-px2rem')({
                        // 以设计稿750为例， 750 / 10 = 75
                        remUnit: 75,
                    }),
                ],
            },
        },
    },
    publicPath: '/', //这个必须，引入静态资源需要从根路径引入，否则会找不到静态资源
    devServer: {
        // history模式下的url会请求到服务器端，但是服务器端并没有这一个资源文件，就会返回404，所以需要配置这一项
        historyApiFallback: {
            index: '/index.html', //与output的publicPath
        },
    },
}