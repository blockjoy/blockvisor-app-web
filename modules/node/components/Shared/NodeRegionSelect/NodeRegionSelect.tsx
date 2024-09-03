import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Region } from '@modules/grpc/library/blockjoy/v1/host';
import { nodeAtoms, nodeLauncherAtoms, nodeSelectors } from '@modules/node';
import { Dropdown } from '@shared/components';
import { authSelectors } from '@modules/auth';

type NodeRegionSelectProps = {
  onChange: (region: Region | null) => void;
  onLoad: (firstRegion: Region | null) => void;
};

export const NodeRegionSelect = ({
  onChange,
  onLoad,
}: NodeRegionSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const version = useRecoilValue(nodeLauncherAtoms.selectedVersion);
  const region = useRecoilValue(nodeLauncherAtoms.selectedRegion);
  const regionsByBlockchain = useRecoilValue(nodeSelectors.regionsByBlockchain);
  const allRegionsLoadingState = useRecoilValue(
    nodeAtoms.allRegionsLoadingState,
  );
  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  const handleOpen = (open: boolean = true) => setIsOpen(open);

  useEffect(() => {
    const activeRegion = regionsByBlockchain?.[0] ?? null;
    onLoad(activeRegion);
  }, [regionsByBlockchain]);

  const error = !version?.id
    ? 'Version List Empty'
    : !regionsByBlockchain.length
    ? 'Regions List Empty'
    : null;

  return (
    <Dropdown
      items={regionsByBlockchain}
      handleSelected={onChange}
      selectedItem={region}
      isLoading={allRegionsLoadingState !== 'finished'}
      disabled={!!error}
      {...(!region
        ? isSuperUser
          ? error && { error }
          : { defaultText: <p>Auto select</p> }
        : null)}
      isOpen={isOpen}
      handleOpen={handleOpen}
    />
  );
};
