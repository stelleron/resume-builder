// src/routes/login/+page.server.ts
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ cookies }) => {
		// Set session cookie after successful login
		cookies.set('session', 'your-session-token', {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: false, // set true in production with HTTPS
			maxAge: 60 * 60 * 24
		});
	}
};
