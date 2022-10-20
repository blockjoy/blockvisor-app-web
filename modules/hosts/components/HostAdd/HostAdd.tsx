import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { PageHeader, PageSection } from '@modules/app/components/shared';

export const HostAdd = () => {
  return (
    <PageSection>
      <>
        <PageHeader>Add Host</PageHeader>
        <>
          <h2 css={typo.base}>Let's create a new host.</h2>
          <p
            css={[
              typo.small,
              colors.text3,
              spacing.top.small,
              spacing.bottom.large,
            ]}
          >
            Please enter the information below to get started.
          </p>
        </>
      </>
    </PageSection>
  );
};
