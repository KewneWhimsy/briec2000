import { getGithubOwner, getGithubRepo } from './env';

const BRANCH = 'master';

function base() {
  return `https://api.github.com/repos/${getGithubOwner()}/${getGithubRepo()}/contents`;
}

function encodeUtf8(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

function decodeBase64(b64: string): string {
  const binary = atob(b64.replace(/\n/g, ''));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

async function ghFetch(token: string, path: string, init: RequestInit = {}) {
  if (!token && init.method && init.method !== 'GET') {
    throw new Error('GITHUB_TOKEN manquant — redémarre bun dev après avoir créé .dev.vars');
  }
  const url = `${base()}/${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      'User-Agent': 'briec2000-admin/1.0',
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub ${res.status} sur ${path} (token: ${token ? token.slice(0,8)+'…' : 'VIDE'}): ${body}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export interface GHFile { content: string; sha: string }

export async function listEvents(token: string): Promise<Array<{ name: string; sha: string }>> {
  const files = await ghFetch(token, 'src/content/events');
  return (files as any[]).filter(f => f.type === 'file' && f.name.endsWith('.md'));
}

export async function getEvent(token: string, slug: string): Promise<GHFile> {
  const f = await ghFetch(token, `src/content/events/${slug}.md`);
  return { content: decodeBase64(f.content), sha: f.sha };
}

export async function saveEvent(token: string, slug: string, content: string, sha?: string): Promise<void> {
  await ghFetch(token, `src/content/events/${slug}.md`, {
    method: 'PUT',
    body: JSON.stringify({
      message: sha ? `chore: modifier ${slug}` : `chore: créer ${slug}`,
      content: encodeUtf8(content),
      branch: BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });
}

export async function uploadImage(token: string, repoPath: string, data: Uint8Array): Promise<string> {
  let sha: string | undefined;
  try { sha = (await ghFetch(token, repoPath)).sha; } catch { /* nouveau fichier */ }

  let binary = '';
  for (const byte of data) binary += String.fromCharCode(byte);

  await ghFetch(token, repoPath, {
    method: 'PUT',
    body: JSON.stringify({
      message: `chore: image ${repoPath.split('/').pop()}`,
      content: btoa(binary),
      branch: BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });

  return `/${repoPath}`;
}

export async function deleteEvent(token: string, slug: string, sha: string): Promise<void> {
  await ghFetch(token, `src/content/events/${slug}.md`, {
    method: 'DELETE',
    body: JSON.stringify({ message: `chore: supprimer ${slug}`, sha, branch: BRANCH }),
  });
}
