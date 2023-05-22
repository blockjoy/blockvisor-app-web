import jwt from 'jwt-decode';

export function readToken(token: string) {
  const middle = token.split('.')[1];
  return JSON.parse(Buffer.from(middle, 'base64').toString());

  // const decodedToken = Buffer.from(token, 'base64').toString('ascii');
  // return jwt(decodedToken);
}
