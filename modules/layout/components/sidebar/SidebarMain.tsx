import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { styles } from './SidebarMain.styles';
import IconNodes from '@public/assets/icons/box-12.svg';
import IconOrganizations from '@public/assets/icons/organization-16.svg';
import IconSupport from '@public/assets/icons/chat-12.svg';
import IconRocket from '@public/assets/icons/rocket-12.svg';
import { SidebarFooter } from './SidebarFooter/SidebarFooter';
import { useRecoilState, useRecoilValue } from 'recoil';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { organizationAtoms } from '@modules/organization';
import { Badge } from '@shared/components/Badge/Badge';
import { ProfileBubble } from '@shared/components/ProfileBubble/ProfileBubble';

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
      {
        name: 'Support',
        path: '/support',
        icon: <IconSupport />,
      },
    ],
  },
];

export default function SidebarMain() {
  const [layout, setLayout] = useRecoilState(layoutState);

  const invitationCount = useRecoilValue(
    organizationAtoms.organizationReceivedInvitations,
  )?.length;

  const handleLinkClicked = () => {
    if (document.body.clientWidth < 768) {
      setLayout(undefined);
    }
  };

  const pathname = usePathname();
  return (
    <main css={[styles.wrapper]}>
      <div>
        {blocks.map((block) => (
          <div key={block.title}>
            <ul css={[styles.list]}>
              {block.items.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    onClick={handleLinkClicked}
                    css={[
                      styles.link,
                      layout !== 'sidebar' && styles.linkSidebarCollapsed,
                    ]}
                  >
                    <span
                      css={styles.linkInner}
                      className={pathname?.includes(item.path) ? 'active' : ''}
                    >
                      <span
                        className="link-icon"
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

                        {Boolean(invitationCount) && item.isOrganizations && (
                          <Badge>{invitationCount}</Badge>
                        )}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <SidebarFooter />
    </main>
  );
}
