import { useEffect, useState } from 'react';
import { NodeType } from '@modules/grpc/library/blockjoy/common/v1/node';
import { Dropdown } from '@shared/components';
import { useDefaultOrganization } from '@modules/organization';
import { BlockchainVersion } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { Region } from '@modules/grpc/library/blockjoy/v1/host';
import { useGetRegions } from '@modules/node/hooks/useGetRegions';

type Props = {
  onChange: (region: Region | null) => void;
  onLoad: (firstRegion: Region | null) => void;
  region: Region | null;
  blockchainId: string;
  nodeType: NodeType;
  version: BlockchainVersion;
};

export const NodeRegionSelect = ({
  onChange,
  onLoad,
  region,
  blockchainId,
  nodeType,
  version,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { defaultOrganization } = useDefaultOrganization();

  const handleOpen = (open: boolean) => {
    setIsOpen(open);
  };

  const { regions, isLoading, error, getRegions } = useGetRegions();

  useEffect(() => {
    if (version?.id && defaultOrganization?.id) {
      (async () => {
        await getRegions(version, blockchainId, nodeType);
      })();
    }
  }, [version?.id, defaultOrganization?.id]);

  useEffect(() => {
    const activeRegion = regions.length ? regions[0] : null;
    onLoad(activeRegion);
  }, [regions]);

  return (
    <Dropdown
      items={regions}
      handleSelected={onChange}
      selectedItem={region}
      isLoading={isLoading}
      disabled={!!error}
      {...(error && { error })}
      isOpen={isOpen}
      handleOpen={handleOpen}
    />
  );
};
