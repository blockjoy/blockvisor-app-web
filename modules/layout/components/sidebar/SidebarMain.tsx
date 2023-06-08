import Link from 'next/link';
import { useRouter } from 'next/router';
import { styles } from './SidebarMain.styles';
import { Badge } from '@shared/components';
import IconNodes from '@public/assets/icons/box-12.svg';
import IconOrganizations from '@public/assets/icons/organization-16.svg';
import IconUnion from '@public/assets/icons/union-16.svg';
import IconRocket from '@public/assets/icons/rocket-12.svg';
import IconChat from '@public/assets/icons/chat-12.svg';
import { SidebarFooter } from './SidebarFooter/SidebarFooter';
import { useRecoilState, useRecoilValue } from 'recoil';
import { sidebarOpen } from '@modules/layout/store/layoutAtoms';
import { organizationAtoms } from '@modules/organization';

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
        name: 'Hosts',
        path: '/hosts',
        icon: <IconUnion />,
      },
      {
        name: 'Organizations',
        path: '/organizations',
        icon: <IconOrganizations />,
        isOrganizations: true,
      },
      {
        name: 'FAQ',
        path: '/faq',
        icon: <IconChat />,
      },
    ],
  },
];

export default () => {
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(sidebarOpen);

  const invitationCount = useRecoilValue(
    organizationAtoms.organizationReceivedInvitations,
  )?.length;

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
                  className={`link-inner ${
                    router.pathname.startsWith(item.path) ? 'active' : ''
                  }`}
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
                      <Badge color="danger">{invitationCount}</Badge>
                    )}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ))}
      <SidebarFooter />
    </main>
  );
};
