const { NodeSiteClient: listen } = require('nodesite.eu');
const { readdirSync } = require('fs');

function map (path: string, file: string, fn: Function | null = null) {
	listen('nTrophy', path, fn, file);
	return { map };
}


map('/', '.', () => ({
	head: {
		'Content-Type': 'text/html'
	},
	body: readdirSync('.').map((fn: string) => `<a href="${fn}">${fn}</a>`).join('<br>')
}));

['1data', '2data'].forEach((dir: string) => {
	map(`/${dir}`, dir, () => ({
		head: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(readdirSync(dir))
	}));
});