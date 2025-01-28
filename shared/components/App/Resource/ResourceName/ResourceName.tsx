import { useRecoilValue } from 'recoil';
import { Resource } from '@modules/grpc/library/blockjoy/common/v1/resource';
import { settingsSelectors } from '@modules/settings';

type Props = {
  resource?: Resource;
};

export const ResourceName = ({ resource }: Props) => {
  const resourceSerializedParam = JSON.stringify(resource);

  const resourceName = useRecoilValue(
    settingsSelectors.resourceName(resourceSerializedParam),
  );

  return <span>{resourceName ?? '-'}</span>;
};
