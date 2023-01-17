import { FC, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { styles } from './styles';
import { blockchainList } from '@shared/constants/lookups';

type Props = {
  blockchainId?: string;
  blockchainName?: string;
  hideTooltip?: boolean;
};

const IconAptos = dynamic(
  () => import(`@public/assets/icons/blockchain-aptos-24.svg`),
);

const IconAlgorand = dynamic(
  () => import(`@public/assets/icons/blockchain-algorand-24.svg`),
);

const IconAvalanche = dynamic(
  () => import(`@public/assets/icons/blockchain-avalanche-24.svg`),
);

const IconCardano = dynamic(
  () => import(`@public/assets/icons/blockchain-cardano-24.svg`),
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

const IconNear = dynamic(
  () => import(`@public/assets/icons/blockchain-near-24.svg`),
);

const IconPocket = dynamic(
  () => import(`@public/assets/icons/blockchain-pocket-24.svg`),
);

const IconPolygon = dynamic(
  () => import(`@public/assets/icons/blockchain-polygon-24.svg`),
);

const IconSolana = dynamic(
  () => import(`@public/assets/icons/blockchain-solana-24.svg`),
);

export const BlockchainIcon: FC<Props> = ({
  blockchainId,
  blockchainName,
  hideTooltip,
}) => {
  let name =
    blockchainName ||
    blockchainList.find((b) => b.value === blockchainId)?.label;

  let Component;

  switch (name?.toLowerCase()) {
    case 'aptos':
      Component = IconAptos;
      break;
    case 'algorand':
      Component = IconAlgorand;
      break;
    case 'avalanche':
      Component = IconAvalanche;
      break;
    case 'cardano':
      Component = IconCardano;
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
    case 'near':
      Component = IconNear;
      break;
    case 'pocket':
      Component = IconPocket;
      break;
    case 'polygon':
      Component = IconPolygon;
      break;
    case 'solana':
      Component = IconSolana;
      break;
    default:
      Component = IconAlgorand;
      break;
  }

  return (
    <span css={styles.icon}>
      {!hideTooltip && (
        <span className="tooltip" css={styles.tooltip}>
          {name}
        </span>
      )}
      <Suspense fallback={null}>
        <Component />
      </Suspense>
    </span>
  );
};
