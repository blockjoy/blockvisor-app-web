import { styles } from './RadioButtonGroup.styles';

export const RadioButtonGroup = ({ children }: React.PropsWithChildren) => (
  <div css={styles.wrapper}>{children}</div>
);
