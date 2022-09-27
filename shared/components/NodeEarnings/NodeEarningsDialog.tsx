import { styles } from './NodeEarningsDialog.styles';

export const NodeEarningsDialog = () => {
  return (
    <div css={[styles.dialog]}>
      <div css={[styles.message]}>
        Earnings are currently in beta testing and will be available soon.
      </div>
    </div>
  );
};
