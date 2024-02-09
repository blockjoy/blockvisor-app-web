import { escapeHtml } from '@shared/utils/escapeHtml';

export const capitalized = (word: string) => {
  if (!word) return;
  const result = word.replace(/([A-Z])/g, ' $1');
  return escapeHtml(result.charAt(0).toUpperCase() + result.slice(1));
};
