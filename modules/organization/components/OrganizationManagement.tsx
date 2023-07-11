import { styles } from './OrganizationManagement.styles';
import { OrganizationReceivedInvitations } from './OrganizationReceivedInvitations/OrganizationReceivedInvitations';
import { OrganizationsList } from './OrganizationList/OrganizationList';
import { PageTitle } from '@shared/components';
import { useRecoilValue } from 'recoil';
import { wrapper } from 'styles/wrapper.styles';
import { PropsWithChildren } from 'react';
import { invitationAtoms } from '../store/invitationAtoms';
import IconOrganizations from '@public/assets/icons/app/Organization.svg';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import { isMobile } from 'react-device-detect';

type Props = {
  isListOnly?: boolean;
  hideList?: boolean;
} & PropsWithChildren;

export const OrganizationManagement = ({
  children,
  isListOnly,
  hideList,
}: Props) => {
  const router = useRouter();
  const invititations = useRecoilValue(invitationAtoms.receivedInvitations);
  return (
    <>
      <PageTitle
        title="Organizations"
        icon={<IconOrganizations />}
        onTitleClick={
          isMobile ? () => router.push(ROUTES.ORGANIZATIONS) : undefined
        }
      />
      <div css={[styles.wrapper, wrapper.main]}>
        {!hideList && (
          <div css={styles.leftWrapper}>
            <OrganizationsList />
          </div>
        )}
        <div css={styles.rightWrapper}>
          {!isListOnly && <div css={styles.detailWrapper}>{children}</div>}
          {Boolean(invititations?.length) && (
            <div css={styles.invitationsWrapper}>
              <OrganizationReceivedInvitations />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
