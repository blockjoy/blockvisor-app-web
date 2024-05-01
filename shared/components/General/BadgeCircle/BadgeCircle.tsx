import { SerializedStyles } from '@emotion/react';
import { PropsWithChildren } from 'react';
import { styles } from './BadgeCircle.styles';

type Props = {
  additionalStyles?: SerializedStyles;
} & PropsWithChildren;

export const BadgeCircle = ({ children, additionalStyles }: Props) => (
  <span css={[styles.badge, additionalStyles]}>{children}</span>
);
