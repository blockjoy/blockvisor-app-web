import { styles } from './AdminSidebar.styles';
import NextLink from 'next/link';
import IconNode from '@public/assets/icons/app/Node.svg';
import IconOrganization from '@public/assets/icons/app/Organization.svg';
import IconHost from '@public/assets/icons/app/Host.svg';
import IconPerson from '@public/assets/icons/common/Person.svg';
import IconDashboard from '@public/assets/icons/common/Grid.svg';
import { SvgIcon } from '@shared/components';
import { useRef, useState } from 'react';

type Props = { tab: string };

const links = [
  { name: 'dashboard', icon: <IconDashboard />, href: '/admin?name=dashboard' },
  { name: 'nodes', icon: <IconNode />, href: '/admin?name=nodes' },
  { name: 'hosts', icon: <IconHost />, href: '/admin?name=hosts' },
  { name: 'orgs', icon: <IconOrganization />, href: '/admin?name=orgs' },
  { name: 'users', icon: <IconPerson />, href: '/admin?name=users' },
];

export const AdminSidebar = ({ tab }: Props) => {
  const [width, setWidth] = useState(
    +localStorage?.getItem('adminSidebarWidth')! || 200,
  );
  const sidebarRef = useRef<HTMLElement>(null);
  const sidebar = sidebarRef.current;

  const resize = (e: any) => {
    let newWidth = e.clientX - sidebar?.offsetLeft!;
    if (newWidth < 8) newWidth = 8;
    if (newWidth > 200) newWidth = 200;
    setWidth(newWidth);
    localStorage.setItem('adminSidebarWidth', newWidth?.toString());
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
      ref={sidebarRef}
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
