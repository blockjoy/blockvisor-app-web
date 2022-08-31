import styled from "@emotion/styled";
import Link from 'next/link';
import { useRouter } from "next/router";

const StyledWrapper = styled.main`
    flex: 1 1 auto;
    padding: 20px 16px;
`;

const StyledHeader = styled.header`
  color: #A5A8A3;
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
  color: #f9f9f9;
  padding: 12px 10px;
  font-size: 15px;
  border-radius: 8px;

  &.active {
    background: #363938;
  }

  &.active > span {
    color: #bff589;
  }
`;

const blocks = [
  {
    title: "NODES & HOSTS",
    items: [
      { name: "Dashboard", path: "/dashboard", icon: "apps" },
      { name: "Nodes", path: "/nodes", icon: "box" },
      { name: "Hosts", path: "/hosts", icon: "server" },
    ]
  },
  {
    title: "BROADCASTS",
    items: [
      { name: "Automation", path: "/automation", icon: "sync" },
    ]
  },
  {
    title: "ADMIN",
    items: [
      { name: "Admin Console", path: "/admin", icon: "arrow-random" },
    ]
  }
]

export default () => {
  const router = useRouter();
  console.log("router", router.pathname);
  return (
   <StyledWrapper>
    {blocks.map(block => (
      <>
        <StyledHeader>
          {block.title}
        </StyledHeader>
        <StyledList>
          {block.items.map(item => (
            <li>
              <Link href={item.path}>
                <StyledLink className={router.pathname === item.path ? "active" : ""}>
                  <span className={`uil uil-${item.icon}`} />
                  {item.name}
                </StyledLink>
              </Link>
            </li>
          ))}
        </StyledList>
      </>
    ))}
   </StyledWrapper>
  );
}
