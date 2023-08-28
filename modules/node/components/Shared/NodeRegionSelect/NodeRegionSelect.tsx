import { useEffect, useState } from 'react';
import { Select } from '@shared/components';
import { NodeType } from '@modules/grpc/library/blockjoy/v1/node';
import { hostClient } from '@modules/grpc/clients/hostClient';
import { colors } from 'styles/utils.colors.styles';
import { useDefaultOrganization } from '@modules/organization';
import { BlockchainVersion } from '@modules/grpc/library/blockjoy/v1/blockchain';

type Props = {
  onChange: (region: string) => void;
  onLoad: (firstRegion: string) => void;
  region: string;
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
  const [regions, setRegions] = useState<string[]>([]);
  const { defaultOrganization } = useDefaultOrganization();

  useEffect(() => {
    if (version.id) {
      setServerError('');
      (async () => {
        try {
          const regions: string[] = await hostClient.getRegions(
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
          onLoad('');
        }
      })();
    }
  }, [version.id]);

  return (
    <Select
      disabled={!!serverError}
      buttonText={
        serverError ? (
          <div css={[colors.warning]}>{serverError}</div>
        ) : (
          <p>{region}</p>
        )
      }
      items={regions?.map((r) => ({
        name: r,
        onClick: () => onChange(r),
      }))}
    />
  );
};
