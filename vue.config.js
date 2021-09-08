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
    // transpileDependencies: ['element-ui', 'vant'],
    // // transpileDependencies: ['*'],
    // chainWebpack: (config) => {
    //     // 在chainWebpack中添加下面的代码
    //     config.entry('main').add('babel-polyfill')
    //     config.entry.app = ['babel-polyfill', './src/main.js']
    // },
}