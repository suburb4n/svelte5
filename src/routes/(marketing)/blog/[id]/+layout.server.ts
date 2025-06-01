import type { PostsResponse } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load = (async () => {
	console.log('blog/[id] layout load');
	const postReq = await fetch(`https://dummyjson.com/posts?limit=3`);
	return {
		morePosts: (postReq.ok ? await postReq.json() : []) as PostsResponse
	};
}) satisfies LayoutServerLoad;
