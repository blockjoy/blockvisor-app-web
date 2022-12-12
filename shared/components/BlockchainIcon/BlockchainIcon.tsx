import { FC, Suspense } from 'react';

import dynamic from 'next/dynamic';

import { styles } from './styles';

import { blockchainList } from '@shared/constants/lookups';

type Props = {
  blockchainId?: string;
  hideTooltip?: boolean;
};

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const IconAlgorand = dynamic(
  () => import(`@public/assets/icons/blockchain-algorand-24.svg`),
);

const IconEthereum = dynamic(
  () => import(`@public/assets/icons/blockchain-ethereum-24.svg`),
);

const IconCosmos = dynamic(
  () => import(`@public/assets/icons/blockchain-cosmos-alt-24.svg`),
);

const IconLightning = dynamic(
  () => import(`@public/assets/icons/blockchain-lightning-alt-24.svg`),
);

const IconHelium = dynamic(
  () => import(`@public/assets/icons/blockchain-helium-24.svg`),
);

const IconPocket = dynamic(
  () => import(`@public/assets/icons/blockchain-pocket-24.svg`),
);

export const BlockchainIcon: FC<Props> = ({ blockchainId, hideTooltip }) => {
  const blockchainName = blockchainList.find(
    (b) => b.value === blockchainId,
  )?.label;

  let Component;

  switch (blockchainName?.toLowerCase()) {
    case 'algorand':
      Component = IconAlgorand;
      break;
    case 'ethereum':
    case 'ethereum pos':
      Component = IconEthereum;
      break;
    case 'cosmos':
      Component = IconCosmos;
      break;
    case 'lightning':
      Component = IconLightning;
      break;
    case 'helium':
      Component = IconHelium;
      break;
    case 'pocket':
      Component = IconPocket;
      break;
    default:
      Component = IconAlgorand;
      break;
  }

  return (
    <span css={styles.icon}>
      {!hideTooltip && (
        <span className="tooltip" css={styles.tooltip}>
          {blockchainName}
        </span>
      )}

      <Suspense fallback={<></>}>
        <Component />
      </Suspense>
    </span>
  );
};
