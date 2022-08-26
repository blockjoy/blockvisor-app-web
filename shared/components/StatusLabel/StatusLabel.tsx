import { FC, PropsWithChildren } from 'react';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './StatusLabel.styles';

export const StatusLabel: FC<PropsWithChildren> = ({ children }) => {
  return <div css={[typo.small, styles.base]}>{children}</div>;
};
