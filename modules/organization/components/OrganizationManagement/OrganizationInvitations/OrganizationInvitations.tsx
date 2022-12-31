import { useIdentityRepository } from '@modules/auth';
import { useGetInvitations } from '@modules/organization';
import { useEffect } from 'react';
import { styles } from './OrganizationInvitations.styles';

export const OrganizationInvitations = () => {
  const repository = useIdentityRepository();
  const userId = repository?.getIdentity()?.id;

  const { getInvitations } = useGetInvitations();

  useEffect(() => {
    getInvitations(userId!);
  }, []);

  return <div css={styles.wrapper}>Invitations</div>;
};
