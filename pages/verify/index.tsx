import { Layout, LoadingSpinner } from '@shared/components';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { getUser } from '@shared/utils/browserStorage';
import { isUserVerified } from '@modules/auth';

const Verify: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (isUserVerified(getUser())) {
      router.replace('/dashboard', undefined, { shallow: true });
    }
  }, []);

  if (!isUserVerified(getUser())) {
    return (
      <Layout title="We have Sent a Link to Your Email Address.">
        <p css={[typo.small, colors.text3, spacing.bottom.medium]}>
          Check your e-mail and start using BlockVisor!
        </p>
      </Layout>
    );
  }

  return <LoadingSpinner size="page" />;
};

export default Verify;
