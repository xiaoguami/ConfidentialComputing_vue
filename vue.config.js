const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
const name = require('./package.json').name

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    lintOnSave: true,
    productionSourceMap: false,
    css: {
        sourceMap: false,
        modules: false,
        loaderOptions: {
            stylus: {
                import: [resolve('./src/assets/css/index.styl')]
            }
        }
    },
    devServer: {
        proxy: {
            '/detect': {
                target: 'http://172.28.7.35:8080',
                changeOrigin: true
            }
        }
    }
}