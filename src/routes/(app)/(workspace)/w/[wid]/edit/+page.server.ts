import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { workspaceSchema } from '$lib/schemas/workspace-schema';
import { db } from '$lib/server/db';
import { workspaces } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error, redirect } from '@sveltejs/kit';
import { fail, message } from 'sveltekit-superforms';
import { requireLogin } from '$lib/server/auth';
import { getWorkspaceAccess } from '$lib/server/db/utils';
import { subject } from '@casl/ability';

export const load = (async ({ params }) => {
	const { user } = requireLogin();
	const { ability, workspaceAccess } = await getWorkspaceAccess({ user, workspaceId: params.wid });

	if (ability.cannot('update', subject('Workspace', { id: params.wid }))) {
		redirect(307, '/access-denied');
	}

	const workspace = await db
		.select({ name: workspaces.name })
		.from(workspaces)
		.where(eq(workspaces.id, params.wid))
		.limit(1)
		.then((r) => r[0]);
	if (!workspace) error(404, 'Not found');
	return {
		form: await superValidate(workspace, zod(workspaceSchema)),
		workspaceAccess
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

		const { ability } = await getWorkspaceAccess({
			user: locals.session.user,
			workspaceId: params.wid
		});
		if (ability.cannot('update', subject('Workspace', { id: params.wid }))) {
			return message(form, 'Unauthorized', { status: 401 });
		}

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
