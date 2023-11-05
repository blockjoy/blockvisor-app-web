<<<<<<< HEAD
import Link from 'next/link';
import { ReactNode } from 'react';
<<<<<<< HEAD
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { ROUTES } from '@shared/constants/routes';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { sort, SvgIcon } from '@shared/components';
import IconInfo from '@public/assets/icons/common/Info.svg';
import { display } from 'styles/utils.display.styles';
import { flex } from 'styles/utils.flex.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { getOrganizationRole } from '@modules/organization';
=======
import { useRecoilValue } from 'recoil';
import { Org, OrgRole } from '@modules/grpc/library/blockjoy/v1/org';
import { SvgIcon } from '@shared/components';
=======
import { Org, OrgRole } from '@modules/grpc/library/blockjoy/v1/org';
import { SvgIcon } from '@shared/components';
import Link from 'next/link';
>>>>>>> 5d7807b1 (feat: [sc-2354] updated permissions; moved billing to sidebar)
import IconInfo from '@public/assets/icons/common/Info.svg';
import { ROUTES } from '@shared/constants/routes';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
<<<<<<< HEAD
import { organizationSelectors } from '@modules/organization';
=======
import { useRecoilValue } from 'recoil';
import { organizationSelectors } from '../store/organizationSelectors';
>>>>>>> 5d7807b1 (feat: [sc-2354] updated permissions; moved billing to sidebar)
>>>>>>> edc70c6f (feat: [sc-2354] updated permissions; moved billing to sidebar)

type Details = {
  label: string | ReactNode;
  data: string | number | EmotionJSX.Element | undefined;
};

export function mapOrganizationDetails(org: Org | null, userId: string) {
  if (!org) {
    return null;
  }

  const details: Details[] = [
    { label: 'MEMBERS', data: org?.memberCount },
    {
      label: 'NODES',
      data: <Link href={ROUTES.NODES}>{org.nodeCount}</Link>,
    },
  ];

  const roles = org.members.find((member) => member.userId === userId)?.roles;

  const role = getOrganizationRole(roles!);

  const owners = sort(
    org.members.filter((member) =>
      member.roles.some(
        (role) => role.name === 'org-owner' || role.name === 'org-personal',
      ),
    ),
    {
      field: 'email',
      order: 'asc',
    },
  );

  details.unshift({
    label: owners.length > 1 ? 'Owners' : 'Owner',
    data:
      owners.length > 1 ? (
        <>
          {owners.map((o) => (
            <p key={o.userId}>{o.email}</p>
          ))}
        </>
      ) : (
        owners[0]?.email || 'None'
      ),
  });

  details.unshift({
    label: 'Role',
    data: (
      <p css={[display.flex, flex.align.center]}>
        {role}{' '}
        <SvgIcon
          tooltip="Your role within this organization"
          additionalStyles={[spacing.left.small]}
          isDefaultColor
        >
          <IconInfo />
        </SvgIcon>
      </p>
    ),
  });

  return details;
}
