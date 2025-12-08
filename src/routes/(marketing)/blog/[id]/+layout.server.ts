import type { PostsResponse } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ params, untrack, fetch, depends }) => {
	depends('blog:single_page_layout');
	console.log(
		'blog/[id] layout load',
		untrack(() => params.id)
	);
	const postReq = await fetch(`https://dummyjson.com/posts?limit=3&skip=100`);
	return {
		morePosts: (postReq.ok ? await postReq.json() : { error: 'Something' }) as
			| PostsResponse
			| { error: string }
	};
}) satisfies LayoutServerLoad;
