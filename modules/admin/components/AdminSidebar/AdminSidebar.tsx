import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import NextLink from 'next/link';
import { styles } from './AdminSidebar.styles';
import { SvgIcon } from '@shared/components';
import IconNode from '@public/assets/icons/app/Node.svg';
import IconOrganization from '@public/assets/icons/app/Organization.svg';
import IconOrgFinance from '@public/assets/icons/app/OrgFinance.svg';
import IconHostFinance from '@public/assets/icons/app/HostFinance.svg';
import IconHost from '@public/assets/icons/app/Host.svg';
import IconPerson from '@public/assets/icons/common/Person.svg';
import IconDashboard from '@public/assets/icons/common/Grid.svg';
import IconCog from '@public/assets/icons/common/Cog.svg';
import IconBlockchain from '@public/assets/icons/app/Blockchain.svg';
import { layoutSelectors } from '@modules/layout';
import { useSettings } from '@modules/settings';
import { useDebounce } from '@shared/index';

type Props = { tab: string };

const links = [
  { name: 'dashboard', icon: <IconDashboard />, href: '/admin?name=dashboard' },
  {
    name: 'Host Finances',
    icon: <IconHostFinance />,
    href: '/admin?name=finances-by-host',
  },
  {
    name: 'Org Finances',
    icon: <IconOrgFinance />,
    href: '/admin?name=finances-by-org',
  },
  { name: 'nodes', icon: <IconNode />, href: '/admin?name=nodes' },
  { name: 'hosts', icon: <IconHost />, href: '/admin?name=hosts' },
  {
    name: 'blockchains',
    icon: <IconBlockchain />,
    href: '/admin?name=blockchains',
  },
  { name: 'orgs', icon: <IconOrganization />, href: '/admin?name=orgs' },
  { name: 'users', icon: <IconPerson />, href: '/admin?name=users' },
  { name: 'settings', icon: <IconCog />, href: '/admin?name=settings' },
];

export const AdminSidebar = ({ tab }: Props) => {
  const adminSidebarWidth = useRecoilValue(layoutSelectors.adminSidebarWidth);
  const [width, setWidth] = useState(adminSidebarWidth);

  const [offsetLeft, setOffsetLeft] = useState<number>();

  const { updateSettings } = useSettings();

  const debouncedWidth = useDebounce(width, 200);

  useEffect(() => {
    if (width !== adminSidebarWidth)
      updateSettings('layout', {
        'admin.sidebarWidth': debouncedWidth,
      });
  }, [debouncedWidth]);

  const resize = (e: any) => {
    let newWidth = e.clientX - offsetLeft!;
    if (newWidth < 8) newWidth = 8;
    if (newWidth > 200) newWidth = 200;
    setWidth(newWidth);
  };

  const stopResize = () => {
    document.body.style.cursor = 'default';
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', stopResize);
  };

  const initResize = () => {
    document.body.style.cursor = 'col-resize';
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResize);
  };

  return (
    <aside
      style={{ width: `${width}px`, minWidth: `${width}px` }}
      css={styles.sidebar(width !== 8)}
      ref={(el) => {
        setOffsetLeft(el?.offsetLeft);
      }}
    >
      <div css={styles.handle} onMouseDown={initResize}></div>
      <ul css={styles.sidebarInner}>
        {links.map((link) => (
          <li key={link.name}>
            <NextLink
              css={[
                styles.link,
                tab === link.name && width > 8
                  ? styles.linkActive
                  : styles.linkInactive,
              ]}
              href={link.href}
            >
              <SvgIcon size="14px">{link.icon}</SvgIcon>
              {width > 80 && <p>{link.name}</p>}
            </NextLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};
