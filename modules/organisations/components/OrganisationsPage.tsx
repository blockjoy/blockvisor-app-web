import { FC } from 'react';
import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';

import { AllOrganisationsTable } from './AllOrganisationsTable';
import PersonIcon from '@public/assets/icons/person-12.svg';
import { flex } from 'styles/utils.flex.styles';
import { PageTitle } from '@modules/app/components/page-title/PageTitle';
import { PageSection } from '@modules/app/components/shared';
import { useOrganisations } from '../hooks/useOrganisations';

export const OrganisationsPage: FC = () => {
  const { noOfMembers, noOfOrganisations } = useOrganisations();
  return (
    <>
      <PageTitle title="Organisation Management"></PageTitle>
      <PageSection>
        <h2 css={spacing.top.large}>Organisations</h2>
        <small
          css={[
            spacing.top.mediumSmall,
            typo.microlabel,
            typo.uppercase,
            flex.display.flex,
            flex.align.center,
          ]}
        >
          <span css={colors.text2}>
            <PersonIcon />{' '}
          </span>
          <span css={[spacing.left.small, colors.text4]}>
            {noOfMembers} users in {noOfOrganisations} organisations
          </span>
        </small>

        <section css={spacing.top.xLarge}>
          <AllOrganisationsTable />
        </section>
      </PageSection>
    </>
  );
};
