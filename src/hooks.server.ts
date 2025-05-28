import { type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const handle1: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	return response;
};

export const handle = sequence(handle1);
