import { nodeTypeConfigLabels } from '@shared/constants/lookups';
import { PropsWithChildren } from 'react';

export const NodeTypeConfigLabel = ({ children }: PropsWithChildren) => {
  const configInfo = nodeTypeConfigLabels?.find(
    (config) => config.name === children,
  );

  return <>{configInfo?.value || children}</>;
};
