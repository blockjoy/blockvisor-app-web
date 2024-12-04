import { NodeStatusViewType } from './NodeStatus';
import { styles } from './NodeStatusLoader.styles';

type Props = {
  current: number;
  total: number;
  view?: NodeStatusViewType;
};

export const NodeStatusLoader = ({ current, total, view }: Props) => {
  const percentageWithMinimum = current! > 0 ? (current! / total!) * 100 : 5;
  const percentage = current! > 0 ? ((current! / total!) * 100).toFixed(2) : 0;

  if (view === 'simple') return <>{`${percentage}%`}</>;

  return (
    <>
      <span
        css={styles.backgroundWrapper}
        style={{ width: `${percentageWithMinimum}%` }}
      >
        <span css={styles.background} />
      </span>
      <var css={styles.value}>{`${percentage}%`}</var>
    </>
  );
};
