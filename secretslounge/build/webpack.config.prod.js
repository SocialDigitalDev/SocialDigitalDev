const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.config.base.js');

module.exports = merge(baseConfig, {
    mode: 'production',
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
    },
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,
            use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader', 
        
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
        new MiniCssExtractPlugin({
            filename: 'secrets.[name].css',
            allChunks: true,
        }),
    ],
});
