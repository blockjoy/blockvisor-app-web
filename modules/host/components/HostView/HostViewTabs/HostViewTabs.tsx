import { useRouter } from 'next/router';
import { TabNavigation } from '@shared/components';

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

  const tabItems = tabs.map((tab) => ({
    ...tab,
    isActive: isActive(tab.href),
  }));

  return <TabNavigation items={tabItems} sidePanel="Metrics" />;
};
