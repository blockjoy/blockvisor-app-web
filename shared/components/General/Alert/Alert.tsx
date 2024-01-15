import { SerializedStyles } from '@emotion/react';
import { FC, ReactNode } from 'react';
import { styles } from './Alert.styles';

type Props = {
  isSuccess?: boolean;
  isRounded?: boolean;
  children: ReactNode;
  maxWidth?: string;
  additionalStyles?: SerializedStyles[];
};

export const Alert: FC<Props> = ({
  isSuccess,
  isRounded,
  children,
  maxWidth = '100%',
  additionalStyles,
}) => (
  <div
    className="alert"
    css={[
      styles.alert,
      isSuccess ? styles.alertSuccess : styles.alertDanger,
      isRounded && styles.alertRounded,
      additionalStyles && additionalStyles,
    ]}
    style={{ maxWidth }}
  >
    {children}
  </div>
);
