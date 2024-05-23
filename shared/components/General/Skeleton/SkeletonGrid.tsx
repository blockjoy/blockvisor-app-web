import { styles } from './Skeleton.styles';

type Props = { padding?: string } & React.PropsWithChildren;

export const SkeletonGrid = ({ children, padding = '' }: Props) => (
  <div css={styles.skeletonGrid(padding)}>{children}</div>
);
