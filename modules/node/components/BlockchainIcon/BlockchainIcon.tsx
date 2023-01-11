import Image from 'next/image';

type Props = {
  blockchain: string;
};
export function BlockchainIcon({ blockchain }: Props) {
  switch (blockchain) {
    case 'Ethereum 2.0':
      return (
        <Image
          alt="Ethereum icon"
          src={'/assets/images/EthereumX2.png'}
          width={32}
          height={32}
        />
      );
    case 'Avalanche':
      return (
        <Image
          alt="Avalanche icon"
          src={'/assets/images/AvalancheX2.png'}
          width={32}
          height={32}
        />
      );
    case 'Solana':
      return (
        <Image
          alt="Solana icon"
          src={'/assets/images/SolanaX2.png'}
          width={32}
          height={32}
        />
      );

    case 'Algorand':
      return (
        <Image
          alt="Algorand icon"
          src={'/assets/images/AlgorandX2.png'}
          width={32}
          height={32}
        />
      );

    default:
      return (
        <Image
          alt="Ethereum icon"
          src={'/assets/images/EthereumX2.png'}
          width={32}
          height={32}
        />
      );
  }
}
