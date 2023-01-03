import { useIdentityRepository } from '@modules/auth';
import { organisationAtoms, useInvitations } from '@modules/organization';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { styles } from './OrganizationInvitations.styles';

export const OrganizationInvitations = () => {
  const repository = useIdentityRepository();
  const userId = repository?.getIdentity()?.id;

  const organizationInvitations = useRecoilValue(
    organisationAtoms.organizationInvitations,
  );

  const { getInvitations } = useInvitations();

  useEffect(() => {
    getInvitations(userId!);
  }, []);

  return (
    <div css={styles.wrapper}>
      Invitations
      {organizationInvitations?.map((i) => (
        <div>
          <div>{i.createdById}</div>
        </div>
      ))}
    </div>
  );
};
