export const checkForTokenError = (response: any) => {
  if (response?.message?.includes('JWT')) {
    localStorage.removeItem('identity');
    window.location.href = '/';
  }
};
