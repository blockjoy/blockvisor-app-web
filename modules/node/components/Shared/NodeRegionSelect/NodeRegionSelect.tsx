import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Region } from '@modules/grpc/library/blockjoy/v1/host';
import { nodeAtoms, nodeLauncherAtoms } from '@modules/node';
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
  const regions = useRecoilValue(nodeAtoms.regions);
  const regionsLoadingState = useRecoilValue(nodeAtoms.regionsLoadingState);
  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  const handleOpen = (open: boolean = true) => setIsOpen(open);

  useEffect(() => {
    const activeRegion = regions?.[0] ?? null;
    onLoad(activeRegion);
  }, [regions]);

  const error = !version?.id || !regions.length ? 'No Hosts Available' : null;

  return (
    <Dropdown
      items={regions}
      handleSelected={onChange}
      selectedItem={region}
      isLoading={regionsLoadingState !== 'finished'}
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
