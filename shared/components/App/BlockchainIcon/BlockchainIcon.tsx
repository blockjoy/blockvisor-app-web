import { FC, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { styles } from './BlockchainIcon.styles';
import { Tooltip, SvgIcon } from '@shared/components';

type Props = {
  blockchainId?: string;
  blockchainName?: string;
  hideTooltip?: boolean;
  size?: string;
};

const IconBlockchain = dynamic(
  () => import(`@public/assets/icons/blockchain/Blockchain.svg`),
);

const IconAleo = dynamic(
  () => import(`@public/assets/icons/blockchain/Aleo.svg`),
);

const IconAptos = dynamic(
  () => import(`@public/assets/icons/blockchain/Aptos.svg`),
);

const IconAlgorand = dynamic(
  () => import(`@public/assets/icons/blockchain/Algorand.svg`),
);

const IconAvalanche = dynamic(
  () => import(`@public/assets/icons/blockchain/Avalanche.svg`),
);

const IconBnB = dynamic(
  () => import(`@public/assets/icons/blockchain/BNB.svg`),
);

const IconCardano = dynamic(
  () => import(`@public/assets/icons/blockchain/Cardano.svg`),
);

const IconCelo = dynamic(
  () => import(`@public/assets/icons/blockchain/Celo.svg`),
);

const IconEthereum = dynamic(
  () => import(`@public/assets/icons/blockchain/Ethereum.svg`),
);

const IconErigon = dynamic(
  () => import(`@public/assets/icons/blockchain/Erigon.svg`),
);

const IconGnosis = dynamic(
  () => import(`@public/assets/icons/blockchain/Gnosis.svg`),
);

const IconCosmos = dynamic(
  () => import(`@public/assets/icons/blockchain/Cosmos.svg`),
);

const IconKlaytn = dynamic(
  () => import(`@public/assets/icons/blockchain/Klaytn.svg`),
);

const IconLightning = dynamic(
  () => import(`@public/assets/icons/blockchain/Lightning.svg`),
);

const IconHelium = dynamic(
  () => import(`@public/assets/icons/blockchain/Helium.svg`),
);

const IconNear = dynamic(
  () => import(`@public/assets/icons/blockchain/Near.svg`),
);

const IconOptimism = dynamic(
  () => import(`@public/assets/icons/blockchain/Optimism.svg`),
);

const IconPocket = dynamic(
  () => import(`@public/assets/icons/blockchain/Pocket.svg`),
);

const IconPolygon = dynamic(
  () => import(`@public/assets/icons/blockchain/Polygon.svg`),
);

const IconSolana = dynamic(
  () => import(`@public/assets/icons/blockchain/Solana.svg`),
);

const IconStarknet = dynamic(
  () => import(`@public/assets/icons/blockchain/Starknet.svg`),
);

const IconTezos = dynamic(
  () => import(`@public/assets/icons/blockchain/Tezos.svg`),
);

export const BlockchainIcon: FC<Props> = ({
  blockchainName,
  hideTooltip,
  size = '24px',
}) => {
  let Component;
  switch (blockchainName?.toLowerCase()) {
    case 'aleo':
      Component = IconAleo;
      break;
    case 'aptos':
      Component = IconAptos;
      break;
    case 'algorand':
      Component = IconAlgorand;
      break;
    case 'avalanche':
      Component = IconAvalanche;
      break;
    case 'bnb':
      Component = IconBnB;
      break;
    case 'cardano':
      Component = IconCardano;
      break;
    case 'celo':
      Component = IconCelo;
      break;
    case 'ethereum':
    case 'ethereum pos':
    case 'ethereum-reth':
    case 'ethereum-stateless':
      Component = IconEthereum;
      break;
    case 'eth erigon':
    case 'ethereum erigon':
    case 'erigon':
      Component = IconErigon;
      break;
    case 'gnosis':
      Component = IconGnosis;
      break;
    case 'cosmos':
      Component = IconCosmos;
      break;
    case 'klaytn':
      Component = IconKlaytn;
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
    case 'optimism':
      Component = IconOptimism;
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
    case 'starknet':
      Component = IconStarknet;
      break;
    case 'tezos':
      Component = IconTezos;
      break;
    default:
      Component = IconBlockchain;
      break;
  }

  return (
    <span css={styles.icon}>
      {!hideTooltip && (
        <Tooltip
          noWrap
          tooltip={blockchainName!}
          customCss={[styles.tooltip]}
        />
      )}
      <SvgIcon isDefaultColor size={size}>
        <Suspense fallback={null}>
          <Component />
        </Suspense>
      </SvgIcon>
    </span>
  );
};
