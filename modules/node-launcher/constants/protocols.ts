import IconAxelar from '@public/assets/icons/blockchain/Axelar.svg';
import IconSolana from '@public/assets/icons/blockchain/Solana.svg';
import IconProtocol from '@public/assets/icons/blockchain/Blockchain.svg';
import IconAleo from '@public/assets/icons/blockchain/Aleo.svg';
import IconAptos from '@public/assets/icons/blockchain/Aptos.svg';
import IconAlgorand from '@public/assets/icons/blockchain/Algorand.svg';
import IconArbitrum from '@public/assets/icons/blockchain/Arbitrum.svg';
import IconArbitrumOne from '@public/assets/icons/blockchain/Arbitrum-One.svg';
import IconArbitrumNova from '@public/assets/icons/blockchain/Arbitrum-Nova.svg';
import IconAvalanche from '@public/assets/icons/blockchain/Avalanche.svg';
import IconAvalancheDfk from '@public/assets/icons/blockchain/Avalanche-DFK.svg';
import IconBase from '@public/assets/icons/blockchain/Base.svg';
import IconBlast from '@public/assets/icons/blockchain/Blast.svg';
import IconBoba from '@public/assets/icons/blockchain/Boba.svg';
import IconBnB from '@public/assets/icons/blockchain/BNB.svg';
import IconCardano from '@public/assets/icons/blockchain/Cardano.svg';
import IconCelo from '@public/assets/icons/blockchain/Celo.svg';
import IconEthereum from '@public/assets/icons/blockchain/Ethereum.svg';
import IconErigon from '@public/assets/icons/blockchain/Erigon.svg';
import IconFantom from '@public/assets/icons/blockchain/Fantom.svg';
import IconGnosis from '@public/assets/icons/blockchain/Gnosis.svg';
import IconGravity from '@public/assets/icons/blockchain/Gravity.svg';
import IconHuddle01 from '@public/assets/icons/blockchain/Huddle01.svg';
import IconCosmos from '@public/assets/icons/blockchain/Cosmos.svg';
import IconKava from '@public/assets/icons/blockchain/Kava.svg';
import IconKaia from '@public/assets/icons/blockchain/Kaia.svg';
import IconKlaytn from '@public/assets/icons/blockchain/Klaytn.svg';
import IconLightning from '@public/assets/icons/blockchain/Lightning.svg';
import IconHelium from '@public/assets/icons/blockchain/Helium.svg';
import IconMonero from '@public/assets/icons/blockchain/Monero.svg';
import IconNear from '@public/assets/icons/blockchain/Near.svg';
import IconOptimism from '@public/assets/icons/blockchain/Optimism.svg';
import IconOsmosis from '@public/assets/icons/blockchain/Osmosis.svg';
import IconPocket from '@public/assets/icons/blockchain/Pocket.svg';
import IconPolygon from '@public/assets/icons/blockchain/Polygon.svg';
import IconSelfID from '@public/assets/icons/blockchain/SelfID.svg';
import IconShape from '@public/assets/icons/blockchain/Shape.svg';
import IconStarknet from '@public/assets/icons/blockchain/Starknet.svg';
import IconSubsquid from '@public/assets/icons/blockchain/Subsquid.svg';
import IconSui from '@public/assets/icons/blockchain/Sui.svg';
import IconTellor from '@public/assets/icons/blockchain/Tellor.svg';
import IconTezos from '@public/assets/icons/blockchain/Tezos.svg';
import IconTon from '@public/assets/icons/blockchain/Ton.svg';
import IconZerogravity from '@public/assets/icons/blockchain/0G.svg';
import IconZKSync from '@public/assets/icons/blockchain/ZKSync.svg';

export const PROTOCOL_PRESENTATION = [
  // A
  {
    key: 'aleo',
    color: '#000000',
    Icon: IconAleo,
  },
  {
    key: 'algorand',
    color: '#000000',
    Icon: IconAlgorand,
  },
  {
    key: 'aptos',
    color: '#1E1E1E',
    Icon: IconAptos,
  },
  {
    key: 'arbitrum',
    color: '#28A0F0', // or #2D374B
    Icon: IconArbitrum,
  },
  {
    key: 'arbitrum-one',
    color: '#2D374B',
    Icon: IconArbitrumOne,
  },
  {
    key: 'arbitrum-nova',
    color: '#000000',
    Icon: IconArbitrumNova,
  },
  {
    key: 'avalanche',
    color: '#E84142',
    Icon: IconAvalanche,
  },
  {
    key: 'avalanche-dfk',
    color: '#E84142', // same brand color or a variant
    Icon: IconAvalancheDfk,
  },
  {
    key: 'axelar',
    color: '#04070a',
    Icon: IconAxelar,
  },

  // B
  {
    key: 'base',
    color: '#0052FF',
    Icon: IconBase,
  },
  {
    key: 'blast',
    color: '#0E77B7',
    Icon: IconBlast,
  },
  {
    key: 'boba',
    color: '#fff',
    Icon: IconBoba,
  },
  {
    key: 'bnb', // or bsc
    color: '#F0B90B',
    Icon: IconBnB,
  },
  {
    key: 'bsc', // or bsc
    color: '#F0B90B',
    Icon: IconBnB,
  },

  // C
  {
    key: 'cardano',
    color: '#0033AD',
    Icon: IconCardano,
  },
  {
    key: 'celo',
    color: '#fcff52',
    Icon: IconCelo,
  },
  {
    key: 'cosmos',
    color: '#4641FF', // or #2D2D2D
    Icon: IconCosmos,
  },

  // E
  {
    key: 'ethereum',
    color: '#627EEA',
    Icon: IconEthereum,
  },
  {
    key: 'erigon',
    color: '#000000', // no official color, fallback
    Icon: IconErigon,
  },

  // F
  {
    key: 'fantom',
    color: '#1969FF',
    Icon: IconFantom,
  },

  // G
  {
    key: 'gnosis',
    color: '#3e6957',
    Icon: IconGnosis,
  },
  {
    key: 'gravity',
    color: '#000000', // not sure, fallback
    Icon: IconGravity,
  },

  // H
  {
    key: 'helium',
    color: '#48C2F3',
    Icon: IconHelium,
  },
  {
    key: 'huddle01',
    color: '#0A2049', // approximate
    Icon: IconHuddle01,
  },

  // K
  {
    key: 'kaia',
    color: '#000000', // fallback
    Icon: IconKaia,
  },
  {
    key: 'kava',
    color: '#FF564F',
    Icon: IconKava,
  },
  {
    key: 'klaytn',
    color: '#8B5742',
    Icon: IconKlaytn,
  },

  // L
  {
    key: 'lightning',
    color: '#F6BB43',
    Icon: IconLightning,
  },

  // M
  {
    key: 'monero',
    color: '#FF6600',
    Icon: IconMonero,
  },

  // N
  {
    key: 'near',
    color: '#000000', // official brand tends to black/gray
    Icon: IconNear,
  },

  // O
  {
    key: 'optimism',
    color: '#FF0420',
    Icon: IconOptimism,
  },
  {
    key: 'osmosis',
    color: '#7046B2',
    Icon: IconOsmosis,
  },

  // P
  {
    key: 'pocket',
    color: '#2F75FF',
    Icon: IconPocket,
  },
  {
    key: 'polygon',
    color: '#8247E5',
    Icon: IconPolygon,
  },

  // S
  {
    key: 'selfid',
    color: '#000000', // fallback
    Icon: IconSelfID,
  },
  {
    key: 'shape',
    color: '#000000', // fallback
    Icon: IconShape,
  },
  {
    key: 'solana',
    color: '#9945ff',
    Icon: IconSolana,
  },
  {
    key: 'starknet',
    color: '#5FC8F8',
    Icon: IconStarknet,
  },
  {
    key: 'sqd',
    color: '#0036FF',
    Icon: IconSubsquid,
  },
  {
    key: 'sui',
    color: '#6B67FB',
    Icon: IconSui,
  },

  // T
  {
    key: 'tellor',
    color: '#0ad482',
    Icon: IconTellor,
  },
  {
    key: 'tezos',
    color: '#2C7DF7',
    Icon: IconTezos,
  },
  {
    key: 'ton',
    color: '#139DEA',
    Icon: IconTon,
  },

  // Z
  {
    key: 'zerogravity',
    color: '#000000', // fallback
    Icon: IconZerogravity,
  },
  {
    key: 'zksync',
    color: '#8C8DFB',
    Icon: IconZKSync,
  },
];

export const PROTOCOL_PRESENTATION_DEFAULT = {
  key: 'protocol',
  color: '#5F615D',
  Icon: IconProtocol,
};

const PROTOCOL_KEYS = [
  'arbitrum-nova',
  'arbitrum-one',
  'avalanche',
  'axelar',
  'base',
  'blast',
  'bsc',
  'celo',
  'ethereum',
  'fantom',
  'gnosis',
  'kaia',
  'legacy',
  'near',
  'optimism',
  'polygon',
  'shape',
  'sqd',
  'sui',
  'tellor',
];
