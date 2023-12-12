import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { NodeType } from '@modules/grpc/library/blockjoy/common/v1/node';
import { Region } from '@modules/grpc/library/blockjoy/v1/host';
import { useDefaultOrganization } from '@modules/organization';
import { nodeLauncherAtoms, useGetRegions } from '@modules/node';
import { Dropdown } from '@shared/components';

type NodeRegionSelectProps = {
  onChange: (region: Region | null) => void;
  onLoad: (firstRegion: Region | null) => void;
  blockchainId: string;
  nodeType: NodeType;
};

export const NodeRegionSelect = ({
  onChange,
  onLoad,
  blockchainId,
  nodeType,
}: NodeRegionSelectProps) => {
  const { defaultOrganization } = useDefaultOrganization();
  const { regions, isLoading, error, getRegions } = useGetRegions();

  const version = useRecoilValue(nodeLauncherAtoms.selectedVersion);
  const region = useRecoilValue(nodeLauncherAtoms.selectedRegion);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (open: boolean = true) => setIsOpen(open);

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
