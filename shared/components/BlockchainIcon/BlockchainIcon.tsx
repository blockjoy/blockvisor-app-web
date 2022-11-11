import { FC } from 'react';

import { styles } from './styles';

import IconBitcoin from '@public/assets/icons/bitcoin-20.svg';
import IconEthereum from '@public/assets/icons/ethereum-20.svg';

type Props = {
  blockchainId?: string;
};

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const BlockchainIcon: FC<Props> = ({ blockchainId }) => {
  return getRandomInt(0, 1) === 0 ? (
    <div css={styles.icon}>
      <IconBitcoin />
    </div>
  ) : (
    <div css={styles.icon}>
      <IconEthereum />
    </div>
  );
};
