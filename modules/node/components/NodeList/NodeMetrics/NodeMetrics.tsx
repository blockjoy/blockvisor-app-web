import { nodeAtoms } from '@modules/node/store/nodeAtoms';
import { Skeleton } from '@shared/index';
import { useRecoilValue } from 'recoil';
import { styles } from './NodeMetrics.styles';

export const NodeMetrics = () => {
  // TODO: re-add back api call here (atm moved to useNodeList becase we don't have total nodes amount returned)
  const metrics = useRecoilValue(nodeAtoms.nodeMetrics);
  const offline =
    metrics && metrics.length > 0
      ? metrics.find((metric: NodeMetrics) => metric.name === 4)['value']
      : null;

  const totalNodes = useRecoilValue(nodeAtoms.totalNodes);

  const isLoading = useRecoilValue(nodeAtoms.isLoading);

  return isLoading !== 'finished' || offline === null ? (
    <Skeleton />
  ) : (
    <div css={styles.wrapper}>
      <span
        css={[
          styles.badge,
          offline > 0 || totalNodes === 0 ? styles.badgeBad : styles.badgeGood,
        ]}
      />
      <span>{offline > 0 ? `${offline} Offline` : `${totalNodes} Online`}</span>
    </div>
  );
};
