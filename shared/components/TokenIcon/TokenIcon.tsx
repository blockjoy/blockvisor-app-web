import { FC } from 'react';
import AlgoIcon from '@public/assets/tokens/algo-24.svg';
import AvaxIcon from '@public/assets/tokens/avax-24.svg';
import BtcIcon from '@public/assets/tokens/btc-24.svg';
import EthIcon from '@public/assets/tokens/eth-24.svg';
import HntIcon from '@public/assets/tokens/hnt-24.svg';
import SolIcon from '@public/assets/tokens/sol-24.svg';

export interface Props {
  tokenCode: TokenCode;
}

export const StateIcon: FC<Props> = ({ tokenCode }) => {
  function renderIcon() {
    switch (tokenCode) {
      case 'algo':
        return <AlgoIcon />;
      case 'avax':
        return <AvaxIcon />;
      case 'btc':
        return <BtcIcon />;
      case 'eth':
        return <EthIcon />;
      case 'hnt':
        return <HntIcon />;
      case 'sol':
        return <SolIcon />;
    }
  }

  return renderIcon();
};
