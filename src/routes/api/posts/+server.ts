import { error, json, text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch }) => {
	const postsRes = await fetch('https://dummyjson.com/posts');
	const postResJSON = await postsRes.json();
	return json(postResJSON, { status: postsRes.status });
};

export const POST: RequestHandler = async ({ request }) => {
	const post = await request.json();

	if (!post.title) {
		error(400, 'Post title is required!');
	}
	// Insert post into db
	return json({ id: crypto.randomUUID(), title: post.title });
};

export const fallback: RequestHandler = ({ request }) => {
	return text(`${request.method} received!`);
};
