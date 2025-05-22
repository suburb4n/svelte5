import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { PostsResponse } from '$lib/types';

export const load = (async ({ fetch }) => {
	// DO stuff that does not depend on parent
	const postsRes = await fetch('/api/posts');
	if (!postsRes.ok) {
		error(postsRes.status, 'An error has occurred!');
	}
	// console.log(postsRes);
	return {
		title: 'The Blog',
		description: 'Our blog posts',
		posts: (await postsRes.json()) as PostsResponse
	};
}) satisfies PageServerLoad;
