export function readToken(token: string) {
  try {
    const middle = token.split('.')[1];
    return JSON.parse(Buffer.from(middle, 'base64').toString());
  } catch (err) {
    console.log('readToken ERROR!! OIDA!!!', token, err);
  }
}
