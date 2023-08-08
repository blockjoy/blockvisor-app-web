import { useEffect, useState } from 'react';
import { styles } from './NetdataDashboard.styles';

type Props = {
  id: string;
};

const iframeDimensions = {
  width: '100%',
  height: '640px',
};

export const NetdataDashboard = ({ id }: Props) => {
  const [state, setState] = useState({
    url: '',
  });

  const { url } = state;
  const { width, height } = iframeDimensions;

  useEffect(() => {
    if (!url) {
      setState({
        ...state,
        url: `/dashboards/node.html?id=${id}`,
        ...iframeDimensions,
      });
    }
  }, [id]);

  return url ? (
    <iframe css={styles.iframe} width={width} height={height} src={url} />
  ) : null;
};
