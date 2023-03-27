// import { escape } from 'lodash';
//export const escapeHtml = (unsafe: string) => escape(unsafe);

export const escapeHtml = (unsafe: string) => {
  if (!unsafe?.length) {
    console.log('escapeHtml', unsafe);
    return '';
  }

  return (
    unsafe
      // .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  );
  // .replace(/"/g, '&quot;');
  // .replace(/'/g, '&#039;');
};
