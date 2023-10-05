import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { styles } from './NodeViewTabs.styles';
import { wrapper } from 'styles/wrapper.styles';

export const NodeViewTabs = () => {
  const { query, asPath } = useRouter();

  const createPath = (path: string) =>
    `/nodes/${query.id}${path ? `/${path}` : ''}`;

  const tabs = [
    { href: createPath(''), name: 'Details' },
    { href: createPath('settings'), name: 'Settings' },
    { href: createPath('jobs'), name: 'Jobs' },
  ];

  const isActive = (href: string) => {
    const routerPath = asPath.substring(asPath.lastIndexOf('/'), asPath.length);
    const buttonPath = href.substring(href.lastIndexOf('/'), href.length);
    return routerPath === buttonPath;
  };

  return (
    <section css={wrapper.main}>
      <div css={styles.wrapper}>
        <div css={styles.tabs}>
          {tabs.map((tab) => (
            <NextLink
              key={tab.name}
              href={tab.href}
              css={[
                styles.tabButton,
                isActive(tab.href) && styles.tabButtonActive,
              ]}
            >
              {tab.name}
            </NextLink>
          ))}
        </div>
        <header css={styles.sidePanelHeader}>Metrics</header>
      </div>
    </section>
  );
};
