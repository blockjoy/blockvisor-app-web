import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { styles } from './OrganizationViewTabs.styles';
import { createPath } from '@modules/organization/utils/createPath';
import { useGetOrganization } from '@modules/organization/hooks/useGetOrganization';

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
    return routerPath === buttonPath;
  };

  return (
    <div css={styles.tabs}>
      {tabs.map((tab) => (
        <NextLink
          key={tab.name}
          href={tab.href}
          className={tab.name.toLowerCase()}
          css={[styles.tabButton, isActive(tab.href) && styles.tabButtonActive]}
        >
          {tab.name}
        </NextLink>
      ))}
      <header css={styles.sidePanelHeader}>Details</header>
    </div>
  );
};
