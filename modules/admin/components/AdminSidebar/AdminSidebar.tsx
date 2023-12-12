import { styles } from './AdminSidebar.styles';
import NextLink from 'next/link';
import IconNode from '@public/assets/icons/app/Node.svg';
import IconOrganization from '@public/assets/icons/app/Organization.svg';
import IconHost from '@public/assets/icons/app/Host.svg';
import IconPerson from '@public/assets/icons/common/Person.svg';
import IconDashboard from '@public/assets/icons/app/Grid.svg';
import { SvgIcon } from '@shared/components';

type Props = { tab: string };

const links = [
  { name: 'dashboard', icon: <IconDashboard />, href: '/admin?name=dashboard' },
  { name: 'nodes', icon: <IconNode />, href: '/admin?name=nodes' },
  { name: 'hosts', icon: <IconHost />, href: '/admin?name=hosts' },
  { name: 'orgs', icon: <IconOrganization />, href: '/admin?name=orgs' },
  { name: 'users', icon: <IconPerson />, href: '/admin?name=users' },
];

export const AdminSidebar = ({ tab }: Props) => (
  <aside css={styles.sidebar}>
    {links.map((link) => (
      <NextLink
        key={link.name}
        css={[
          styles.link,
          tab === link.name || (!tab && link.name === 'dashboard')
            ? styles.linkActive
            : styles.linkInactive,
        ]}
        href={link.href}
      >
        <SvgIcon size="14px">{link.icon}</SvgIcon>
        <p>{link.name}</p>
      </NextLink>
    ))}
  </aside>
);
