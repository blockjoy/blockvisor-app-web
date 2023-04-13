import { ApplicationError } from '@modules/auth/utils/Errors';

export const checkForApiError = (type: string, response: any) => {
  if (!response.code && !response.message) return;

  if (response.code >= 1 || response.code <= 16)
    throw new ApplicationError(type, response?.message ?? 'Unknown');
};
