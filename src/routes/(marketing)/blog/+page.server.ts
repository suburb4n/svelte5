import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	// DO stuff that does not depend on parent

	const parentData = await parent();
	console.log(parentData);
	console.log('🌍 Blog Route Server Load');
	return {
		title: 'The Blog',
		description: 'Our blog posts',
		count: 10
	};
}) satisfies PageServerLoad;
