import { FC } from 'react';
import { styles } from './NodeViewCharts.styles';

type Props = {
  nodeId?: string;
};

export const NodeViewCharts: FC<Props> = () => {
  return (
    <iframe
      css={styles.iframe}
      width="100%"
      height="400px"
      src={`/dashboards/node.html?node_id=${''}`}
    />
  );
};
