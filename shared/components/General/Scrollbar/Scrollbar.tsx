import { SerializedStyles } from '@emotion/react';
import { styles } from './Scrollbar.styles';

type Props = {
  additionalStyles?: SerializedStyles[];
} & React.PropsWithChildren;

export const Scrollbar = ({ children, additionalStyles }: Props) => (
  <div css={[styles.wrapper, additionalStyles ? [additionalStyles] : null]}>
    {children}
  </div>
);
