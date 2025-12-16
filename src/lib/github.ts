export type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
};

export type GitHubProfile = {
  login: string;
  name: string | null;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
  avatar_url: string;
  company: string | null;
  location: string | null;
  blog: string | null;
};

const username = import.meta.env.VITE_GITHUB_USERNAME || 'NPFernando';
const token = import.meta.env.VITE_GITHUB_TOKEN;

const headers: Record<string, string> = {
  Accept: 'application/vnd.github+json',
};

if (token) {
  headers.Authorization = `Bearer ${token}`;
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`GitHub request failed: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function getGitHubProfile(): Promise<GitHubProfile> {
  return fetchJson<GitHubProfile>(`https://api.github.com/users/${username}`);
}

export async function getRecentRepos(limit = 6): Promise<GitHubRepo[]> {
  const repos = await fetchJson<GitHubRepo[]>(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}`,
  );
  return repos;
}
