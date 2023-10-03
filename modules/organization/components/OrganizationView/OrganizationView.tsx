import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect } from 'react';
import { queryAsString } from '@shared/utils/query';
import { spacing } from 'styles/utils.spacing.styles';
import { EmptyColumn, SkeletonView } from '@shared/components';
import { useGetOrganization } from '@modules/organization/hooks/useGetOrganization';
import {
  invitationAtoms,
  OrganizationDetails,
  useInvitations,
} from '@modules/organization';
import { OrganizationViewHeader } from './Header/OrganizationViewHeader';
import { OrganizationViewTabs } from './Tabs/OrganizationViewTabs';
import { styles } from './OrganizationView.styles';
import { useRecoilValue } from 'recoil';
import { useIdentity } from '@modules/auth';

export const OrganizationView = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useIdentity();
  const { getOrganization, organization, isLoading, setIsLoading } =
    useGetOrganization();

  const {
    getSentInvitations,
    setSentInvitationsLoadingState,
    getReceivedInvitations,
  } = useInvitations();

  const sentInvitations = useRecoilValue(invitationAtoms.sentInvitations);

  useEffect(() => {
    (async () => {
      if (router.isReady) {
        getOrganization(queryAsString(id));
        getSentInvitations(queryAsString(id));
        getReceivedInvitations(user?.email!);
      }
    })();
    return () => {
      setIsLoading('loading');
      setSentInvitationsLoadingState('loading');
    };
  }, [id, router.isReady]);

  return (
    <>
      <OrganizationViewHeader />
      {isLoading === 'loading' ? (
        <div css={spacing.top.medium}>
          <SkeletonView />
        </div>
      ) : isLoading === 'finished' && organization === null ? (
        <EmptyColumn
          title="Organization Not Found"
          description="No organization exists with this ID"
        />
      ) : (
        <>
          <OrganizationViewTabs />
          <section css={styles.wrapper}>
            <div css={styles.leftWrapper}>{children}</div>
            <div css={styles.rightWrapper}>
              <OrganizationDetails />
            </div>
          </section>
        </>
      )}
    </>
  );
};
