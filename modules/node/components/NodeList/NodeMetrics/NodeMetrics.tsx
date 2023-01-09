import { nodeAtoms } from '@modules/node/store/nodeAtoms';
import { useRecoilValue } from 'recoil';
import { styles } from './NodeMetrics.styles';

export const NodeMetrics = () => {
  // TODO: re-add back api call here (atm moved to useNodeList becase we don't have total nodes amount returned)
  const metrics = useRecoilValue(nodeAtoms.nodeMetrics);
  const offline = metrics && metrics.length > 0 ? metrics.find((metric: NodeMetrics) => metric.name === 4)['value'] : null;

  return offline && (
    <div css={styles.wrapper}>
      <span
        css={[styles.badge, offline > 0 ? styles.badgeBad : styles.badgeGood]}
      />
      <span>{offline} Offline</span>
    </div>
  );
};
