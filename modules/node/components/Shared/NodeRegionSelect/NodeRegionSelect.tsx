import { useEffect, useRef, useState } from 'react';
import { Select } from '@shared/components';
import { NodeType } from '@modules/grpc/library/blockjoy/v1/node';
import { hostClient } from '@modules/grpc/clients/hostClient';
import { colors } from 'styles/utils.colors.styles';
import { useDefaultOrganization } from '@modules/organization';

type Props = {
  onChange: (name: string, value: any) => void;
  onLoad: (firstRegion: string) => void;
  region: string;
  blockchainId: string;
  nodeType: NodeType;
  nodeTypeVersion: string;
};

export const NodeRegionSelect = ({
  onChange,
  onLoad,
  region,
  blockchainId,
  nodeType,
  nodeTypeVersion,
}: Props) => {
  const [serverError, setServerError] = useState('');
  const [regions, setRegions] = useState<string[]>([]);
  const { defaultOrganization } = useDefaultOrganization();
  const currentBlockchainId = useRef('');

  useEffect(() => {
    if (currentBlockchainId.current !== blockchainId || nodeTypeVersion) {
      currentBlockchainId.current = blockchainId;
      setServerError('');
      (async () => {
        try {
          const regions: string[] = await hostClient.getRegions(
            defaultOrganization?.id!,
            blockchainId,
            nodeType,
            nodeTypeVersion,
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
  }, [nodeTypeVersion]);

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
        onClick: () => onChange('region', r),
      }))}
    />
  );
};
