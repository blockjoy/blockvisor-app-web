import { FC, ReactNode } from 'react';
import { styles } from './Alert.styles';

type Props = {
  isSuccess?: boolean;
  children: ReactNode;
};

export const Alert: FC<Props> = ({ isSuccess, children }) => (
  <div
    css={[styles.alert, isSuccess ? styles.alertSuccess : styles.alertDanger]}
  >
    {children}
  </div>
);
