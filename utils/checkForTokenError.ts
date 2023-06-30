export const checkForTokenError = (response: any) => {
  if (response?.message?.includes('JWT')) {
    console.log('JWT Error', response.message);
    // localStorage.clear();
    // window.location.href = '/';
  }
};
