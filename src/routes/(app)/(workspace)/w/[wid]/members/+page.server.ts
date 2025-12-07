import { requireLogin } from '$lib/server/auth';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	// TODO: PAGE AUTH
	requireLogin();
	return {};
}) satisfies PageServerLoad;
