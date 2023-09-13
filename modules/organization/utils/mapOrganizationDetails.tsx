import Link from 'next/link';
import { ReactNode } from 'react';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { ROUTES } from '@shared/constants/routes';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

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

  if (org.personal) {
    details.unshift({
      label: 'TYPE',
      data: org.personal ? 'Personal' : 'Other',
    });
  }

  return details;
}
