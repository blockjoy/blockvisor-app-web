import { FC, ReactNode } from 'react';
import { styles } from './Alert.styles';

type Props = {
  isSuccess?: boolean;
  children: ReactNode;
  width?: string;
};

export const Alert: FC<Props> = ({ isSuccess, children, width = '100%' }) => (
  <div
    css={[styles.alert, isSuccess ? styles.alertSuccess : styles.alertDanger]}
    style={{ width }}
  >
    {children}
  </div>
);
