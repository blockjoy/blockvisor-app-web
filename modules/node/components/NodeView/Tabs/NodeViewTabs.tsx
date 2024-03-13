import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import { useNodeView } from '@modules/node';
import { TabNavigation } from '@shared/components';
import { wrapper } from 'styles/wrapper.styles';

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
    { href: createPath('commands'), name: 'Commands' },
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

  const tabItems = tabs.map((tab) => ({
    ...tab,
    isActive: isActive(tab.href),
  }));

  return (
    <div css={wrapper.main}>
      <TabNavigation items={tabItems} sidePanel="Metrics" />
    </div>
  );
};
