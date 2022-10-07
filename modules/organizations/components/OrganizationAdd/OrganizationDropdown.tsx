import { useState } from 'react';
import IconArrow from '@public/assets/icons/arrow-right-12.svg';

import SizedIcon from '@modules/layout/components/shared/SizedIcon';

import { Button } from '@shared/components';
import { styles } from './OrganizationDropdown.styles';
import { useSetRecoilState } from 'recoil';
import { layoutState } from '@modules/layout/store/layoutAtoms';

type Props = {
  hideName?: boolean;
};

export const OrganizationDropdown: React.FC<Props> = ({ hideName }) => {
  const [isOpen, setOpen] = useState(false);
  const setLayout = useSetRecoilState(layoutState);

  return (
    <div css={styles.base}>
      <button css={styles.button} onClick={() => setOpen(!isOpen)}>
        <span css={styles.icon}>B</span>
        {!hideName && <p css={styles.orgName}>Blockjoy</p>}
        <SizedIcon additionalStyles={[styles.rotateIcon]} size="10px">
          <IconArrow />
        </SizedIcon>
      </button>
      <div css={[styles.menu, isOpen && styles.isOpen]}>
        You only have one organization
        <br />
        <br />
        <Button
          display="block"
          size="small"
          onClick={() => setLayout('organization')}
        >
          Create
        </Button>
      </div>
    </div>
  );
};
