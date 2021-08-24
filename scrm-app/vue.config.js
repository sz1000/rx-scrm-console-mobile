module.exports = {
    css: {
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [
                    require('postcss-px2rem')({
                        remUnit: 75,
                    }),
                ],
            },
        },
    },
    publicPath: '/',
    devServer: {
        historyApiFallback: {
            index: '/index.html',
        },
    },
    transpileDependencies: ['element-ui'],

    chainWebpack(config) {
        // 在chainWebpack中添加下面的代码
        config.entry('main').add('babel-polyfill') // main是入口js文件
    },
}