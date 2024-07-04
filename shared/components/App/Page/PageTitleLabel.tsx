import { SerializedStyles } from '@emotion/react';
import { Alert, Skeleton } from '@shared/components';
import { styles } from './PageTitleLabel.styles';

type PageTitleLabelProps = {
  isLoading: boolean;
  isSuccess: boolean;
  label: string;
  additionalStyles?: SerializedStyles[];
};

export const PageTitleLabel = ({
  isLoading,
  isSuccess,
  label,
  additionalStyles,
}: PageTitleLabelProps) => {
  return (
    <div css={[styles.wrapper, additionalStyles && additionalStyles]}>
      {isLoading ? (
        <Skeleton width="50px" height="30px" />
      ) : (
        <Alert
          isSuccess={isSuccess}
          noBottomMargin
          isRounded
          additionalStyles={[styles.title]}
        >
          {label}
        </Alert>
      )}
    </div>
  );
};
