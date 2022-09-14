import styled from '@emotion/styled';
import LogoSmall from '@public/assets/icons/blockjoy-logo-small.svg';
import { OrganizationDropdown } from '../organization/OrganizationDropdown';

const StyledWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  border-bottom: 1px solid ${(p) => p.theme.colorBorder};
`;

const StyledLogo = styled(LogoSmall)`
  & path {
    fill: #4c4f4d;
  }
`;

export default () => {
  return (
    <StyledWrapper>
      <OrganizationDropdown />
      <StyledLogo />
    </StyledWrapper>
  );
};
