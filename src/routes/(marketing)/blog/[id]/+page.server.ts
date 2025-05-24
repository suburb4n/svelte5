// import type { PageLoad } from './$types';

import type { Post, PostComment } from '$lib/types.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params, fetch }) => {
	async function fetchPost() {
		console.log('Fetch post started');
		const postRes = await fetch(`https://dummyjson.com/posts/${params.id}`);
		if (postRes.status !== 200) {
			error(postRes.status, 'Failed to load post.');
		}
		const postResJSON: Post = await postRes.json();
		console.log('Fetch post ended');
		return postResJSON;
	}

	async function fetchComments() {
		console.log('Fetch comments started');
		const postCommentsRes = await fetch(`https://dummyjson.com/posts/${params.id}/comments`);
		const commentsArray: PostComment[] = postCommentsRes.ok
			? (await postCommentsRes.json()).comments
			: [];
		console.log('Fetch comments ended');
		return commentsArray;
	}
	const commentsPromise = fetchComments();
	const post = await fetchPost();
	return {
		comments: commentsPromise,
		post,
		title: post.title,
		description: post.body.slice(0, 200)
	};
};
