import type { PageLoad } from './$types';

export const load = (async ({ data, fetch }) => {
	console.log('Blog universal load');
	const res = await fetch(`https://dummyjson.com/posts`);
	console.log(res.headers.get('content-type'));
	const module =
		data.postType === 1 ? await import('./Post-1.svelte') : await import('./Post-2.svelte');
	return {
		...data,
		component: module.default,
		posts: await res.json()
	};
}) satisfies PageLoad;
