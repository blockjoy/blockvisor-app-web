import { useRouter } from 'next/router';
import { createPath } from '@modules/organization/utils/createPath';
import { useGetOrganization } from '@modules/organization/hooks/useGetOrganization';
import { TabNavigation } from '@shared/components';

export const OrganizationViewTabs = () => {
  const { query, asPath } = useRouter();

  const { organization } = useGetOrganization();

  const id = query.id as string;

  const tabs = [{ href: createPath(id as string, ''), name: 'Members' }];

  if (!organization?.personal) {
    tabs.push({ href: createPath(id, 'invitations'), name: 'Invitations' });
  }

  const isActive = (href: string) => {
    const routerPath = asPath.substring(asPath.lastIndexOf('/'), asPath.length);
    const buttonPath = href.substring(href.lastIndexOf('/'), href.length);
    return routerPath.includes(buttonPath);
  };

  const tabItems = tabs.map((tab) => ({
    ...tab,
    isActive: isActive(tab.href),
  }));

  return <TabNavigation items={tabItems} sidePanel="Details" />;
};
