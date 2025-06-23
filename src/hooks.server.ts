import { type Handle, type HandleServerError } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const handle1: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('%sveltekit.lang%', event.cookies.get('lang') || 'en');
		},
		filterSerializedResponseHeaders: (name) => {
			return name === 'content-type';
		}
	});
	return response;
};

export const handle = sequence(handle1);

export const handleError: HandleServerError = async ({ error, event, status, message }) => {
	console.log(error, event, status, message);
	// Report error and send event for extra context
	// Sentry.captureException(error, {
	// 	extra: { event, status }
	// });
	return {
		message: 'An unexpected error occurred.',
		code: 'UNEXPECTED'
	};
};
