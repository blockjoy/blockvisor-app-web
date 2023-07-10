import { FC, ReactNode } from 'react';
import { styles } from './Alert.styles';

type Props = {
  isSuccess?: boolean;
  isRounded?: boolean;
  children: ReactNode;
  width?: string;
  noBottomMargin?: boolean;
};

export const Alert: FC<Props> = ({
  isSuccess,
  isRounded,
  children,
  width = '100%',
  noBottomMargin,
}) => (
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
