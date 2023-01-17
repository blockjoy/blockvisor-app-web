function isValidEmail(email?: string) {
  const emailRegex = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/, 'i');
  if (email) return emailRegex.test(email)

  return emailRegex;
}

export { isValidEmail };
