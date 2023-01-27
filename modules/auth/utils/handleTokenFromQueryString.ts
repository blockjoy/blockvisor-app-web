import { readToken } from '@shared/utils/readToken';
import { UseFormSetValue } from 'react-hook-form';
import { removeTokenFromUrl } from './removeTokenFromUrl';

export const handleTokenFromQueryString = async (
  token: string,
  setValue: UseFormSetValue<{ email: string }>,
) => {
  try {
    const tokenObject: any = readToken(
      Buffer.from(token?.toString(), 'binary').toString('base64'),
    );
    console.log('tokenObject', tokenObject);
    const email = tokenObject?.email || tokenObject?.invitee_email;
    if (email) {
      setValue('email', email);
    }
  } catch (error) {
    console.log('error reading token', error);
  }
  removeTokenFromUrl();
};
