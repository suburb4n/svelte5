import { and, eq } from 'drizzle-orm';
import { db } from '.';
import { pages, roles, workspaceAccess } from './schema';
import type { User } from 'better-auth';
import defineAbilityFor from '$lib/ability';

export const getWorkspaceIDFromPageID = async (pageId: string) => {
	return (
		await db
			.select({
				workspaceId: pages.workspaceId
			})
			.from(pages)
			.where(eq(pages.id, pageId))
			.limit(1)
	)[0].workspaceId;
};

export const getWorkspaceAccess = async ({
	user,
	workspaceId
}: {
	user: User;
	workspaceId: string;
}) => {
	const [wsAccess] = await db
		.select({
			workspaceId: workspaceAccess.workspaceId,
			role: roles.name,
			roleId: roles.id
		})
		.from(workspaceAccess)
		.innerJoin(roles, eq(workspaceAccess.roleId, roles.id))
		.where(and(eq(workspaceAccess.workspaceId, workspaceId), eq(workspaceAccess.userId, user.id)))
		.limit(1);

	return {
		workspaceAccess: wsAccess,
		ability: defineAbilityFor(user, wsAccess)
	};
};
