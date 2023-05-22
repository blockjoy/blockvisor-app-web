export const checkForTokenError = (response: any) => {
  if (response?.message?.includes('JWT')) {
    localStorage.clear();
    window.location.href = '/';
  }
};
