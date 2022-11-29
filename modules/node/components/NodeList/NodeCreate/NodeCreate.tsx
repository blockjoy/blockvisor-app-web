import { styles } from './NodeCreate.styles';
import IconBuild from '@public/assets/icons/build-16.svg';
import { BlockchainIcon } from '@shared/components';
import { useState } from 'react';

type NodeCreate = {
  blockchainId: string;
  blockchainName: string;
};

export const NodeCreate = () => {
  const [node, setNode] = useState<NodeCreate>({
    blockchainId: '',
    blockchainName: 'Ethereum',
  });

  const handleCreateClicked = () => {
    console.log('create');
  };

  return (
    <div css={styles.wrapper}>
      <span css={styles.blockchainIcon}>
        <BlockchainIcon />
      </span>
      <input spellCheck={false} value="Ethereum" css={styles.blockchainInput} />
      <button css={styles.createButton}>
        <IconBuild />
      </button>
    </div>
  );
};
