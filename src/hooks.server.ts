import { type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const handle1: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');

	// if (!token && event.route.id?.startsWith('/(app)')) {
	// 	redirect(307, '/signin');
	// }

	event.locals.user = token ? { name: 'John', id: 1 } : null;

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('%sveltekit.lang%', event.cookies.get('lang') || 'en');
		}
	});
	return response;
};

export const handle = sequence(handle1);
