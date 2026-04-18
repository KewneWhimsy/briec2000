export const prerender = false;
import type { APIRoute } from 'astro';
import { SESSION_COOKIE, hashPassword } from '../../../lib/auth';
import { getAdminPassword } from '../../../lib/env';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const password = (form.get('password') as string) ?? '';
  const adminPassword = getAdminPassword();

  if (!adminPassword || !password) return redirect('/hibou/login/?error=1');

  const submitted = await hashPassword(password);
  const expected = await hashPassword(adminPassword);
  if (submitted !== expected) return redirect('/hibou/login/?error=1');

  cookies.set(SESSION_COOKIE, expected, {
    httpOnly: true, sameSite: 'lax', maxAge: 60 * 60 * 24 * 30, path: '/',
  });
  return redirect('/hibou/');
};
