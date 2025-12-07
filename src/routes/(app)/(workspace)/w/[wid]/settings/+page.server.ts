import { getWorkspaceAccess } from '$lib/server/db/utils';
import { requireLogin } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { subject } from '@casl/ability';

export const load = (async ({ params }) => {
	const { user } = requireLogin();
	const { ability, workspaceAccess } = await getWorkspaceAccess({ user, workspaceId: params.wid });

	if (
		ability.cannot('update', subject('Workspace', { id: params.wid })) &&
		ability.cannot('delete', subject('Workspace', { id: params.wid }))
	) {
		redirect(307, '/access-denied');
	}
	return {
		workspaceAccess
	};
}) satisfies PageServerLoad;
