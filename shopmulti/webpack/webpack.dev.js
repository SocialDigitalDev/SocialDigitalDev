const path = require('path')
const entry = require('webpack-glob-entry')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { PATHS } = require('./utils/constants')
const commonRules = require('./common/rules')
const commonPlugins = require('./common/plugins')

const config = env => {
	return {
		entry: entry(`${PATHS.pages}/**/*.js`, `${PATHS.global}/*.js`),
		output: {
			path: path.resolve(__dirname, PATHS.dist),
			filename: 'arquivos/[name].js'
		},
		devServer: {
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
				"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
			}
		},
		module: {
			rules: [
				...commonRules,
			],
		},
		plugins: [
			...commonPlugins,
			new MiniCssExtractPlugin({
				filename: '/arquivos/[name].css'
			}),
			new BrowserSyncPlugin({
				open: false,
				cors: true,
				https: true,
				ui: false,
				host: `${env.STORE_NAME}.vtexlocal.com.br`,
				startpath: '/admin/login/',
				proxy: `https://${env.STORE_NAME}.myvtex.com`,
				serveStatic: [
					{
						route: '/arquivos',
						dir: `${PATHS.dist}/arquivos/`,
					},
				],
			}),
		],
	}
}

module.exports = config