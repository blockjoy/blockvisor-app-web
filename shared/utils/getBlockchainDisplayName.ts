const displayNames = [
  { name: 'Arbitrum', displayName: 'Arbitrum-Nova' },
  { name: 'Near_Archive', displayName: 'Near-Archive' },
];

export const getBlockchainDisplayName = (name: string) => {
  const displayName =
    displayNames.find((blockchain) => blockchain.name === name)?.displayName ||
    name;

  return displayName;
};
