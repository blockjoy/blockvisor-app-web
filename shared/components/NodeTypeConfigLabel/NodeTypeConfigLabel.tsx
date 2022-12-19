import { nodeTypeConfigLabels } from '@shared/constants/lookups';
import { FC, PropsWithChildren } from 'react';

export const NodeTypeConfigLabel: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {nodeTypeConfigLabels?.find((config) => config.name === children)
        ?.value || 'Config Property'}
    </>
  );
};
