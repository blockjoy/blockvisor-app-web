import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { AllOrganizationsTable } from './OrganizationListTable';
import PersonIcon from '@public/assets/icons/person-12.svg';
import { styles } from './OrganizationList.styles';
import { useRecoilValue } from 'recoil';
import { organizationAtoms } from '../../../store/organizationAtoms';
import { useEffect } from 'react';
import { useGetOrganizations } from '../../../hooks/useGetOrganizations';

export const OrganizationsList = () => {
  const memberCount = useRecoilValue(organizationAtoms.organizationMemberCount);
  const orgCount = useRecoilValue(organizationAtoms.organisationCount);
  const { getOrganizations } = useGetOrganizations();

  useEffect(() => {
    getOrganizations();
  }, []);

  return (
    <div css={styles.wrapper}>
      <header css={[styles.header, spacing.bottom.large]}>
        All Organizations
      </header>
      {/* <small css={[spacing.top.mediumSmall, typo.microlabel, typo.uppercase]}>
        <span css={colors.text2}>
          <PersonIcon />{' '}
        </span>
        <span css={[spacing.left.small, colors.text4]}>
          {memberCount} users in {orgCount} organizations
        </span>
      </small> */}
      <section css={spacing.top.large}>
        <AllOrganizationsTable />
      </section>
    </div>
  );
};
