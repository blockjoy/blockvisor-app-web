export const parseVariant = (variant: string) => {
  const parts = variant?.split('-');

  return {
    client: parts?.slice(0, parts.length - 2).join('-'),
    nodeType: parts?.[parts.length - 1],
    network: parts?.[parts.length - 2],
  };
};

export const parseVariantMetadata = (
  metadata: { metadataKey?: string; value?: string }[] = [],
): Variant =>
  metadata.reduce((acc, { metadataKey, value }) => {
    if (metadataKey === 'node-type') {
      acc.nodeType = value;
    } else if (metadataKey === 'client' || metadataKey === 'network') {
      acc[metadataKey] = value;
    }
    return acc;
  }, {} as Variant);

export const createVariantKey = (
  client?: string | null,
  network?: string | null,
  nodeType?: string | null,
): string | null => {
  if (!client || !network || !nodeType) return null;
  return `${client}-${network}-${nodeType}`;
};

export const getAllVariants = (
  clients: string[],
  networks: string[],
  nodeTypes: string[],
) => {
  const variants: string[] = [];

  for (const client of clients) {
    for (const network of networks) {
      for (const nodeType of nodeTypes) {
        const variant = createVariantKey(client, network, nodeType);
        if (variant) variants.push(variant);
      }
    }
  }

  return variants;
};

export const getAvailableVariantOptions = (
  type: 'client' | 'network' | 'nodeType',
  variants: string[],
  selectedClient?: string | null,
  selectedNetwork?: string | null,
  selectedNodeType?: string | null,
) => {
  const parsedVariants = variants.map(parseVariant);

  const filters: {
    key: 'client' | 'network' | 'nodeType';
    value?: string | null;
  }[] = [
    { key: 'client', value: selectedClient },
    { key: 'network', value: selectedNetwork },
    { key: 'nodeType', value: selectedNodeType },
  ];

  const filteredVariants = filters.reduce((acc, { key, value }) => {
    if (value && type !== key) {
      return acc.filter((variant) => variant[key] === value);
    }
    return acc;
  }, parsedVariants);

  const availableTypes = filteredVariants.map((variant) => variant[type]);
  return Array.from(new Set(availableTypes));
};
