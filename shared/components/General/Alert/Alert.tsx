import { FC, ReactNode } from 'react';
import { styles } from './Alert.styles';

type Props = {
  isSuccess?: boolean;
  isRounded?: boolean;
  children: ReactNode;
  maxWidth?: string;
};

export const Alert: FC<Props> = ({
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
    ]}
    style={{ maxWidth }}
  >
    {children}
  </div>
);
