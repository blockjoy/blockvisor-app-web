import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';

import IconDashboard from '@public/assets/icons/grid-12.svg';
import IconHosts from '@public/assets/icons/host-12.svg';
import IconOrganizations from '@public/assets/icons/organization-16.svg';

const StyledWrapper = styled.main`
  flex: 1 1 auto;
  padding: 20px 16px;
`;

const StyledHeader = styled.header`
  color: ${(p) => p.theme.colorLabel};
  letter-spacing: 1.5px;
  font-size: 10px;
  margin-bottom: 16px;
`;

const StyledList = styled.ul`
  margin-bottom: 24px;
`;

const StyledLink = styled.a`
  display: flex;
  gap: 10px;
  color: ${(p) => p.theme.colorText};
  padding: 12px 10px;
  font-size: 13px;
  border-radius: 8px;
  user-select: none;

  &.active {
    background: ${(p) => p.theme.colorActive};
  }

  & path {
    fill: ${(p) => p.theme.colorLabel};
  }

  &.active path {
    fill: ${(p) => p.theme.colorPrimary};
  }
`;

const blocks = [
  {
    title: 'BLOCKVISOR',
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: <IconDashboard /> },
      // { name: 'Nodes', path: '/nodes', icon: <IconNodes /> },
      { name: 'Hosts', path: '/hosts', icon: <IconHosts /> },
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
        name: 'Organizations',
        path: '/organizations',
        icon: <IconOrganizations />,
      },
    ],
  },
];

export default () => {
  const router = useRouter();
  return (
    <StyledWrapper>
      {blocks.map((block) => (
        <div key={block.title}>
          <StyledHeader>{block.title}</StyledHeader>
          <StyledList>
            {block.items.map((item) => (
              <li key={item.name}>
                <Link href={item.path}>
                  <StyledLink
                    className={
                      router.pathname.includes(item.path) ? 'active' : ''
                    }
                  >
                    {item.icon}
                    {item.name}
                  </StyledLink>
                </Link>
              </li>
            ))}
          </StyledList>
        </div>
      ))}
    </StyledWrapper>
  );
};
