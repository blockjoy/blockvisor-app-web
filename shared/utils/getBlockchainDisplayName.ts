const displayNames = [{ name: 'Arbitrum', displayName: 'Arbitrum-Nova' }];

export const getBlockchainDisplayName = (name: string) => {
  const displayName =
    displayNames.find((blockchain) => blockchain.name === name)?.displayName ||
    name;

  return displayName;
};
