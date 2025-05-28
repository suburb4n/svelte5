import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies, route }) => {
	const token = cookies.get('token');
	if (!token && route.id?.startsWith('/(app)')) {
		redirect(307, '/signin');
	}
	return {
		user: token ? { name: 'John', id: 1 } : null
	};
}) satisfies LayoutServerLoad;
