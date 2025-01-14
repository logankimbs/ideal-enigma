import { LoginResponse } from '@ideal-enigma/common';

interface ApiRequestOptions<TBody = unknown> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  headers?: Record<string, string>;
  body?: TBody;
}

async function gateway<T>(options: ApiRequestOptions): Promise<T> {
  const { method, path, headers, body } = options;
  const input = `${process.env.FRONTEND_URL}/api/gateway`;
  const init: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify({
      method,
      path,
      body: body ? JSON.stringify(body) : undefined,
    }),
  };

  try {
    const response = await fetch(input, init);
    return await response.json();
  } catch (error) {
    console.error(`Gateway request failed: ${error}`);
    throw error;
  }
}

export async function validateCode(code: string) {
  return await gateway<{ url: string }>({
    method: 'GET',
    path: `auth/code/validate/${code}`,
  });
}

export async function loginUser(code: string, state: string) {
  return await gateway<LoginResponse>({
    method: 'POST',
    path: 'slack/login',
    body: { code, state },
  });
}

export async function enableNotifications(userIds: string[]) {
  return await gateway({
    method: 'POST',
    path: 'users/enableNotifications',
    body: { userIds },
  });
}

export async function updateUserOnboardingStatus(userId: string) {
  return await gateway({
    method: 'PUT',
    path: `users/${userId}/completeOnboarding`,
  });
}

export async function sendWelcomeMessage(teamId: string) {
  return await gateway({
    method: 'POST',
    path: `slack/message/welcome`,
    body: { teamId },
  });
}
