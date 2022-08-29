import { FC, PropsWithChildren } from 'react';
import { reset } from 'styles/utils.reset.styles';
import { styles } from './StepList.styles';

export const StepLabel: FC<PropsWithChildren> = ({ children }) => {
  return <ul css={[reset.list, styles.base]}>{children}</ul>;
};
