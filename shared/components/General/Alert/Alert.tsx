import { ReactNode } from 'react';
import { styles } from './Alert.styles';

type AlertProps = {
  isSuccess?: boolean;
  isRounded?: boolean;
  children: ReactNode;
  width?: string;
};

export const Alert = ({
  isSuccess,
  isRounded,
  children,
  width = '100%',
}: AlertProps) => (
  <div
    css={[
      styles.alert,
      isSuccess ? styles.alertSuccess : styles.alertDanger,
      isRounded && styles.alertRounded,
    ]}
    style={{ maxWidth: width }}
  >
    {children}
  </div>
);
