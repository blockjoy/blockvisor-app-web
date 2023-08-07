import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { isMobile } from 'react-device-detect';
import { styles } from './SidebarMain.styles';
import { Badge } from '@shared/components';
import IconNodes from '@public/assets/icons/app/Node.svg';
import IconOrganizations from '@public/assets/icons/app/Organization.svg';
import IconHost from '@public/assets/icons/app/Host.svg';
import IconRocket from '@public/assets/icons/app/Rocket.svg';
import IconChat from '@public/assets/icons/common/Chat.svg';
import { SidebarFooter } from './SidebarFooter/SidebarFooter';
import { useRecoilState, useRecoilValue } from 'recoil';
import { sidebarOpen } from '@modules/layout/store/layoutAtoms';
import { invitationAtoms, useDefaultOrganization } from '@modules/organization';

type SidebarItem = {
  name: string;
  path: string;
  icon: ReactNode;
  isOrganizations?: boolean;
};

export default () => {
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(sidebarOpen);

  const { defaultOrganization } = useDefaultOrganization();

  const invitationCount = useRecoilValue(
    invitationAtoms.receivedInvitations,
  )?.length;

  const handleLinkClicked = () => {
    if (document.body.clientWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const blocks: {
    title?: string;
    items: SidebarItem[];
  }[] = [
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
          icon: <IconHost />,
        },
      ],
    },
    {
      title: 'ADMIN',
      items: [
        {
          name: 'Organizations',
          path: isMobile
            ? '/organizations'
            : `/organizations/${defaultOrganization?.id}`,
          icon: <IconOrganizations />,
          isOrganizations: true,
        },
      ],
    },
    {
      items: [
        {
          name: 'FAQ',
          path: '/faq',
          icon: <IconChat />,
        },
      ],
    },
  ];

  return (
    <main css={[styles.wrapper]}>
      <div css={styles.navigation}>
        {blocks.map((block) => (
          <div css={styles.block(isSidebarOpen)}>
            {block.title && isSidebarOpen && (
              <h4 css={styles.header}>{block.title}</h4>
            )}
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
                        router.pathname.startsWith(item.path.substring(0, 3))
                          ? 'active'
                          : ''
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
          </div>
        ))}
      </div>
      <SidebarFooter />
    </main>
  );
};
