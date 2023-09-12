import Link from 'next/link';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { SvgIcon } from '@shared/components';
import IconInfo from '@public/assets/icons/common/Info.svg';
import { ROUTES } from '@shared/constants/routes';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { organizationSelectors } from '@modules/organization';

type Details = {
  label: string | ReactNode;
  data: string | number | EmotionJSX.Element | undefined;
};

export function mapOrganizationDetails(org: Org | null, userId: string) {
  if (!org) {
    return null;
  }

  const userRoleNameInOrganization = useRecoilValue(
    organizationSelectors.userRoleNameInOrganization,
  );

  const details: Details[] = [
    {
      label: 'ROLE',
      data: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <p>{userRoleNameInOrganization}</p>
          <SvgIcon isDefaultColor tooltip="Your role within this Organization">
            <IconInfo />
          </SvgIcon>
        </div>
      ),
    },
    // {
    //   label: 'Owner',
    //   data: org.members.find((m) => m.  === OrgRole.ORG_ROLE_OWNER)?.email,
    // },
    { label: 'MEMBERS', data: org?.memberCount },
    {
      label: 'NODES',
      data: <Link href={ROUTES.NODES}>{org.nodeCount}</Link>,
    },
  ];

  if (org.personal) {
    details.unshift({
      label: 'TYPE',
      data: org.personal ? 'Personal' : 'Other',
    });
  }

  return details;
}
