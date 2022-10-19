import { useState } from 'react';
import IconArrow from '@public/assets/icons/arrow-right-12.svg';

import SizedIcon from '@modules/layout/components/shared/SizedIcon';

import { Button } from '@shared/components';
import { styles } from './OrganizationDropdown.styles';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { authAtoms } from '@modules/auth';

type Props = {
  hideName?: boolean;
};

export const OrganizationDropdown: React.FC<Props> = ({ hideName }) => {
  const [isOpen, setOpen] = useState(false);
  const setLayout = useSetRecoilState(layoutState);
  const user = useRecoilValue(authAtoms.user);

  return (
    <div css={styles.base}>
      <button
        css={styles.button}
        style={{ padding: hideName ? '0' : '' }}
        onClick={() => setOpen(!isOpen)}
      >
        <span css={styles.icon}>
          {user?.defaultOrganization?.name?.substring(0, 1)?.toUpperCase()}
        </span>
        {!hideName && (
          <p css={styles.orgName}>{user?.defaultOrganization?.name}</p>
        )}
        {/* <SizedIcon additionalStyles={[styles.rotateIcon]} size="10px">
          <IconArrow />
        </SizedIcon> */}
      </button>
      {/* <div css={[styles.menu, isOpen && styles.isOpen]}>
        <p>{user?.defaultOrganization?.name}</p>
        <br />
        <Button
          display="block"
          size="small"
          onClick={() => setLayout('organization')}
        >
          Create
        </Button>
      </div> */}
    </div>
  );
};
