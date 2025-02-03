import { VersionMetadata } from '@modules/grpc/library/blockjoy/common/v1/protocol';
import { nodeLauncherAtoms } from '@modules/node/store/nodeLauncherAtoms';
import { FormLabel, PillPicker, sort } from '@shared/components';
import { Fragment, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { kebabToCapitalized } from 'utils';

type Props = {
  onChange: (variant: string) => void;
};

export const NodeLauncherConfigVariant = ({ onChange }: Props) => {
  const selectedProtocol = useRecoilValue(nodeLauncherAtoms.selectedProtocol);
  const selectedVariant = useRecoilValue(nodeLauncherAtoms.selectedVariant);
  const variants = useRecoilValue(nodeLauncherAtoms.variants);

  const [groupedMetadata, setGroupedMetadata] =
    useState<[string, string[]][]>();

  function groupByMetadataKey(
    data: VersionMetadata[],
  ): Record<string, string[]> {
    return data.reduce<Record<string, string[]>>((acc, item) => {
      if (!acc[item.metadataKey]) {
        acc[item.metadataKey] = [];
      }
      if (!acc[item.metadataKey].includes(item.value)) {
        acc[item.metadataKey].push(item.value);
      }
      return acc;
    }, {});
  }

  const handleChange = (index: number, item: { id: string; name: string }) => {
    splitVariantKey.reverse()[index] = item.id;
    onChange(splitVariantKey.reverse().join('-'));
  };

  useEffect(() => {
    (async () => {
      const flattenedMetadata = selectedProtocol?.versions?.flatMap(
        (v) => v.metadata,
      )!;
      // console.log('flattenedMetadata', flattenedMetadata);
      setGroupedMetadata(Object.entries(groupByMetadataKey(flattenedMetadata)));
    })();
  }, [variants, selectedProtocol]);

  const splitVariantKey = selectedVariant?.variantKey.split('-')!;

  return (
    <>
      {groupedMetadata?.map((metadata, index) => {
        const mappedItems = sort(
          metadata[1].map((item) => ({
            id: item,
            name: item,
          })),
          { field: 'name' },
        );
        return (
          <Fragment key={metadata[0]}>
            <FormLabel isCapitalized>
              {kebabToCapitalized(metadata[0])}
            </FormLabel>
            <PillPicker
              onChange={(item) => handleChange(index, item)}
              items={mappedItems}
              selectedItem={{
                id: splitVariantKey?.reverse()[index],
                name: splitVariantKey?.reverse()[index],
              }}
              name={metadata[0]}
            />
          </Fragment>
        );
      })}
    </>
  );
};
