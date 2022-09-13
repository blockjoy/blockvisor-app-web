type User = {
  accessToken: string;
};

type LoginSuccess = {
  token: string;
};

type LoginError = {
  code: string;
  message: string;
};

type LoginResponse = LoginSuccess | LoginError;
