export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message.trim()) {
    return error.message.trim();
  }

  if (typeof error !== 'object' || error === null) {
    return 'Something went wrong. Please try again.';
  }

  if ('data' in error) {
    const data = error.data;

    if (
      typeof data === 'object' &&
      data !== null &&
      'message' in data &&
      typeof data.message === 'string' &&
      data.message.trim()
    ) {
      return data.message.trim();
    }

    if (typeof data === 'string' && data.trim()) {
      return data.trim();
    }
  }

  if (
    'error' in error &&
    typeof error.error === 'string' &&
    error.error.trim()
  ) {
    return error.error.trim();
  }

  return 'Something went wrong. Please try again.';
};
