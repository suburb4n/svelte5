import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/auth';
import { requireLogin } from '$lib/server/auth';

export const load = (async () => {
	requireLogin();

	return {};
}) satisfies PageServerLoad;

export const actions = {
	logout: async ({ request, cookies, locals }) => {
		try {
			const res = await auth.api.signOut({
				headers: request.headers,
				asResponse: true
			});
			if (res.status === 200) {
				cookies.delete('better-auth.session_token', {
					path: '/'
				});
				locals.session = null;
			} else {
				return fail(400, { message: 'Error signing out.' });
			}
		} catch {
			return fail(400, { message: 'Error signing out.' });
		}
		redirect(303, '/signin');
	}
};
