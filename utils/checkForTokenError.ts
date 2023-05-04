export const checkForTokenError = (response: any) => {
  if (response?.message?.includes('token')) {
    localStorage.clear();
    window.location.href = '/';
  }
};
