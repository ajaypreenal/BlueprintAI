import { BACKEND_URL } from './config';
import { mapBackendToFrontend } from './mapBackendToFrontend';

export async function fetchSession(sessionId: string): Promise<any> {
  const res = await fetch(`${BACKEND_URL}/sessions/${sessionId}`);
  if (!res.ok) {
    return { status: 'error', error: 'Session not found' };
  }
  const session = await res.json();

  if (session.status === 'completed') {
    return { status: 'completed', ...mapBackendToFrontend(session.data) };
  }
  if (session.status === 'error') {
    return { status: 'error', error: session.error };
  }
  return { status: 'processing' };
}

export async function startSession(idea: string, userType: string, region: string): Promise<{ session_id: string }> {
  const res = await fetch(`${BACKEND_URL}/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ idea, user_type: userType, region }),
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.detail || `Request failed (${res.status})`);
  }
  return res.json();
}
