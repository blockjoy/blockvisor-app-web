import { nodeLauncherAtoms } from '@modules/node/store/nodeLauncherAtoms';
import { nodeLauncherSelectors } from '@modules/node/store/nodeLauncherSelectors';
import { NodeLauncherVariantSegments } from '@modules/node/types/common';
import { FormLabel, PillPicker } from '@shared/components';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

type Props = {
  onVariantSegmentsChanged: (
    variantSegments: NodeLauncherVariantSegments,
  ) => void;
};

export const NodeLauncherConfigVariant = ({
  onVariantSegmentsChanged,
}: Props) => {
  const selectedVariantSegments = useRecoilValue(
    nodeLauncherAtoms.selectedVariantSegments,
  );

  const allNetworks = useRecoilValue(nodeLauncherSelectors.allNetworks);
  const allNodeTypes = useRecoilValue(nodeLauncherSelectors.allNodeTypes);
  const allClients = useRecoilValue(nodeLauncherSelectors.allClients);

  const availableNetworks = useRecoilValue(
    nodeLauncherSelectors.availableNetworks,
  );

  const availableClients = useRecoilValue(
    nodeLauncherSelectors.availableClients,
  );

  const handleChange = (
    key: 'nodeType' | 'network' | 'client',
    item: { id?: string; name?: string },
  ) => {
    let nextSegments = {
      ...selectedVariantSegments,
      [key]: { ...selectedVariantSegments?.[key] },
    };

    nextSegments[key].selectedItem = {
      ...{
        id: item.id,
        name: item.name,
      },
    };

    onVariantSegmentsChanged(nextSegments);
  };

  useEffect(() => {
    const segmentsCopy = { ...selectedVariantSegments };

    if (
      !availableNetworks?.some(
        (availableNetwork) =>
          availableNetwork === selectedVariantSegments.network.selectedItem?.id,
      )
    ) {
      segmentsCopy.network = { selectedItem: null };
    }

    if (
      !availableClients.some(
        (client) => client === selectedVariantSegments.client.selectedItem?.id,
      )
    ) {
      segmentsCopy.client = { selectedItem: null };
    }

    onVariantSegmentsChanged(segmentsCopy);
  }, [selectedVariantSegments.nodeType]);

  useEffect(() => {
    const segmentsCopy = { ...selectedVariantSegments };

    if (
      !availableClients.some(
        (c) => c === selectedVariantSegments.client.selectedItem?.id,
      )
    ) {
      segmentsCopy.client = { selectedItem: null };
    }

    onVariantSegmentsChanged(segmentsCopy);
  }, [selectedVariantSegments.network]);

  return (
    <>
      {Boolean(allNodeTypes?.length) && (
        <>
          <FormLabel isCapitalized>Node Type</FormLabel>
          <PillPicker
            onChange={(item) => handleChange('nodeType', item)}
            items={
              allNodeTypes?.map((nodeType) => ({
                id: nodeType,
                name: nodeType,
              }))!
            }
            selectedItem={selectedVariantSegments?.nodeType.selectedItem!}
            name="node-type"
          />
        </>
      )}

      {Boolean(allNetworks?.length) && (
        <>
          <FormLabel isCapitalized>Network</FormLabel>
          <PillPicker
            onChange={(item) => handleChange('network', item)}
            items={
              allNetworks?.map((network) => ({
                id: network,
                name: network,
                isDisabled: !availableNetworks?.some(
                  (availableNetwork) => availableNetwork === network,
                ),
              }))!
            }
            selectedItem={selectedVariantSegments?.network.selectedItem!}
            name="network"
          />
        </>
      )}

      {Boolean(allClients?.length) && (
        <>
          <FormLabel isCapitalized>Client</FormLabel>
          <PillPicker
            onChange={(item) => handleChange('client', item)}
            items={
              allClients?.map((client) => ({
                id: client,
                name: client,
                isDisabled: !availableClients.some(
                  (availableClient) => availableClient === client,
                ),
              }))!
            }
            selectedItem={selectedVariantSegments?.client.selectedItem!}
            name="client"
          />
        </>
      )}
    </>
  );
};
