export const prerender = false;
import type { APIRoute } from 'astro';
import { getGithubToken } from '../../../lib/env';
import { getEvent, saveEvent, uploadImage } from '../../../lib/github';
import { buildMarkdown, slugify } from '../../../lib/markdown';

export const POST: APIRoute = async ({ request, redirect }) => {
  const token = getGithubToken();
  const form = await request.formData();

  const existingSlug = (form.get('_slug') as string ?? '').trim();
  const existingSha  = (form.get('_sha')  as string ?? '').trim();
  const title = (form.get('title') as string ?? '').trim();
  const date  = (form.get('date')  as string ?? '').trim();
  const body  = (form.get('content') as string ?? '').trim();

  if (!title || !date) {
    const back = existingSlug ? `/hibou/event/${existingSlug}/` : '/hibou/event/nouveau/';
    return redirect(`${back}?error=${encodeURIComponent('Titre et date sont obligatoires.')}`);
  }

  // Upload image si un fichier a été fourni
  const imageFile = form.get('image_file') as File | null;
  if (imageFile && imageFile.size > 0) {
    const ext = (imageFile.name.split('.').pop() ?? 'jpg').toLowerCase();
    const imageSlug = existingSlug || `${date}-${slugify(title)}`;
    const repoPath = `src/assets/events/${imageSlug}.${ext}`;
    try {
      const bytes = new Uint8Array(await imageFile.arrayBuffer());
      const imagePath = await uploadImage(token, repoPath, bytes);
      form.set('image', imagePath);
    } catch (e) {
      const back = existingSlug ? `/hibou/event/${existingSlug}/` : '/hibou/event/nouveau/';
      return redirect(`${back}?error=${encodeURIComponent('Erreur upload image : ' + String(e))}`);
    }
  }

  const markdown = buildMarkdown(form, body);

  if (existingSlug) {
    let sha = existingSha;
    if (!sha) {
      try { sha = (await getEvent(token, existingSlug)).sha; } catch { /* ignore */ }
    }
    try {
      await saveEvent(token, existingSlug, markdown, sha || undefined);
      return redirect('/hibou/?notice=' + encodeURIComponent('Modifications sauvegardées.'));
    } catch (e) {
      return redirect(`/hibou/event/${existingSlug}/?error=${encodeURIComponent(String(e))}`);
    }
  }

  // Création : slug unique
  let slug = `${date}-${slugify(title)}`;
  try {
    let counter = 2;
    while (true) {
      try { await getEvent(token, slug); slug = `${date}-${slugify(title)}-${counter++}`; }
      catch { break; }
    }
    await saveEvent(token, slug, markdown);
    return redirect('/hibou/?notice=' + encodeURIComponent(`Événement créé : ${slug}`));
  } catch (e) {
    return redirect(`/hibou/event/nouveau/?error=${encodeURIComponent(String(e))}`);
  }
};
