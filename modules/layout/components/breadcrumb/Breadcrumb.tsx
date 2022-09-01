import styled from "@emotion/styled";

const StyledBreadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 56px;
  padding: 0 16px;
  margin-top: 56px;
  margin-bottom: 16px;
  font-size: 13px;

  @media only screen and (min-width: ${p => p.theme.screenSm}) {
    margin-top: 0;
  }
`;

const StyledBreadcrumbItem = styled.span`
  display: flex;
  gap: 12px;
  
  & > .breadcrumb-icon {
    color: #5F615D;
  }

  & > .breadcrumb-text {
    color: #a5a8a3;
  }

  &:first-child .breadcrumb-text {
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
                    && <span className="breadcrumb-icon uil uil-angle-right" />}
            </StyledBreadcrumbItem>
        )}
    </StyledBreadcrumb>
  );
}

export default Breadcrumb;