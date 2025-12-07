import type { HandleClientError } from '@sveltejs/kit';

export const handleError: HandleClientError = async ({ error, event, status, message }) => {
	console.log(error, event, status, message);
	// Report error and send event for extra context
	// Sentry.captureException(error, {
	// 	extra: { event, status }
	// });
	return {
		message: 'An unexpected client error occurred.',
		code: 'UNEXPECTED'
	};
};
