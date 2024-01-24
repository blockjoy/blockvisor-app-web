import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { styles } from './HostViewTabs.styles';

export const HostViewTabs = () => {
  const { query, asPath } = useRouter();

  const createPath = (path: string) =>
    `/hosts/${query.id}${path ? `/${path}` : ''}`;

  const tabs = [
    { href: createPath(''), name: 'Details' },
    { href: createPath('nodes'), name: 'Nodes' },
    { href: createPath('commands'), name: 'Commands' },
    { href: createPath('metrics'), name: 'Metrics', className: 'metrics' },
  ];

  const isActive = (href: string) => {
    const routerPath = asPath.substring(asPath.lastIndexOf('/'), asPath.length);
    const buttonPath = href.substring(href.lastIndexOf('/'), href.length);
    return routerPath === buttonPath;
  };

  return (
    <section css={styles.wrapper}>
      <div css={styles.tabs}>
        {tabs.map((tab) => (
          <NextLink
            key={tab.name}
            href={tab.href}
            css={[
              styles.tabButton,
              isActive(tab.href) && styles.tabButtonActive,
            ]}
            className={tab.className}
          >
            {tab.name}
          </NextLink>
        ))}
      </div>
      <header css={styles.sidePanelHeader}>Metrics</header>
    </section>
  );
};
