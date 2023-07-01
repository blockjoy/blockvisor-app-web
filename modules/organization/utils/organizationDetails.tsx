import { USER_ROLES } from '@modules/auth/hooks/useHasPermissions';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { SvgIcon } from '@shared/components';
import { getOrgMemberRole } from './getOrgMemberRole';
import Link from 'next/link';
import IconInfo from '@public/assets/icons/common/Info.svg';
import { ROUTES } from '@shared/constants/routes';

export function getOrganizationDetails(org: Org | null, userId: string) {
  if (!org) {
    return null;
  }

  const role = USER_ROLES[getOrgMemberRole(org!, userId)];

  const details = [
    { label: 'MEMBERS', data: org?.memberCount },
    {
      label: 'NODES',
      data:
        org.nodeCount < 1 ? (
          '-'
        ) : (
          <Link href={ROUTES.NODES}>{org.nodeCount}</Link>
        ),
    },
  ];

  if (org.personal) {
    details.unshift({
      label: 'TYPE',
      data: org.personal ? 'Personal' : 'Other',
    });
  } else {
    details.unshift({
      label: 'ROLE',
      data: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <p>{role}</p>
          <SvgIcon tooltip="Your role within this Organization">
            <IconInfo />
          </SvgIcon>
        </div>
      ),
    });
  }

  return details;
}
