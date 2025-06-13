import { eq } from 'drizzle-orm';
import { db } from '.';
import { pages } from './schema';

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
