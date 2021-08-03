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
                            remUnit:  75,
                        }),
                    ],
                },
            },
        },
    }