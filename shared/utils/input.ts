import { sanitize } from 'dompurify';

export function stripAndSanitize(dirtyHtmlString: string) {
  return sanitize(dirtyHtmlString, { USE_PROFILES: { html: false } });
}
