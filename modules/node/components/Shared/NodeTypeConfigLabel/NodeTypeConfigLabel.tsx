import { nodeTypeConfigLabels } from '@shared/constants/lookups';
import { FC, PropsWithChildren } from 'react';

export const NodeTypeConfigLabel: FC<PropsWithChildren> = ({ children }) => {
  const configInfo = nodeTypeConfigLabels?.find(
    (config) => config.name === children,
  );

  return <>{configInfo?.value || children}</>;
};
