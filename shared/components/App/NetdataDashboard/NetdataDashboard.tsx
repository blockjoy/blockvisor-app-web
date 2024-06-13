import { useEffect, useState } from 'react';
import { styles } from './NetdataDashboard.styles';

type Props = {
  id: string;
  name: string;
  is_node?: string;
};

const iframeDimensions = {
  width: '100%',
  height: '460px',
};

export const NetdataDashboard = ({ id, name, is_node = '' }: Props) => {
  const [state, setState] = useState({
    url: '',
  });

  const { url } = state;
  const { width, height } = iframeDimensions;

  useEffect(() => {
    if (!url) {
      setState({
        ...state,
        url: `/dashboards/node.html?id=${id}&name=${name}&is_node=${is_node}`,
        ...iframeDimensions,
      });
    }
  }, [id]);

  return url ? (
    <iframe css={styles.iframe} width={width} height={height} src={url} />
  ) : null;
};
