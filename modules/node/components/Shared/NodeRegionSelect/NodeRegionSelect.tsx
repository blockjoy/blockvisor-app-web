import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Region } from '@modules/grpc/library/blockjoy/v1/host';
import { organizationAtoms } from '@modules/organization';
import { nodeAtoms, nodeLauncherAtoms } from '@modules/node';
import { Dropdown } from '@shared/components';

type NodeRegionSelectProps = {
  onChange: (region: Region | null) => void;
  onLoad: (firstRegion: Region | null) => void;
};

export const NodeRegionSelect = ({
  onChange,
  onLoad,
}: NodeRegionSelectProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );
  const nodeLauncher = useRecoilValue(nodeLauncherAtoms.nodeLauncher);
  const version = useRecoilValue(nodeLauncherAtoms.selectedVersion);
  const region = useRecoilValue(nodeLauncherAtoms.selectedRegion);
  const { blockchainId, nodeType } = nodeLauncher;
  const regionsByBlockchain = useRecoilValue(
    nodeAtoms.regionsByBlockchain({
      blockchainId,
      version: version?.version,
      nodeType,
    }),
  );
  const allRegionsLoadingState = useRecoilValue(
    nodeAtoms.allRegionsLoadingState,
  );

  const handleOpen = (open: boolean = true) => setIsOpen(open);

  useEffect(() => {
    if (!version?.id) setError('Version List Empty');
    else if (!regionsByBlockchain.length) setError('Regions List Empty');
    else setError(null);
  }, [version?.id, defaultOrganization?.id]);

  useEffect(() => {
    const activeRegion = regionsByBlockchain?.[0] ?? null;
    onLoad(activeRegion);
  }, [regionsByBlockchain]);

  return (
    <Dropdown
      items={regionsByBlockchain}
      handleSelected={onChange}
      selectedItem={region}
      isLoading={allRegionsLoadingState !== 'finished'}
      disabled={!!error}
      {...(error && { error })}
      isOpen={isOpen}
      handleOpen={handleOpen}
    />
  );
};
