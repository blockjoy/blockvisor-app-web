import { useState } from 'react';

import styled from '@emotion/styled';

import { css } from '@emotion/react';

import IconArrow from '@public/assets/icons/arrow-right-12.svg';

import SizedIcon from '@modules/layout/components/shared/SizedIcon';

import { Button } from '@shared/components';
import { styles } from './OrganizationDropdown.styles';

type Props = {
  hideName?: boolean;
};

const StyledDropdownIcon = styled(SizedIcon)<any>`
  transform: rotate(90deg);
`;

export const OrganizationDropdown: React.FC<Props> = ({ hideName }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div css={styles.base}>
      <button css={styles.button} onClick={() => setOpen(!isOpen)}>
        <span css={styles.icon}>B</span>
        {!hideName && <p css={styles.orgName}>Blockjoy</p>}
        <StyledDropdownIcon size="10px">
          <IconArrow />
        </StyledDropdownIcon>
      </button>
      <div css={[styles.menu, isOpen && styles.isOpen]}>
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
      </div>
    </div>
  );
};
