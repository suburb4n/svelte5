import { requireLogin } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	// TODO: PAGE AUTH
	requireLogin();
	return {};
}) satisfies PageServerLoad;
