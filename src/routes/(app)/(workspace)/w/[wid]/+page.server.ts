import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { roles, workspaceAccess, workspaces } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';
import { requireLogin } from '$lib/utils';

export const load = (async ({ params }) => {
	// TODO: Page Auth
	const { user } = requireLogin();
	const [wsAccess] = await db
		.select({
			workspaceId: workspaceAccess.workspaceId,
			role: roles.name,
			roldeId: roles.id
		})
		.from(workspaceAccess)
		.innerJoin(roles, eq(workspaceAccess.roleId, roles.id))
		.where(and(eq(workspaceAccess.workspaceId, params.wid), eq(workspaceAccess.userId, user.id)))
		.limit(1);
	console.log('wsAccess', wsAccess);
	return {};
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
