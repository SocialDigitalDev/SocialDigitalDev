const { merge } = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.config.base.js');

module.exports = merge(baseConfig, {
    mode: 'development',
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,
            use: ['vue-style-loader', 'style-loader', 'css-loader', 

                {
                    loader: 'sass-loader',
                    options: {
                        prependData: `
                            @import "@sass/include.scss";
                        `
                    }
                }
            ],
        }],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
    ],
    devServer: {
        contentBase: [
            path.join(__dirname, '../public/pages'),
        ],
        open: true,
        hot: true,
        host: 'localhost',
        port: 8080,
        proxy: {
            '/api': {
                target: 'https://tfcqav.myvtex.com',
                changeOrigin: true,
            },
        },
    },
});
