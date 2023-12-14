import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { styles } from './NodeViewTabs.styles';
import { wrapper } from 'styles/wrapper.styles';
import { ROUTES } from '@shared/constants/routes';
import { useNodeView } from '@modules/node/hooks/useNodeView';

export const NodeViewTabs = () => {
  const { query, asPath } = useRouter();
  const { id } = query;
  const { node } = useNodeView();

  const createPath = (path: string) =>
    `${ROUTES.NODE(id as string)}${path ? `/${path}` : ''}`;

  const tabs: { href: string; name: string; className?: string }[] = [
    { href: createPath(''), name: 'Details' },
    { href: createPath('settings'), name: 'Settings' },
    { href: createPath('jobs'), name: 'Jobs' },
  ];

  if (node?.blockHeight) {
    tabs.push({
      href: createPath('metrics'),
      name: 'Metrics',
      className: 'metrics',
    });
  }

  const isActive = (href: string) => {
    const routerPath = asPath
      .substring(
        asPath.lastIndexOf(id as string) + id?.length! + 1,
        asPath.length,
      )
      .trim();

    const buttonPath = href
      .substring(href.lastIndexOf(id as string) + id?.length! + 1, href.length)
      .trim();

    return buttonPath === ''
      ? buttonPath === routerPath
      : routerPath.includes(buttonPath);
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
              className={tab.className}
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
