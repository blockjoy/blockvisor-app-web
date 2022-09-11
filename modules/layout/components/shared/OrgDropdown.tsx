import { useState } from 'react';

import styled from '@emotion/styled';

import { css } from '@emotion/react';

import IconArrow from '@public/assets/icons/arrow-right-12.svg';

import SizedIcon from '@modules/layout/components/shared/SizedIcon';

import { Button } from '@shared/components';

type Props = {
  hideName?: boolean;
};

type MenuProps = {
  isOpen: boolean;
};

const StyledWrapper = styled.div`
  position: relative;
`;

const StyledDropdownButton = styled.button`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 56px;
  width: 200px;
  background: transparent;
  border: 0;
  cursor: pointer;
`;

const StyledOrgIcon = styled.div`
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #bff589;
  color: #212423;
  font-size: 12px;
  font-weight: 500;
`;

const StyledOrgName = styled.div`
  color: ${(p) => p.theme.colorText};
  font-size: 14px;
`;

const StyledDropdownIcon = styled(SizedIcon)<any>`
  transform: rotate(90deg);
`;

const menuOpenStyles = css`
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
`;

const StyledMenu = styled.div<MenuProps>`
  position: absolute;
  top: 62px;
  left: 0;
  background: ${(p) => p.theme.colorSidebar};
  border: 1px solid ${(p) => p.theme.colorBorder};
  border-radius: 6px;
  padding: 16px;
  font-size: 14px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-16px);
  transition: all 0.4s;

  ${(p) => p.isOpen && menuOpenStyles};
`;

export const OrgDropdown: React.FC<Props> = ({ hideName }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <StyledWrapper>
      <StyledDropdownButton onClick={() => setOpen(!isOpen)}>
        <StyledOrgIcon>B</StyledOrgIcon>
        {!hideName && <StyledOrgName>Blockjoy</StyledOrgName>}
        <StyledDropdownIcon size="10px">
          <IconArrow />
        </StyledDropdownIcon>
      </StyledDropdownButton>
      <StyledMenu isOpen={isOpen}>
        You only have one organization
        <br />
        <br />
        <Button
          display="block"
          size="small"
          onClick={() => console.log('add org')}
        >
          Create
        </Button>
      </StyledMenu>
    </StyledWrapper>
  );
};
