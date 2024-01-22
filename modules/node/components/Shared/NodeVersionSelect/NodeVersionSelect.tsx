import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { BlockchainVersion } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { Dropdown } from '@shared/components';
import { nodeLauncherAtoms } from '@modules/node';

type NodeVersionSelectProps = {
  versions: BlockchainVersion[];
  onVersionChanged: (version: BlockchainVersion | null) => void;
};

export const NodeVersionSelect = ({
  versions,
  onVersionChanged,
}: NodeVersionSelectProps) => {
  const selectedVersion = useRecoilValue(nodeLauncherAtoms.selectedVersion);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (open: boolean = true) => setIsOpen(open);

  return (
    <Dropdown
      items={versions}
      itemKey="version"
      isOpen={isOpen}
      handleOpen={handleOpen}
      handleSelected={onVersionChanged}
      selectedItem={selectedVersion}
    />
  );
};
