import { USER_ROLES } from '@modules/auth/hooks/useHasPermissions';
import { Org, OrgRole } from '@modules/grpc/library/blockjoy/v1/org';
import { SvgIcon } from '@shared/components';
import { getOrgMemberRole } from './getOrgMemberRole';
import Link from 'next/link';
import IconInfo from '@public/assets/icons/common/Info.svg';
import { ROUTES } from '@shared/constants/routes';
import { ReactNode } from 'react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

type Details = {
  label: string | ReactNode;
  data: string | number | EmotionJSX.Element | undefined;
};

export function mapOrganizationDetails(org: Org | null, userId: string) {
  if (!org) {
    return null;
  }

  const role = USER_ROLES[getOrgMemberRole(org!, userId)];

  const details: Details[] = [
    {
      label: 'Owner',
      data: org.members.find((m) => m.role === OrgRole.ORG_ROLE_OWNER)?.email,
    },
    { label: 'MEMBERS', data: org?.memberCount },
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

  if (org.nodeCount) {
    details.push({
      label: 'NODES',
      data: <Link href={ROUTES.NODES}>{org.nodeCount}</Link>,
    });
  }

  return details;
}
