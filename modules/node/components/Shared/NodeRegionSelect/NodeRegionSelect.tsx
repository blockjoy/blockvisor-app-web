import { useEffect, useState } from 'react';
import { NodeType } from '@modules/grpc/library/blockjoy/common/v1/node';
import { Dropdown } from '@shared/components';
import { hostClient } from '@modules/grpc/clients/hostClient';
import { useDefaultOrganization } from '@modules/organization';
import { BlockchainVersion } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { Region } from '@modules/grpc/library/blockjoy/v1/host';

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
  const [serverError, setServerError] = useState('');
  const [regions, setRegions] = useState<Region[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { defaultOrganization } = useDefaultOrganization();

  const handleOpen = (open: boolean) => {
    setIsOpen(open);
  };

  useEffect(() => {
    if (version?.id) {
      setServerError('');
      (async () => {
        try {
          setIsLoading(true);
          const regions: Region[] = await hostClient.getRegions(
            defaultOrganization?.id!,
            blockchainId,
            nodeType,
            version.version,
          );
          setRegions(regions);

          if (!regions.length) {
            setServerError('Region List Empty');
            return;
          }
          onLoad(regions[0]);
        } catch (err) {
          console.log('getRegionsError', err);
          setServerError('Error Loading Regions');
          onLoad(null);
        } finally {
          setIsLoading(false);
        }
      })();
    } else {
      setRegions([]);
    }
  }, [version?.id]);

  return (
    <Dropdown
      items={regions}
      handleSelected={onChange}
      selectedItem={region}
      isLoading={isLoading}
      disabled={!!serverError}
      {...(serverError && { error: serverError })}
      isOpen={isOpen}
      handleOpen={handleOpen}
    />
  );
};
