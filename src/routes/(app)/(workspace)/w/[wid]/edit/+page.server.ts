import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { workspaceSchema } from '$lib/schemas/workspace-schema';
import { db } from '$lib/server/db';
import { workspaces } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error, redirect } from '@sveltejs/kit';
import { fail, message } from 'sveltekit-superforms';

export const load = (async ({ params }) => {
	// TODO: Auth: logged in and can update workspace
	const workspace = await db
		.select({ name: workspaces.name })
		.from(workspaces)
		.where(eq(workspaces.id, params.wid))
		.limit(1)
		.then((r) => r[0]);
	if (!workspace) error(404, 'Not found');
	return {
		form: await superValidate(workspace, zod(workspaceSchema))
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals, params }) => {
		const form = await superValidate(request, zod(workspaceSchema));

		if (!locals.session) {
			return message(form, 'Unauthorized', { status: 401 });
		}

		if (!form.valid) {
			return fail(400, { form });
		}

		// TODO: Auth: check if user can edit the workspace

		const { name } = form.data;

		try {
			const [updatedWorkspace] = await db
				.update(workspaces)
				.set({
					name
				})
				.where(eq(workspaces.id, params.wid))
				.returning({ id: workspaces.id });
			if (!updatedWorkspace) throw new Error('Workspace update failed');
		} catch {
			return message(form, 'An error has occurred!', { status: 500 });
		}
		redirect(303, `/w/${params.wid}`);
		// return message(form, 'Workspace Updated Successfully!');
	}
};
