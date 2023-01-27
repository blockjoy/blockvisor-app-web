import jwt from 'jwt-decode';

export function readToken(token: string) {
  const decodedToken = Buffer.from(token, 'base64').toString('ascii');
  return jwt(decodedToken);
}
