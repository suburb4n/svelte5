import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.session) {
		redirect(307, '/signin');
	}
	return {};
}) satisfies PageServerLoad;

export const actions = {
	createWorkspace: async ({ request, locals }) => {
		if (!locals.session) {
			return fail(401, { message: 'Unauthorized', name: '' });
		}
		const data = await request.formData();
		const name = data.get('name');
		if (!name) {
			return fail(400, { message: 'Name is Required!', name: '' });
		}
		if (name.toString().length < 4) {
			return fail(400, { message: 'Name is too short!', name });
		}

		// Create Workspace

		return { message: 'Workspace created successfully!' };
	}
} satisfies Actions;
