const path = require('path')
const fs = require('fs')

// COMENTADO ATÉ SURGIR NOVA SOLUÇÃO! DESCOMENTAR QUANDO RESOLVER!

// const PATHS = {
// 	src: path.join(__dirname, '/src'),
// 	styles: path.join(__dirname, '/src/styles'),
// 	dist: path.join(__dirname, '/dist'),
// 	global: path.join(__dirname, '/src/global'),
// 	pages: path.join(__dirname, '/src/pages'),
// 	pagesDist: path.join(__dirname, '/dist/pages'),
// 	templates: path.join(__dirname, '/src/templates'),
// 	templatesDist: path.join(__dirname, '/dist/templates'),
// }

const PATHS = {
	src: 'c:/users/social full commerce/documents/projetos/social/social/vtex-base-2/src',
	styles: 'c:/users/social full commerce/documents/projetos/social/social/vtex-base-2/src/styles',
	dist: 'c:/users/social full commerce/documents/projetos/social/social/vtex-base-2/dist',
	global: 'c:/users/social full commerce/documents/projetos/social/social/vtex-base-2/src/global',
	pages: 'c:/users/social full commerce/documents/projetos/social/social/vtex-base-2/src/pages',
	pagesDist: 'c:/users/social full commerce/documents/projetos/social/social/vtex-base-2/dist/pages',
	templates: 'c:/users/social full commerce/documents/projetos/social/social/vtex-base-2/src/templates',
	templatesDist: 'c:/users/social full commerce/documents/projetos/social/social/vtex-base-2/dist/templates',
}

const PAGES = fs.readdirSync(`${PATHS.pages}/`)

const CUSTOM_TEMPLATES = fs.readdirSync(`${PATHS.templates}/Custom`)
const SUB_TEMPLATES = fs.readdirSync(`${PATHS.templates}/Sub/`)
const SHELVES_TEMPLATES = fs.readdirSync(`${PATHS.templates}/Shelves`)

module.exports = {
	PAGES,
	CUSTOM_TEMPLATES,
	SUB_TEMPLATES,
	SHELVES_TEMPLATES,
	PATHS,
}