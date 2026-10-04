import { useEffect } from 'react';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/error';

export function useQueryErrorToast(error: unknown): void {
  useEffect(() => {
    if (error) {
      console.error('Query error:', error);
      toast.error(getErrorMessage(error));
    }
  }, [error]);
}
