import { env as cfEnv } from "cloudflare:workers";

export function getAdminPassword(): string {
  return (cfEnv as any)?.ADMIN_PASSWORD ?? import.meta.env.ADMIN_PASSWORD ?? '';
}

export function getGithubToken(): string {
  return (cfEnv as any)?.GITHUB_TOKEN ?? import.meta.env.GITHUB_TOKEN ?? '';
}

export function getGithubOwner(): string {
  return (cfEnv as any)?.GITHUB_OWNER ?? import.meta.env.GITHUB_OWNER ?? 'briec2000';
}

export function getGithubRepo(): string {
  return (cfEnv as any)?.GITHUB_REPO ?? import.meta.env.GITHUB_REPO ?? 'briec2000';
}
