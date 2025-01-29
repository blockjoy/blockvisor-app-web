import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { RegionInfo } from '@modules/grpc/library/blockjoy/v1/host';
import { nodeAtoms, nodeLauncherAtoms } from '@modules/node';
import { Dropdown } from '@shared/components';
import { authSelectors } from '@modules/auth';

type NodeRegionSelectProps = {
  onChange: (regionInfo: RegionInfo) => void;
  onLoad: (firstRegion: RegionInfo | null) => void;
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

  const handleSelected = useRecoilCallback(
    ({ snapshot }) =>
      async (item: { id?: string; name?: string }) => {
        const regionsRecoilState = await snapshot.getPromise(nodeAtoms.regions);
        onChange(
          regionsRecoilState?.find(
            (regionInfo) => regionInfo.region?.regionId === item.id,
          )!,
        );
      },
    [regions],
  );

  useEffect(() => {
    const activeRegion = regions?.[0] ?? null;
    onLoad(activeRegion);
  }, [regions]);

  const mappedRegions = regions.map((regionInfo) => ({
    ...regionInfo,
    id: regionInfo.region?.regionId,
    name: regionInfo.region?.displayName,
  }));

  const selectedRegion = selectedRegions?.map((nodeLauncherRegion) => ({
    id: nodeLauncherRegion?.regionInfo?.region?.regionId,
    name: nodeLauncherRegion?.regionInfo?.region?.displayName,
  }))[0]!;

  const error = !version || !regions.length ? 'No Hosts Available' : null;

  return (
    <Dropdown
      idKey="regionId"
      items={mappedRegions}
      handleSelected={handleSelected}
      selectedItem={selectedRegion}
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
