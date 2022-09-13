function isLoginSuccess(value: unknown): value is LoginSuccess {
  return (value as LoginSuccess).token !== undefined;
}

export { isLoginSuccess };
