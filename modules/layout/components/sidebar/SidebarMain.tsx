import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isMobile } from 'react-device-detect';
import { styles } from './SidebarMain.styles';
import { Badge } from '@shared/components';
import { layoutAtoms, layoutSelectors } from '@modules/layout';
import { invitationAtoms, organizationSelectors } from '@modules/organization';
import { ROUTES } from '@shared/index';
import { authSelectors } from '@modules/auth';
import { SidebarFooter } from './SidebarFooter/SidebarFooter';
import IconNodes from '@public/assets/icons/app/Node.svg';
import IconOrganizations from '@public/assets/icons/app/Organization.svg';
import IconHost from '@public/assets/icons/app/Host.svg';
import IconRocket from '@public/assets/icons/app/Rocket.svg';
import IconChat from '@public/assets/icons/common/Chat.svg';
import IconSliders from '@public/assets/icons/app/Sliders.svg';
import IconCog from '@public/assets/icons/common/Cog.svg';

type BlockItem = {
  id: string;
  title?: string;
  items: SidebarItem[];
};

type SidebarItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
  isOrganizations?: boolean;
};

export default () => {
  const router = useRouter();

  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );
  const isSidebarOpen = useRecoilValue(layoutSelectors.isSidebarOpen);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useRecoilState(
    layoutAtoms.isSidebarOpenMobile,
  );
  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);
  const canInitCard = useRecoilValue(
    authSelectors.hasPermission('org-billing-init-card'),
  );
  const invitationCount = useRecoilValue(
    invitationAtoms.receivedInvitations,
  )?.length;

  const handleLinkClicked = () => {
    if (document.body.clientWidth < 768) {
      setIsSidebarOpenMobile(false);
    }
  };

  const blocks: BlockItem[] = [
    {
      id: 'blockvisor',
      title: 'BLOCKVISOR',
      items: [
        { name: 'Nodes', path: ROUTES.NODES, icon: <IconNodes /> },
        {
          name: 'Launch Node',
          path: ROUTES.LAUNCH_NODE,
          icon: <IconRocket />,
        },
        {
          name: 'Hosts',
          path: ROUTES.HOSTS,
          icon: <IconHost />,
        },
      ],
    },
    {
      id: 'settings',
      title: 'SETTINGS',
      items: [
        {
          name: 'Organizations',
          path: isMobile
            ? ROUTES.ORGANIZATIONS
            : `${ROUTES.ORGANIZATIONS}/${defaultOrganization?.orgId}`,
          icon: <IconOrganizations />,
          isOrganizations: true,
        },
        {
          name: 'Settings',
          path: ROUTES.PROFILE,
          icon: <IconCog />,
          isOrganizations: true,
        },
      ],
    },
    {
      id: 'help',
      items: [
        {
          name: 'FAQ',
          path: ROUTES.FAQ,
          icon: <IconChat />,
        },
      ],
    },
  ];

  if (isSuperUser) {
    blocks.unshift({
      id: 'admin',
      title: 'SUPER USER',
      items: [
        {
          name: 'Admin',
          path: '/admin?name=dashboard',
          icon: <IconSliders />,
        },
      ],
    });
  }

  return (
    <main css={styles.wrapper(isSidebarOpenMobile)}>
      <div css={styles.navigation}>
        {blocks.map((block) => (
          <div key={block.id} css={styles.block(isSidebarOpen)}>
            {block.title && isSidebarOpen && (
              <h4 css={styles.header}>{block.title}</h4>
            )}
            <ul css={[styles.list]}>
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
