import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { styles } from './OrganizationViewTabs.styles';
import { wrapper } from 'styles/wrapper.styles';

export const OrganizationViewTabs = () => {
  const { query, asPath } = useRouter();

  const createPath = (path: string) =>
    `/nodes/${query.id}${path ? `/${path}` : ''}`;

  const tabs = [
    { href: createPath(''), name: 'Details' },
    { href: createPath('members'), name: 'Members' },
    { href: createPath('settings'), name: 'Settings' },
    { href: createPath('metrics'), name: 'Metrics' },
  ];

  const isActive = (href: string) => {
    const routerPath = asPath.substring(asPath.lastIndexOf('/'), asPath.length);
    const buttonPath = href.substring(href.lastIndexOf('/'), href.length);
    return routerPath === buttonPath;
  };

  return (
    <div css={wrapper.main}>
      <div css={styles.tabs}>
        {tabs.map((tab) => (
          <NextLink
            key={tab.name}
            href={tab.href}
            className={tab.name.toLowerCase()}
            css={[
              styles.tabButton,
              isActive(tab.href) && styles.tabButtonActive,
            ]}
          >
            {tab.name}
          </NextLink>
        ))}
      </div>
    </div>
  );
};
