import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		title: 'The Blog',
		count: 10
	};
}) satisfies PageServerLoad;
