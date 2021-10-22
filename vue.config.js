module.exports = {
    css: {
        loaderOptions: {
            css: {},
            postcss: {
                // plugins: [
                //     require('postcss-px2rem')({
                //         remUnit: 75,
                //     }),
                // ],
                plugins: [
                    require('postcss-px2rem-exclude')({
                        "remUnit": 75,
                        "exclude":/node_modules/i //忽略 node_modules 目录下的所有文件
                    })
                ]
            },
        },
    },
    publicPath: '/',
    devServer: {
        historyApiFallback: {
            index: '/index.html',
        },
    },
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico',
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