export async function handleResponse<T>(
  response: Response,
  fallbackMessage: string
): Promise<T> {
  if (!response.ok) {
    let message = fallbackMessage;

    try {
      const data: unknown = await response.json();

      if (
        typeof data === 'object' &&
        data !== null &&
        'message' in data &&
        typeof data.message === 'string' &&
        data.message.trim()
      ) {
        message = data.message.trim();
      }
    } catch {
      // Response doesn't contain valid JSON.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
