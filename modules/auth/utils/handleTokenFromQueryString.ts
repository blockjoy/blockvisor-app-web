import { readToken } from '@shared/utils/readToken';
import { UseFormSetValue } from 'react-hook-form';
import { removeTokenFromUrl } from './removeTokenFromUrl';

export const handleTokenFromQueryString = async (
  token: string,
  setValue: UseFormSetValue<any>,
) => {
  try {
    const tokenObject: any = readToken(token);
    const email =
      tokenObject?.email ||
      tokenObject?.invitee_email ||
      tokenObject?.data?.email;
    if (email) {
      setValue('email', email);
    }
  } catch (error) {
    console.log('error reading token', error);
  }
  // TODO: Needs some thought on how to do this
  // removeTokenFromUrl();
};
