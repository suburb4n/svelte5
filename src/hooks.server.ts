import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const handle1: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/posts')) {
		redirect(308, '/blog');
		// return new Response('custom response');
	}
	const response = await resolve(event);
	return response;
};

export const handle = sequence(handle1);
