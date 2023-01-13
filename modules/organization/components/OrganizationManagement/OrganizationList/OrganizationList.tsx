import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { AllOrganizationsTable } from './OrganizationListTable';
import PersonIcon from '@public/assets/icons/person-12.svg';
import { styles } from './OrganizationList.styles';
import { useRecoilState, useRecoilValue } from 'recoil';
import { organizationAtoms } from '../../../store/organizationAtoms';
import { useEffect } from 'react';
import { useGetOrganizations } from '../../../hooks/useGetOrganizations';
import { Button } from '@shared/components';
import { layoutState } from '@modules/layout/store/layoutAtoms';

export const OrganizationsList = () => {
  const memberCount = useRecoilValue(organizationAtoms.organizationMemberCount);
  const orgCount = useRecoilValue(organizationAtoms.organisationCount);
  const { getOrganizations } = useGetOrganizations();

  const [, setLayout] = useRecoilState(layoutState);

  useEffect(() => {
    getOrganizations();
  }, []);

  return (
    <div css={styles.wrapper}>
      <header css={[styles.header, spacing.bottom.large]}>
        All Organizations
        <span css={styles.mobileCreateButton}>
          <Button size="small" onClick={() => setLayout('organization')}>
            Create New
          </Button>
        </span>
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
