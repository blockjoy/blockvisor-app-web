import { Alert, Skeleton } from '@shared/components';
import { styles } from './PageTitleLabel.styles';

type PageTitleLabelProps = {
  isLoading: boolean;
  isSuccess: boolean;
  label: string;
};

export const PageTitleLabel = ({
  isLoading,
  isSuccess,
  label,
}: PageTitleLabelProps) => {
  return (
    <div css={styles.wrapper}>
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
