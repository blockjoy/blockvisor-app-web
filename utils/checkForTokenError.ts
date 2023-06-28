export const checkForTokenError = (response: any) => {
  console.log('checking for token error');
  if (
    response?.message?.includes('JWT') ||
    response?.message?.includes('PERMISSION_DENIED')
  ) {
    localStorage.clear();
    window.location.href = '/';
  }
};
