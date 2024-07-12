import { toast } from 'sonner';

/**
 * Global error handler for API requests.
 * @param error
 * @param defaultErrorMsg
 */
export const handleApiError = (error: unknown, defaultErrorMsg: string) => {
  let errorMessage = defaultErrorMsg;
  if (error instanceof Error) {
    errorMessage = error.message;
  }
  toast.error(errorMessage);
  throw error;
};
