import { FC } from 'react';
import { styles } from './NodeViewCharts.styles';

type Props = {
  nodeId: string;
};

export const NodeViewCharts: FC<Props> = ({ nodeId }) => {
  return (
    <iframe
      css={styles.iframe}
      width="100%"
      height="150px"
      src={`/dashboards/node.html?node_id=${nodeId}`}
    />
  );
};
