import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { userLoginSchema } from '$lib/schemas/login-schema';
import { userRegisterSchema } from '$lib/schemas/register-schema';

export const load = (async ({ locals }) => {
	if (locals.session) {
		redirect(307, '/app');
	}
	return {
		loginForm: await superValidate(zod(userLoginSchema)),
		registerForm: await superValidate(zod(userRegisterSchema))
	};
}) satisfies PageServerLoad;
