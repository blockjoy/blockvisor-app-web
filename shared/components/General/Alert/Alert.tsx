import { ReactNode } from 'react';
import { styles } from './Alert.styles';

type AlertProps = {
  isSuccess?: boolean;
  isRounded?: boolean;
  children: ReactNode;
  maxWidth?: string;
};

export const Alert = ({
  isSuccess,
  isRounded,
  children,
  maxWidth = '100%',
}) => (
  <div
    css={[
      styles.alert,
      isSuccess ? styles.alertSuccess : styles.alertDanger,
      isRounded && styles.alertRounded,
      noBottomMargin && styles.noBottomMargin,
    ]}
    style={{ maxWidth }}
  >
    {children}
  </div>
);
