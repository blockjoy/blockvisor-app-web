import { styles } from './OrganizationManagement.styles';
import { OrganizationInvitations } from './OrganizationInvitations/OrganizationInvitations';
import { OrganizationsList } from './OrganizationList/OrganizationList';
import { PageTitle } from '@shared/components';
import { useRecoilValue } from 'recoil';
import { organizationAtoms } from '@modules/organization/store/organizationAtoms';
import { wrapper } from 'styles/wrapper.styles';
import { PropsWithChildren, useEffect } from 'react';
import router from 'next/router';
import { useDefaultOrganization } from '@modules/organization/hooks/useDefaultOrganization';

export const OrganizationManagement = ({ children }: PropsWithChildren) => {
  const invititations = useRecoilValue(
    organizationAtoms.organizationReceivedInvitations,
  );

  return (
    <>
      <PageTitle title="Organizations" />
      <div css={[styles.wrapper, wrapper.main]}>
        <div css={styles.leftWrapper}>
          <OrganizationsList />
          {Boolean(invititations?.length) && <OrganizationInvitations />}
        </div>
        <div css={styles.rightWrapper}>{children}</div>
      </div>
    </>
  );
};
