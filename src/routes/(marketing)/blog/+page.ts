import type { PageLoad } from './$types';
import { env } from '$env/dynamic/public';
import { PUBLIC_TEST, PUBLIC_FROM_DOT_ENV } from '$env/static/public';

export const load = (async ({ data }) => {
	console.log('env from $env/dynamic/public', env);
	console.log('PUBLIC_FROM_DOT_ENV from $env/static/public', PUBLIC_FROM_DOT_ENV);
	console.log('PUBLIC_TEST from $env/static/public', PUBLIC_TEST);
	const module =
		data.postType === 1 ? await import('./Post-1.svelte') : await import('./Post-2.svelte');
	return {
		...data,
		component: module.default
	};
}) satisfies PageLoad;
