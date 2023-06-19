import { useEffect, useState } from 'react';
import { styles } from './NetdataDashboard.styles';
import { EmptyColumn } from '@shared/components';

type Props = {
  nodeId: string;
  isSidePanel?: boolean;
};

export const NetdataDashboard = ({ nodeId, isSidePanel }: Props) => {
  const [state, setState] = useState({
    url: '',
    width: '100%',
    height: '100%',
    isLoading: true,
  });

  const { url, width, height, isLoading } = state;

  useEffect(() => {
    if (!url) {
      let sidePanelIframeDimenisions;

      if (isSidePanel) {
        sidePanelIframeDimenisions = {
          width: '100%',
          height: '380px',
        };
      }

      setState({
        ...state,
        url: `/dashboards/node.html?node_id=${nodeId}${
          isSidePanel ? '&is_side_panel=true' : ''
        }`,
        ...sidePanelIframeDimenisions,
      });
    }
  }, [nodeId]);

  return url ? (
    <iframe css={styles.iframe} width={width} height={height} src={url} />
  ) : null;
};
