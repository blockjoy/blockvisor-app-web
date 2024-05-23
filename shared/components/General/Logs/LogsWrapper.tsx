import { styles } from './LogsWrapper.styles';

export const LogsWrapper = ({ children }: React.PropsWithChildren) => (
  <div css={styles.wrapper}>{children}</div>
);
