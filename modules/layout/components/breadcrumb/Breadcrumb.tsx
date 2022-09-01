import styled from "@emotion/styled";

import IconArrow from "@public/assets/icons/arrow-right-12.svg";

import SizedIcon from "../shared/SizedIcon";

const StyledBreadcrumb = styled.div`
  position: fixed;
  z-index: 5;
  top: 0;
  left: 300px;
  display: none;
  align-items: center;
  gap: 10px;
  height: 56px;
  padding: 0 24px;
  font-size: 13px;

  @media only screen and (min-width: ${p => p.theme.screenSm}) {
    display: flex;
  }
`;

const StyledBreadcrumbItem = styled.span`
  display: flex;
  align-items: center;
  gap: 12px;
  
  & > .breadcrumb-icon {
    color: #5F615D;
  }

  & > .breadcrumb-text {
    color: #a5a8a3;
  }

  &:first-of-type .breadcrumb-text {
    color: ${p => p.theme.colorPrimary};
  }
`;

interface LayoutType {
  breadcrumb?: string[]
}

  const Breadcrumb: React.FC<LayoutType>  = ({ breadcrumb }) => {
  return (
    <StyledBreadcrumb>
        {breadcrumb?.map((link, index) => 
            <StyledBreadcrumbItem key={link}>
                <span className="breadcrumb-text">
                {link}
                </span>
                {index !== breadcrumb.length - 1 
                    && <SizedIcon size="6px"><IconArrow className="breadcrumb-icon" /></SizedIcon>}
            </StyledBreadcrumbItem>
        )}
    </StyledBreadcrumb>
  );
}

export default Breadcrumb;