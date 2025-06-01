import type { LayoutServerLoad } from './$types';

export const load = (async () => {
	console.log('(marketing) layout load');
	return {
		marketingLayoutData: 'Some data'
	};
}) satisfies LayoutServerLoad;
