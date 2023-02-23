import { escape } from 'lodash';

//export const escapeHtml = (unsafe: string) => escape(unsafe);

export const escapeHtml = (unsafe: string) =>
  unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
// .replace(/'/g, '&#039;');
