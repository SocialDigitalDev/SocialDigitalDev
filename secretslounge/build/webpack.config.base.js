const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

module.exports = {
    entry: {
        app: [
            './src/main.js',
            './src/sass/main.scss',
            './src/scripts/functions.js',
        ],
    },
    output: {
        path: path.join(__dirname, '../public/assets'),
        publicPath: 'arquivos',
        filename: 'secrets.[name].js',
    },
    resolve: {
        extensions: [
            '.js',
            '.vue',
            '.css',
            '.scss',
        ],
        alias: {
            vue: 'vue/dist/vue.common.js',
            '@assets': path.resolve(__dirname, '../src/assets'),
            '@services': path.resolve(__dirname, '../src/services'),
            '@pages': path.resolve(__dirname, '../src/pages'),
            '@components': path.resolve(__dirname, '../src/components'),
            '@utils': path.resolve(__dirname, '../src/utils'),
            '@sass': path.resolve(__dirname, '../src/sass'),
        },
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: ['vue-loader'],
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
        }, {
            test: /\.(jpe?g|png|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            use: 'base64-inline-loader?limit=1000&name=[name].[ext]',
        }],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
};
