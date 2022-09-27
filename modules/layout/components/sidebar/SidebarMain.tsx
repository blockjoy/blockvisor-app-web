import Link from 'next/link';
import { useRouter } from 'next/router';
import { styles } from './SidebarMain.styles';
import IconDashboard from '@public/assets/icons/grid-12.svg';
import IconHosts from '@public/assets/icons/host-12.svg';
import IconNodes from '@public/assets/icons/box-12.svg';
import IconOrganizations from '@public/assets/icons/organization-16.svg';

const blocks = [
  {
    title: 'BLOCKVISOR',
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: <IconDashboard /> },
      { name: 'Hosts', path: '/hosts', icon: <IconHosts /> },
      { name: 'Nodes', path: '/nodes', icon: <IconNodes /> },
    ],
  },
  // {
  //   title: "BROADCASTS",
  //   items: [
  //     { name: "Automation", path: "/automation", icon: "sync" },
  //   ]
  // },
  {
    title: 'ADMIN',
    items: [
      {
        name: 'Organisations',
        path: '/organisations',
        icon: <IconOrganizations />,
      },
    ],
  },
];

export default () => {
  const router = useRouter();
  return (
    <main css={[styles.wrapper]}>
      {blocks.map((block) => (
        <div key={block.title}>
          <header css={[styles.header]}>{block.title}</header>
          <ul css={[styles.list]}>
            {block.items.map((item) => (
              <li key={item.name}>
                <Link href={item.path}>
                  <a
                    css={[styles.link]}
                    className={
                      router.pathname.includes(item.path) ? 'active' : ''
                    }
                  >
                    {item.icon}
                    {item.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
};
