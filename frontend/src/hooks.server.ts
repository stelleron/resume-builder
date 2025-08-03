// hooks.server.ts
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Assume you're using cookies to track login
	const session = event.cookies.get('session');

	// Protect all routes except login
	if (!session && event.url.pathname !== '/login') {
		return Response.redirect(new URL('/login', event.url), 303);
	}

	// If logged in, proceed
	return resolve(event);
};
