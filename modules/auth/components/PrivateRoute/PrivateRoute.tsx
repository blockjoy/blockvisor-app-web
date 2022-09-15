import { authAtoms } from '@modules/auth/store/authAtoms';
import { getUser } from '@shared/utils/browserStorage';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useRecoilState } from 'recoil';

interface Props {
  children?: ReactNode;
}

export function PrivateRoute({ children }: Props) {
  const router = useRouter();
  const [user, setUser] = useRecoilState(authAtoms.user);

  useEffect(() => {
    if (!getUser()) {
      setUser(null);
      router.push('/');
    }
  }, [user, router.route]);

  return <>{children}</>;
}
