// import escape from 'lodash/escape';
//export const escapeHtml = (unsafe: string) => escape(unsafe);

export const escapeHtml = (unsafe: string) => {
  if (!unsafe?.length) {
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
