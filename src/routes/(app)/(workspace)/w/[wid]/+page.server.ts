import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { workspaces } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { requireLogin } from '$lib/utils';
import { subject } from '@casl/ability';
import { getWorkspaceAccess } from '$lib/server/db/utils';

export const load = (async ({ params }) => {
	// TODO: Page Auth
	const { user } = requireLogin();

	const { workspaceAccess, ability } = await getWorkspaceAccess({ user, workspaceId: params.wid });

	if (ability.cannot('read', subject('Workspace', { id: params.wid }))) {
		redirect(307, '/access-denied');
	}
	return {
		workspaceAccess
	};
}) satisfies PageServerLoad;

export const actions = {
	deleteWorkspace: async ({ locals, params }) => {
		if (!locals.session) {
			return fail(401, { message: 'Unauthorized' });
		}

		// TODO: Auth: check if user can delete ws

		try {
			const [deletedWorkspace] = await db
				.delete(workspaces)
				.where(eq(workspaces.id, params.wid))
				.returning({ id: workspaces.id });
			if (!deletedWorkspace) {
				throw new Error('Workspace delete failed.');
			}
		} catch {
			return fail(500, { message: 'An error has occurred' });
		}
		redirect(303, '/app');
	}
} satisfies Actions;
