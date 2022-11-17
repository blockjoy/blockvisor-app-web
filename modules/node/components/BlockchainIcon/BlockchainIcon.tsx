import Image from 'next/image';

type Props = {
  blockchain: string;
};
export function BlockchainIcon({ blockchain }: Props) {
  switch (blockchain) {
    case 'Ethereum 2.0':
      return (
        <Image src={'/assets/images/EthereumX2.png'} width={32} height={32} />
      );
    case 'Avalanche':
      return (
        <Image src={'/assets/images/AvalancheX2.png'} width={32} height={32} />
      );
    case 'Solana':
      return (
        <Image src={'/assets/images/SolanaX2.png'} width={32} height={32} />
      );

    case 'Algorand':
      return (
        <Image src={'/assets/images/AlgorandX2.png'} width={32} height={32} />
      );

    default:
      return (
        <Image src={'/assets/images/EthereumX2.png'} width={32} height={32} />
      );
  }
}
