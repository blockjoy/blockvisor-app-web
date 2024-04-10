import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { ROUTES } from '@shared/constants/routes';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { NextLink, sort, SvgIcon } from '@shared/components';
import IconInfo from '@public/assets/icons/common/Info.svg';
import { display } from 'styles/utils.display.styles';
import { flex } from 'styles/utils.flex.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { getOrganizationRole } from '@modules/organization';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';

type Details = {
  label: string | React.ReactNode;
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
      data: <NextLink href={ROUTES.NODES}>{org.nodeCount}</NextLink>,
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
      order: SortOrder.SORT_ORDER_ASCENDING,
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
