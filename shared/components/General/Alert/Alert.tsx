import { ReactNode } from 'react';
import { styles } from './Alert.styles';

type AlertProps = {
  isSuccess?: boolean;
  isRounded?: boolean;
  children: ReactNode;
  width?: string;
  noBottomMargin?: boolean;
};

export const Alert = ({
  isSuccess,
  isRounded,
  children,
  width = '100%',
  noBottomMargin,
}: AlertProps) => (
  <div
    css={[
      styles.alert,
      isSuccess ? styles.alertSuccess : styles.alertDanger,
      isRounded && styles.alertRounded,
      noBottomMargin && styles.noBottomMargin,
    ]}
    style={{ maxWidth: width }}
  >
    {children}
  </div>
);
