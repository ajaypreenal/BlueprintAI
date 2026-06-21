import { BACKEND_URL } from './config';

export interface AuthUser {
  email: string | null;
  name: string | null;
  picture: string | null;
}

export function goToGoogleLogin() {
  window.location.href = `${BACKEND_URL}/auth/login`;
}

export async function fetchCurrentUser(): Promise<AuthUser | null> {
  const res = await fetch(`${BACKEND_URL}/auth/me`, { credentials: 'include' });
  if (!res.ok) return null;
  return res.json();
}

export async function logout(): Promise<void> {
  await fetch(`${BACKEND_URL}/auth/logout`, { credentials: 'include' });
}
