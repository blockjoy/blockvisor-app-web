// import jwt from 'jwt-decode';

export function readToken(token: string) {
  try {
    const middle = token.split('.')[1];
    return JSON.parse(Buffer.from(middle, 'base64').toString());
  } catch (err) {
    console.log('readToken ERROR!! OIDA!!!', token, err);
  }

  // const decodedToken = Buffer.from(token, 'base64').toString('ascii');
  // return jwt(decodedToken);
}
