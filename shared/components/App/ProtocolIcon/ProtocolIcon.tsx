import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { styles } from './ProtocolIcon.styles';
import { Tooltip, SvgIcon } from '@shared/components';

type Props = {
  blockchainId?: string;
  protocolName?: string;
  hideTooltip?: boolean;
  size?: string;
};

const IconProtocol = dynamic(
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

const IconArbitrum = dynamic(
  () => import(`@public/assets/icons/blockchain/Arbitrum.svg`),
);

const IconArbitrumOne = dynamic(
  () => import(`@public/assets/icons/blockchain/Arbitrum-One.svg`),
);

const IconArbitrumNova = dynamic(
  () => import(`@public/assets/icons/blockchain/Arbitrum-Nova.svg`),
);

const IconAvalanche = dynamic(
  () => import(`@public/assets/icons/blockchain/Avalanche.svg`),
);

const IconAvalancheDfk = dynamic(
  () => import(`@public/assets/icons/blockchain/Avalanche-DFK.svg`),
);

const IconAxelar = dynamic(
  () => import(`@public/assets/icons/blockchain/Axelar.svg`),
);

const IconBase = dynamic(
  () => import(`@public/assets/icons/blockchain/Base.svg`),
);

const IconBlast = dynamic(
  () => import(`@public/assets/icons/blockchain/Blast.svg`),
);

const IconBnB = dynamic(
  () => import(`@public/assets/icons/blockchain/BNB.svg`),
);

const IconBoba = dynamic(
  () => import(`@public/assets/icons/blockchain/Boba.svg`),
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

const IconFantom = dynamic(
  () => import(`@public/assets/icons/blockchain/Fantom.svg`),
);

const IconGnosis = dynamic(
  () => import(`@public/assets/icons/blockchain/Gnosis.svg`),
);

const IconGravity = dynamic(
  () => import(`@public/assets/icons/blockchain/Gravity.svg`),
);

const IconHuddle01 = dynamic(
  () => import(`@public/assets/icons/blockchain/Huddle01.svg`),
);

const IconCosmos = dynamic(
  () => import(`@public/assets/icons/blockchain/Cosmos.svg`),
);

const IconKava = dynamic(
  () => import(`@public/assets/icons/blockchain/Kava.svg`),
);

const IconKaia = dynamic(
  () => import(`@public/assets/icons/blockchain/Kaia.svg`),
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

const IconMantle = dynamic(
  () => import(`@public/assets/icons/blockchain/Mantle.svg`),
);

const IconMonero = dynamic(
  () => import(`@public/assets/icons/blockchain/Monero.svg`),
);

const IconNear = dynamic(
  () => import(`@public/assets/icons/blockchain/Near.svg`),
);

const IconOptimism = dynamic(
  () => import(`@public/assets/icons/blockchain/Optimism.svg`),
);

const IconOsmosis = dynamic(
  () => import(`@public/assets/icons/blockchain/Osmosis.svg`),
);

const IconPocket = dynamic(
  () => import(`@public/assets/icons/blockchain/Pocket.svg`),
);

const IconPolygon = dynamic(
  () => import(`@public/assets/icons/blockchain/Polygon.svg`),
);

const IconSelfID = dynamic(
  () => import(`@public/assets/icons/blockchain/SelfID.svg`),
);

const IconShape = dynamic(
  () => import(`@public/assets/icons/blockchain/Shape.svg`),
);

const IconSolana = dynamic(
  () => import(`@public/assets/icons/blockchain/Solana.svg`),
);

const IconStarknet = dynamic(
  () => import(`@public/assets/icons/blockchain/Starknet.svg`),
);

const IconSubsquid = dynamic(
  () => import(`@public/assets/icons/blockchain/Subsquid.svg`),
);

const IconSui = dynamic(
  () => import(`@public/assets/icons/blockchain/Sui.svg`),
);

const IconTellor = dynamic(
  () => import(`@public/assets/icons/blockchain/Tellor.svg`),
);

const IconTezos = dynamic(
  () => import(`@public/assets/icons/blockchain/Tezos.svg`),
);

const IconTon = dynamic(
  () => import(`@public/assets/icons/blockchain/Ton.svg`),
);

const IconZerogravity = dynamic(
  () => import(`@public/assets/icons/blockchain/0G.svg`),
);

const IconZKSync = dynamic(
  () => import(`@public/assets/icons/blockchain/ZKSync.svg`),
);

export const ProtocolIcon = ({
  protocolName,
  hideTooltip,
  size = '24px',
}: Props) => {
  const trimmedProtocolName =
    protocolName?.indexOf('-')! > 0
      ? protocolName?.substring(0, protocolName?.indexOf('-'))
      : protocolName?.indexOf('_')! > 0
      ? protocolName?.substring(0, protocolName?.indexOf('_'))
      : protocolName;
  let Component;
  switch (trimmedProtocolName?.toLowerCase()) {
    case 'aleo':
      Component = IconAleo;
      break;
    case 'aptos':
      Component = IconAptos;
      break;
    case 'algorand':
      Component = IconAlgorand;
      break;
    case 'arbitrum':
      Component = IconArbitrum;
      break;
    case 'arbitrum one':
      Component = IconArbitrumOne;
      break;
    case 'arbitrum nova':
      Component = IconArbitrumNova;
      break;
    case 'avalanche':
      Component = IconAvalanche;
      break;
    case 'avalanche-dfk':
      Component = IconAvalancheDfk;
      break;
    case 'axelar':
      Component = IconAxelar;
      break;
    case 'base':
      Component = IconBase;
      break;
    case 'blast':
      Component = IconBlast;
      break;
    case 'bnb':
    case 'bsc':
      Component = IconBnB;
      break;
    case 'boba':
      Component = IconBoba;
      break;
    case 'cardano':
      Component = IconCardano;
      break;
    case 'celo':
      Component = IconCelo;
      break;
    case 'ethereum':
      Component = IconEthereum;
      break;
    case 'eth erigon':
    case 'ethereum erigon':
    case 'erigon':
      Component = IconErigon;
      break;
    case 'fantom':
      Component = IconFantom;
      break;
    case 'gnosis':
      Component = IconGnosis;
      break;
    case 'gravity':
      Component = IconGravity;
      break;
    case 'huddle01':
      Component = IconHuddle01;
      break;
    case 'cosmos':
      Component = IconCosmos;
      break;
    case 'kaia':
      Component = IconKaia;
      break;
    case 'kava':
      Component = IconKava;
      break;
    case 'klaytn':
      Component = IconKlaytn;
      break;
    case 'lightning':
      Component = IconLightning;
      break;
    case 'mantle':
      Component = IconMantle;
      break;
    case 'monero':
      Component = IconMonero;
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
    case 'osmosis':
      Component = IconOsmosis;
      break;
    case 'pocket':
      Component = IconPocket;
      break;
    case 'polygon':
      Component = IconPolygon;
      break;
    case 'selfid':
      Component = IconSelfID;
      break;
    case 'shape':
      Component = IconShape;
      break;
    case 'solana':
      Component = IconSolana;
      break;
    case 'starknet':
      Component = IconStarknet;
      break;
    case 'subsquid':
    case 'sqd':
      Component = IconSubsquid;
      break;
    case 'sui':
      Component = IconSui;
      break;
    case 'tellor':
      Component = IconTellor;
      break;
    case 'tezos':
      Component = IconTezos;
      break;
    case 'ton':
      Component = IconTon;
      break;
    case 'zerogravity':
    case '0g':
      Component = IconZerogravity;
      break;
    case 'zksync':
      Component = IconZKSync;
      break;
    default:
      Component = IconProtocol;
      break;
  }

  return (
    <span css={styles.icon(size)}>
      {!hideTooltip && (
        <Tooltip noWrap tooltip={protocolName} customCss={[styles.tooltip]} />
      )}
      <SvgIcon isDefaultColor size={size}>
        <Suspense fallback={null}>
          <Component />
        </Suspense>
      </SvgIcon>
    </span>
  );
};
