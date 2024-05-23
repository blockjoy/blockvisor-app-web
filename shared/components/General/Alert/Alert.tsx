import { SerializedStyles } from '@emotion/react';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './Alert.styles';

type Props = {
  isSuccess?: boolean;
  isRounded?: boolean;
  maxWidth?: string;
  noBottomMargin?: boolean;
  additionalStyles?: SerializedStyles[];
} & React.PropsWithChildren;

export const Alert = ({
  isSuccess,
  isRounded,
  children,
  maxWidth = '100%',
  noBottomMargin,
  additionalStyles,
}: Props) => (
  <div
    className="alert"
    css={[
      styles.alert,
      isSuccess ? styles.alertSuccess : styles.alertDanger,
      isRounded && styles.alertRounded,
      noBottomMargin && spacing.bottom.none,
      additionalStyles && additionalStyles,
    ]}
    style={{ maxWidth }}
  >
    {children}
  </div>
);
