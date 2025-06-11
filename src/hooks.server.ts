import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { type Handle, type HandleServerError } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { eq } from 'drizzle-orm';

export const handle1: Handle = async ({ event, resolve }) => {
	event.locals.session = {
		user: (
			await db
				.select()
				.from(users)
				.where(eq(users.id, '3e0bb3d0-2074-4a1e-6263-d13dd10cb0cf'))
				.limit(1)
		)[0],
		session: 'session'
	};

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
