import { styles } from './AdminSidebar.styles';
import NextLink from 'next/link';
import IconNode from '@public/assets/icons/app/Node.svg';
import IconOrganization from '@public/assets/icons/app/Organization.svg';
import IconHost from '@public/assets/icons/app/Host.svg';
import IconPerson from '@public/assets/icons/common/Person.svg';
import IconDashboard from '@public/assets/icons/app/Grid.svg';
import { SvgIcon } from '@shared/components';

type Props = {
  tab: string;
};

const createHref = (tab: string) => `/admin?tab=${tab}`;

const links = [
  { name: 'dashboard', icon: <IconDashboard /> },
  { name: 'users', icon: <IconPerson /> },
  { name: 'nodes', icon: <IconNode /> },
  { name: 'hosts', icon: <IconHost /> },
  { name: 'organizations', icon: <IconOrganization /> },
];

export const AdminSidebar = ({ tab }: Props) => (
  <aside css={styles.sidebar}>
    {links.map((link) => (
      <NextLink
        key={link.name}
        css={[
          styles.link,
          tab === link.name ? styles.linkActive : styles.linkInactive,
        ]}
        href={createHref(link.name)}
      >
        <SvgIcon size="14px">{link.icon}</SvgIcon>
        <p>{link.name}</p>
      </NextLink>
    ))}
  </aside>
);
