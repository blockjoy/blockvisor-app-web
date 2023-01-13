import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AcceptInvite: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/?redirect=organizations&invited=true');
  }, []);

  return null;
};

export default AcceptInvite;
