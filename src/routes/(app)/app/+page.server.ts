import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		redirect(307, 'signin');
	}
	// await parent();
	// load page data
	return {};
}) satisfies PageServerLoad;
