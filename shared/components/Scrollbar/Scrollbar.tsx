import { SerializedStyles } from '@emotion/react';
import { FC, ReactNode } from 'react';
import { styles } from './Scrollbar.styles';

type Props = {
  children: ReactNode;
  additionalStyles?: SerializedStyles[];
};

export const Scrollbar: FC<Props> = ({ children, additionalStyles }) => (
  <div css={[styles.wrapper, additionalStyles ? [additionalStyles] : null]}>
    {children}
  </div>
);
