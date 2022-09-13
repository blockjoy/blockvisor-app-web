import { authAtoms } from '@modules/auth/store/atoms';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';

interface Props {
  children?: ReactNode;
}

export function PrivateRoute({ children }: Props) {
  const router = useRouter();
  const token = useRecoilValue(authAtoms.accessTokenAtom);

  if (!token) router.push('/');

  return <>{children}</>;
}
