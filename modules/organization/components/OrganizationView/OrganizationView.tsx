import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';
import { queryAsString } from '@shared/utils/query';
import { spacing } from 'styles/utils.spacing.styles';
import {
  EmptyColumn,
  TableAdd,
  BackButton,
  SkeletonView,
} from '@shared/components';
import { useGetOrganization } from '@modules/organization/hooks/useGetOrganization';
import {
  getOrgMemberRole,
  invitationAtoms,
  organizationAtoms,
  OrganizationDetails,
  useInvitations,
  useInviteMembers,
} from '@modules/organization';
import { OrganizationViewHeader } from './Header/OrganizationViewHeader';
import { OrganizationViewTabs } from './Tabs/OrganizationViewTabs';
import { styles } from './OrganizationView.styles';
import { useRecoilValue } from 'recoil';
import { useIdentity } from '@modules/auth';
import {
  Permissions,
  useHasPermissions,
} from '@modules/auth/hooks/useHasPermissions';
import { SubmitHandler, useForm } from 'react-hook-form';
import { checkIfExists } from '@modules/organization/utils/checkIfExists';
import { toast } from 'react-toastify';
import { isValidEmail } from '@shared/index';
import { createPath } from '@modules/organization/utils/createPath';
import { isMobile } from 'react-device-detect';

export const OrganizationView = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { id } = router.query;
  const { getOrganization, organization, isLoading, setIsLoading } =
    useGetOrganization();

  const form = useForm<{ email: string }>();

  const { getSentInvitations, setSentInvitationsLoadingState } =
    useInvitations();

  const selectedOrganization = useRecoilValue(
    organizationAtoms.selectedOrganization,
  );

  const { user } = useIdentity();

  const role = getOrgMemberRole(selectedOrganization!, user?.id!);

  const canCreateMember: boolean = useHasPermissions(
    role,
    Permissions.CREATE_MEMBER,
  );

  const [isInviting, setIsInviting] = useState<boolean>(false);

  const members = selectedOrganization?.members;

  const sentInvitations = useRecoilValue(invitationAtoms.sentInvitations);

  const { inviteMembers } = useInviteMembers();

  const handleInviteClicked = (email: string) => {
    setIsInviting(true);

    const isMemberOrInvited = checkIfExists(
      members!,
      sentInvitations!,
      email!?.toLowerCase(),
    );

    if (!isMemberOrInvited) {
      inviteMembers(email!, () => {
        form.reset();
        getSentInvitations(id!);
        setIsInviting(false);
        router.push(createPath(id as string, 'invitations'));
      });
    } else {
      setIsInviting(false);
      if (isMemberOrInvited === 'member') {
        toast.error('Already a member');
      } else {
        toast.error('Already invited');
      }
    }
  };

  const onSubmit: SubmitHandler<{ email: string }> = async ({ email }) => {
    handleInviteClicked(email);
  };

  useEffect(() => {
    (async () => {
      if (router.isReady) {
        getOrganization(queryAsString(id));
        getSentInvitations(queryAsString(id));
      }
    })();
    return () => {
      setIsLoading('loading');
      setSentInvitationsLoadingState('loading');
    };
  }, [id, router.isReady]);

  return (
    <>
      {isMobile && (
        <div css={spacing.top.medium}>
          <BackButton />
        </div>
      )}
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
            <div css={styles.leftWrapper}>
              {canCreateMember && (
                <TableAdd
                  buttonText="Invite"
                  buttonWidth="70px"
                  field="email"
                  placeholder="Invite Member"
                  placeholderFocused="Enter an email address"
                  onSubmit={onSubmit}
                  isLoading={isInviting}
                  form={form}
                  validationOptions={{
                    required: 'An email address is required',
                    pattern: {
                      value: isValidEmail(),
                      message: 'Email format is not correct',
                    },
                  }}
                />
              )}
              {children}
            </div>
            <div css={styles.rightWrapper}>
              <OrganizationDetails />
            </div>
          </section>
        </>
      )}
    </>
  );
};
