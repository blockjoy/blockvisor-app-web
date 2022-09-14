import styled from '@emotion/styled';

import TopbarUser from './TopbarUser';
// import TopbarSearch from "./TopbarSearch";
import TopbarBlockvisor from './TopbarBlockvisor';
import TopbarBurger from './TopbarBurger';

import { OrganizationDropdown } from '../organization/OrganizationDropdown';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  position: fixed;
  z-index: 4;
  top: 0;
  left: 0;
  width: 100%;
  height: 56px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(p) => p.theme.colorBackground};
  border-bottom: 1px solid ${(p) => p.theme.colorBorder};

  @media only screen and (min-width: ${(p) => p.theme.screenSm}) {
    padding-left: 300px;
    z-index: 4;
  }
`;

const StyledActionsLeft = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 0 16px;
  transition: all 0.3s;

  @media only screen and (min-width: ${(p) => p.theme.screenSm}) {
    opacity: 0;
    visibility: hidden;
  }
`;

export default () => {
  return (
    <StyledWrapper>
      <StyledActionsLeft>
        <TopbarBurger />
        <OrganizationDropdown hideName />
      </StyledActionsLeft>
      <TopbarBlockvisor />
      {/* <TopbarSearch /> */}
      <TopbarUser />
    </StyledWrapper>
  );
};
