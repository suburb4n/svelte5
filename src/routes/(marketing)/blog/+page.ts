import type { PageLoad } from './$types';

export const load = (async () => {
	console.log('🌍 Blog Route Universal Load');
	return {
		title: 'The Blog',
		count: 10
	};
}) satisfies PageLoad;
