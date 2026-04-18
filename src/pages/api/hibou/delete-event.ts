export const prerender = false;
import type { APIRoute } from 'astro';
import { getGithubToken } from '../../../lib/env';
import { getEvent, deleteEvent } from '../../../lib/github';

export const POST: APIRoute = async ({ request, redirect }) => {
  const token = getGithubToken();
  const form = await request.formData();
  const slug = (form.get('slug') as string ?? '').trim();

  if (!slug || slug.includes('..') || slug.includes('/')) return redirect('/hibou/');

  try {
    const { sha } = await getEvent(token, slug);
    await deleteEvent(token, slug, sha);
    return redirect('/hibou/?notice=' + encodeURIComponent('Événement supprimé.'));
  } catch (e) {
    return redirect('/hibou/?error=' + encodeURIComponent(String(e)));
  }
};
