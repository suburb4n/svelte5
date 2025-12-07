import { db } from '$lib/server/db';
import { notes, pages, users } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { requireLogin } from '$lib/server/auth';
import defineAbilityFor from '$lib/ability';
import { subject } from '@casl/ability';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ params, parent }) => {
	const { user } = requireLogin();

	const { workspaceAccess, pageAccess } = await parent();
	const ability = defineAbilityFor(user, workspaceAccess, pageAccess);

	if (ability.cannot('read', subject('Page', { id: params.pid }))) {
		redirect(307, '/access-denied');
	}

	async function getPage() {
		const page = await db
			.select()
			.from(pages)
			.where(eq(pages.id, params.pid))
			.limit(1)
			.then((r) => r[0]);
		return page;
	}

	async function getNotes() {
		const _notes = await db
			.select({
				id: notes.id,
				content: notes.content,
				userId: notes.userId,
				pageId: notes.pageId,
				username: users.name
			})
			.from(notes)
			.innerJoin(users, eq(notes.userId, users.id))
			.where(eq(notes.pageId, params.pid))
			.orderBy(desc(notes.createdAt));

		return _notes;
	}

	// const [page, _notes] = await Promise.all([getPage(), getNotes()]);

	return {
		notes: getNotes(),
		page: await getPage()
	};
}) satisfies PageServerLoad;
