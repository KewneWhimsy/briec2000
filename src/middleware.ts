import { defineMiddleware } from 'astro:middleware';
import { SESSION_COOKIE, hashPassword } from './lib/auth';
import { getAdminPassword } from './lib/env';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  if (!pathname.startsWith('/hibou') && !pathname.startsWith('/api/hibou')) return next();

  const isLoginPage = pathname === '/hibou/login' || pathname === '/hibou/login/';
  const isLoginApi  = pathname === '/api/hibou/login' || pathname === '/api/hibou/login/';
  if (isLoginPage || isLoginApi) return next();

  const adminPassword = getAdminPassword();
  if (!adminPassword) return new Response('ADMIN_PASSWORD non configuré', { status: 500 });

  const session = context.cookies.get(SESSION_COOKIE);
  const expected = await hashPassword(adminPassword);

  if (session?.value !== expected) return context.redirect('/hibou/login/');
  return next();
});
