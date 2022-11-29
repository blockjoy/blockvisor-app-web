import Link from 'next/link';
import { useRouter } from 'next/router';
import { styles } from './SidebarMain.styles';
import { ProfileBubble } from '@shared/components';
import IconHosts from '@public/assets/icons/host-12.svg';
import IconNodes from '@public/assets/icons/box-12.svg';
import IconOrganizations from '@public/assets/icons/organization-16.svg';
import ChatIcon from '@public/assets/icons/chat-12.svg';
import { SidebarFooter } from './SidebarFooter/SidebarFooter';
import { useRecoilState } from 'recoil';
import { layoutState } from '@modules/layout/store/layoutAtoms';

const blocks = [
  {
    title: 'BLOCKVISOR',
    items: [
      { name: 'Nodes', path: '/nodes', icon: <IconNodes /> },
      { name: 'Support', path: '/support', icon: <ChatIcon /> },
      // { name: 'Dashboard', path: '/dashboard', icon: <IconDashboard /> },
      { name: 'Hosts', path: '/hosts', icon: <IconHosts /> },
      {
        name: 'Organizations',
        path: '/organizations',
        icon: <IconOrganizations />,
      },
      {
        name: 'Profile',
        path: '/profile',
        icon: <ProfileBubble />,
      },
    ],
  },
  // {
  //   title: "BROADCASTS",
  //   items: [
  //     { name: "Automation", path: "/automation", icon: "sync" },
  //   ]
  // },
  // {
  //   title: 'ADMIN',
  //   items: [

  //   ],
  // },
];

export default () => {
  const [layout, setLayout] = useRecoilState(layoutState);

  const handleLinkClicked = () => {
    console.log('handleLinkClick');

    if (document.body.clientWidth < 768) {
      setLayout(undefined);
    }
  };

  const router = useRouter();
  return (
    <main css={[styles.wrapper]}>
      <div>
        {blocks.map((block) => (
          <div key={block.title}>
            {/* {layout === 'sidebar' && (
              <header css={[styles.header]}>{block.title}</header>
            )} */}
            <ul css={[styles.list]}>
              {block.items.map((item) => (
                <li key={item.name}>
                  <Link href={item.path}>
                    <a
                      onClick={handleLinkClicked}
                      css={[
                        styles.link,
                        layout !== 'sidebar' && styles.linkSidebarCollapsed,
                      ]}
                    >
                      <span
                        css={styles.linkInner}
                        className={
                          router.pathname.includes(item.path) ? 'active' : ''
                        }
                      >
                        <span
                          css={[
                            styles.linkIcon,
                            layout !== 'sidebar' && styles.linkIconSidebarOpen,
                          ]}
                        >
                          {item.icon}
                        </span>
                        <span
                          className="link-text"
                          css={[
                            styles.linkText,
                            layout !== 'sidebar' && styles.linkTextHidden,
                          ]}
                        >
                          {item.name}
                        </span>
                      </span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {layout === 'sidebar' && <SidebarFooter />}
    </main>
  );
};
