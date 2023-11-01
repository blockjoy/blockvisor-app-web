import { FC, ReactNode } from 'react';
import { styles } from './Alert.styles';
import { spacing } from 'styles/utils.spacing.styles';

type Props = {
  isSuccess?: boolean;
  isRounded?: boolean;
  children: ReactNode;
  maxWidth?: string;
  noBottomMargin?: boolean;
};

export const Alert: FC<Props> = ({
  isSuccess,
  isRounded,
  children,
  maxWidth = '100%',
  noBottomMargin,
}) => (
  <div
    css={[
      styles.alert,
      isSuccess ? styles.alertSuccess : styles.alertDanger,
      isRounded && styles.alertRounded,
      noBottomMargin && spacing.bottom.none,
    ]}
    style={{ maxWidth }}
  >
    {children}
  </div>
);
