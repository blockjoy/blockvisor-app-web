import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { PageHeader, PageSection } from '@modules/app/components/shared';

export const HostAdd = () => {
  return (
    <PageSection>
      <>
        <PageHeader>Host Add</PageHeader>
        <>
          <h2 css={typo.base}>Great news, your host is being provisioned.</h2>
          <p
            css={[
              typo.small,
              colors.text3,
              spacing.top.small,
              spacing.bottom.large,
            ]}
          >
            Please follow the steps below to complete the installation process.
          </p>
        </>
      </>
    </PageSection>
  );
};
