import { Layout } from '@shared/components';
import type { NextPage } from 'next';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { spacing } from 'styles/utils.spacing.styles';

const Verify: NextPage = () => {
  return (
    <Layout title="We have Sent a Link to Your Email Address.">
      <p css={[typo.small, colors.text3, spacing.bottom.medium]}>
        Check your e-mail and start using the app!
      </p>
    </Layout>
  );
};

export default Verify;
