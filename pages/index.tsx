import { useIdentity } from '@modules/auth';
import { LoadingSpinner } from '@shared/components';
import { ROUTES } from '@shared/index';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Index: NextPage = () => {
  const { isLoggedIn, isLoading } = useIdentity();
  const router = useRouter();
  useEffect(() => {
    router.push('/closed');
  }, []);

  if (isLoading) {
    return <LoadingSpinner size="page" />;
  }

  return null;
};

export default Index;
