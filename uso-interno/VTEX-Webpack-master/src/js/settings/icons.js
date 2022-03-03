const loader = '<i class="fas fa-sync fa-spin"></i>'

const iconLeft = `
	<svg class="icon-arrow icon-arrow-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256.13 490.79">
		<path d="M362.67,490.79a10.68,10.68,0,0,1-7.55-3.12L120.45,253a10.68,10.68,0,0,1,0-15.09L355.12,3.26a10.66,10.66,0,1,1,15.34,14.82c-.08.09-.17.17-.26.26L143.09,245.45,370.22,472.57a10.67,10.67,0,0,1-7.55,18.22Z" transform="translate(-117.33 0)" /><path d="M362.67,490.79a10.68,10.68,0,0,1-7.55-3.12L120.45,253a10.68,10.68,0,0,1,0-15.09L355.12,3.26a10.66,10.66,0,1,1,15.34,14.82c-.08.09-.17.17-.26.26L143.09,245.45,370.22,472.57a10.67,10.67,0,0,1-7.55,18.22Z" transform="translate(-117.33 0)"/>
	</svg>
`
const iconRight = `
	<svg class="icon-arrow icon-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256.15 490.8">
		<path d="M135.68,3.13A10.66,10.66,0,0,0,120.6,18.21L347.72,245.35,120.58,472.46a10.67,10.67,0,0,0,14.82,15.35l.26-.27L370.33,252.88a10.68,10.68,0,0,0,0-15.09Z" transform="translate(-117.33 0)" /><path d="M128.13,490.68a10.67,10.67,0,0,1-7.55-18.22L347.72,245.35,120.58,18.23a10.68,10.68,0,1,1,15.1-15.1L370.35,237.8a10.65,10.65,0,0,1,0,15.08L135.68,487.54A10.64,10.64,0,0,1,128.13,490.68Z" transform="translate(-117.33 0)"/>
	</svg>
`

const variables = {
	icones : {
		loader: loader,
		left: iconLeft,
		right: iconRight
	}
}

export default function getVariables(param) {
	return (param !== undefined && param !== null && variables[param] !== undefined) ? variables[param] : variables;
}