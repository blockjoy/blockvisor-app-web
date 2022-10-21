import { Layout, Button } from '@shared/components';
import type { NextPage } from 'next';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { spacing } from 'styles/utils.spacing.styles';

const Verified: NextPage = () => {
  return (
    <Layout title="Email has been verified.">
      <p css={[typo.small, colors.text3, spacing.bottom.medium]}>
        Please login to start using BlockVisor!
      </p>
      <Button size="small" style="outline">
        Login Now
      </Button>
    </Layout>
  );
};

export default Verified;
