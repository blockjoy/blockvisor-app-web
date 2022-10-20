import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { AllOrganizationsTable } from './AllOrganizationsTable';
import PersonIcon from '@public/assets/icons/person-12.svg';
import { flex } from 'styles/utils.flex.styles';
import { useRecoilValue } from 'recoil';
import { organisationAtoms } from '../store/organizationAtoms';
import { NextPage } from 'next';
import { PageSection, PageTitle } from '@shared/components';

export const OrganizationsPage: NextPage = () => {
  const memberCount = useRecoilValue(organisationAtoms.organizationMemberCount);
  const orgCount = useRecoilValue(organisationAtoms.organisationCount);

  return (
    <>
      <PageTitle title="Organization Management"></PageTitle>
      <PageSection>
        <h2 css={spacing.top.large}>Organizations</h2>
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
            {memberCount} users in {orgCount} organizations
          </span>
        </small>

        <section css={spacing.top.xLarge}>
          <AllOrganizationsTable />
        </section>
      </PageSection>
    </>
  );
};
