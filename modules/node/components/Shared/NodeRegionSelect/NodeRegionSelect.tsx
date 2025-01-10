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
  const selectedRegions = useRecoilValue(nodeLauncherAtoms.selectedRegions);
  const regions = useRecoilValue(nodeAtoms.regions);
  const regionsLoadingState = useRecoilValue(nodeAtoms.regionsLoadingState);
  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  const handleOpen = (open: boolean = true) => setIsOpen(open);

  useEffect(() => {
    if (regions?.length) {
      const activeRegion = regions?.[0] ?? null;
      onLoad(activeRegion);
    }
  }, [regions]);

  const error = !version || !regions.length ? 'No Hosts Available' : null;

  return (
    <Dropdown
      idKey="regionId"
      items={regions}
      handleSelected={onChange}
      selectedItem={selectedRegions?.[0].region!}
      isLoading={regionsLoadingState !== 'finished'}
      disabled={!!error}
      {...(!selectedRegions?.[0]
        ? isSuperUser
          ? error && { error }
          : { defaultText: <>Auto select</> }
        : null)}
      isOpen={isOpen}
      handleOpen={handleOpen}
    />
  );
};
