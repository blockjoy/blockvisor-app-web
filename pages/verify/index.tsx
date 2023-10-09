import { Layout } from '@shared/components';
import type { NextPage } from 'next';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { useEffect } from 'react';

const Verify: NextPage = () => {
  useEffect(() => {
    localStorage.removeItem('identity');
  }, []);

  return (
    <Layout title="We have sent a link to your email address.">
      <p css={[typo.small, colors.text3, spacing.bottom.medium]}>
        Check your email and start using BlockJoy!
      </p>
    </Layout>
  );
};

export default Verify;
