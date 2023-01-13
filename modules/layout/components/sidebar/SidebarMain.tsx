import Link from 'next/link';
import { useRouter } from 'next/router';
import { styles } from './SidebarMain.styles';
import { Badge, ProfileBubble } from '@shared/components';
import IconNodes from '@public/assets/icons/box-12.svg';
import IconOrganizations from '@public/assets/icons/organization-16.svg';
import IconRocket from '@public/assets/icons/rocket-12.svg';
import IconDoor from '@public/assets/icons/door-12.svg';
import { SidebarFooter } from './SidebarFooter/SidebarFooter';
import { useRecoilState, useRecoilValue } from 'recoil';
import { sidebarOpen } from '@modules/layout/store/layoutAtoms';
import { organizationAtoms } from '@modules/organization';
import { useSignOut } from '@modules/auth';

const blocks = [
  {
    title: 'BLOCKVISOR',
    items: [
      { name: 'Nodes', path: '/nodes', icon: <IconNodes /> },
      {
        name: 'Launch Node',
        path: '/launch-node',
        icon: <IconRocket />,
      },
      {
        name: 'Organizations',
        path: '/organizations',
        icon: <IconOrganizations />,
        isOrganizations: true,
      },
      {
        name: 'Profile',
        path: '/profile',
        icon: <ProfileBubble />,
      },
    ],
  },
];

export default () => {
  const router = useRouter();
  const signOut = useSignOut();

  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(sidebarOpen);

  const invitationCount = useRecoilValue(
    organizationAtoms.organizationReceivedInvitations,
  )?.length;

  const handleLogout = async () => {
    signOut();
    window.location.href = '/';
  };

  const handleLinkClicked = () => {
    if (document.body.clientWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <main css={[styles.wrapper]}>
      {blocks.map((block) => (
        <ul key={block.title} css={[styles.list]}>
          {block.items.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                onClick={handleLinkClicked}
                css={[
                  styles.link,
                  !isSidebarOpen && styles.linkSidebarCollapsed,
                ]}
              >
                <span
                  css={styles.linkInner}
                  className={
                    router.pathname.includes(item.path) ? 'active' : ''
                  }
                >
                  <span
                    className="link-icon"
                    css={[
                      styles.linkIcon,
                      !isSidebarOpen && styles.linkIconSidebarOpen,
                    ]}
                  >
                    {item.icon}
                  </span>
                  <span
                    className="link-text"
                    css={[
                      styles.linkText,
                      !isSidebarOpen && styles.linkTextHidden,
                    ]}
                  >
                    {item.name}

                    {Boolean(invitationCount) && item.isOrganizations && (
                      <Badge>{invitationCount}</Badge>
                    )}
                  </span>
                </span>
              </Link>
            </li>
          ))}
          <li>
            <a
              onClick={handleLogout}
              css={[styles.link, !isSidebarOpen && styles.linkSidebarCollapsed]}
            >
              <span css={styles.linkInner}>
                <span
                  className="link-icon"
                  css={[
                    styles.linkIcon,
                    !isSidebarOpen && styles.linkIconSidebarOpen,
                  ]}
                >
                  <IconDoor />
                </span>
                <span
                  className="link-text"
                  css={[
                    styles.linkText,
                    !isSidebarOpen && styles.linkTextHidden,
                  ]}
                >
                  Sign Out
                </span>
              </span>
            </a>
          </li>
        </ul>
      ))}
      <SidebarFooter />
    </main>
  );
};
