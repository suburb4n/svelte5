import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { userLoginSchema } from '$lib/schemas/login-schema';
import { userRegisterSchema } from '$lib/schemas/register-schema';
import { auth } from '$lib/server/auth';
import { getGravatarUrl } from '$lib/utils';
import { APIError } from 'better-auth/api';
import { env } from '$env/dynamic/private';

export const load = (async ({ locals }) => {
	if (locals.session) {
		redirect(307, '/app');
	}
	return {
		loginForm: await superValidate(zod(userLoginSchema)),
		registerForm: await superValidate(
			{
				email: 'misiw75096@ihnpo.com',
				name: 'Test',
				username: 'test',
				password: '123456789',
				confirmPassword: '123456789'
			},
			zod(userRegisterSchema)
		)
	};
}) satisfies PageServerLoad;

export const actions = {
	register: async ({ request }) => {
		const form = await superValidate(request, zod(userRegisterSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const { username, email, name, password } = form.data;

		try {
			const res = await auth.api.signUpEmail({
				headers: request.headers,
				body: {
					username,
					email,
					name,
					password,
					image: getGravatarUrl(email),
					callbackURL: `${env.BETTER_AUTH_URL}/app`
				}
			});
			return message(form, 'A Confirmation E-mail has been sent to your email address.');
		} catch (error) {
			let errorMessage = 'An error has occurred!';
			if (error instanceof APIError) {
				const duplicateUsername = error?.body?.details?.constraint_name === 'users_username_unique';
				errorMessage = duplicateUsername ? 'Username already exists' : error.message;
			}
			return message(form, errorMessage, { status: 400 });
		}
	}
} satisfies Actions;
