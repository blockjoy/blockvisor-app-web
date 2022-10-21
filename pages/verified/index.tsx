import { Layout } from '@shared/components';
import type { NextPage } from 'next';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { apiClient } from '@modules/client';

const Verified: NextPage = () => {
  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      const { token } = query;

      const response: any = await apiClient.registration_confirmation(
        token?.toString()!,
      );

      console.log('verified', response);

      console.log(query.token);
    })();
  }, []);

  return (
    <Layout title="Email being verified.">
      <p css={[typo.small, colors.text3, spacing.bottom.medium]}>
        You will be redirected to the dashboard once complete.
      </p>
    </Layout>
  );
};

export default Verified;
