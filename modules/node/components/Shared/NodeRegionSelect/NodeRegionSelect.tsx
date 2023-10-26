import { useEffect, useState } from 'react';
import { Select } from '@shared/components';
import { NodeType } from '@modules/grpc/library/blockjoy/v1/node';
import { hostClient } from '@modules/grpc/clients/hostClient';
import { colors } from 'styles/utils.colors.styles';
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
  const [serverError, setServerError] = useState('');
  const [regions, setRegions] = useState<Region[]>([]);
  const { defaultOrganization } = useDefaultOrganization();

  useEffect(() => {
    if (version?.id) {
      setServerError('');
      (async () => {
        try {
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
        }
      })();
    } else {
      setRegions([]);
    }
  }, [version?.id]);

  return (
    <Select
      disabled={!!serverError}
      buttonText={
        serverError ? (
          <div css={[colors.warning]}>{serverError}</div>
        ) : (
          <p>{region?.name}</p>
        )
      }
      items={regions?.map((r) => ({
        name: r?.name || '',
        onClick: () => onChange(r),
      }))}
    />
  );
};
