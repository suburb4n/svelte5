import { getWorkspaceAccess, getWorkspaceIDFromPageID } from '$lib/server/db/utils';
import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { pageAccess, pages, workspaces } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';
import { requireLogin } from '$lib/server/auth';
import { subject } from '@casl/ability';

export const load = (async ({ locals, route, params, untrack }) => {
	const { user } = requireLogin();
	// TODO: Auth
	const isPage = untrack(() => route.id).startsWith('/(app)/(workspace)/p/[pid]');
	const workspaceId =
		isPage && params.pid ? await getWorkspaceIDFromPageID(params.pid) : params.wid;

	if (!workspaceId) {
		error(404, 'Not Found!');
	}

	const {
		ability,
		workspaceAccess,
		pageAccess: pAccess
	} = await getWorkspaceAccess({
		user,
		workspaceId,
		pageId: params.pid
	});

	if (ability.cannot('read', subject('Workspace', { id: workspaceId }))) {
		redirect(307, '/access-denied');
	}

	const workspace = await db
		.select()
		.from(workspaces)
		.where(eq(workspaces.id, workspaceId))
		.limit(1)
		.then((r) => r[0]);

	if (!workspace) {
		error(404, 'Not Found!');
	}
	const userPages = await db
		.select({
			id: pages.id,
			title: pages.title,
			createdAt: pages.createdAt
		})
		.from(pages)
		.innerJoin(pageAccess, eq(pages.id, pageAccess.pageId))
		.where(
			and(eq(pages.workspaceId, workspaceId), eq(pageAccess.userId, locals.session?.user.id || ''))
		);
	return {
		workspace,
		pages: userPages,
		workspaceAccess,
		pageAccess: pAccess,
		workspaceId
	};
}) satisfies LayoutServerLoad;
