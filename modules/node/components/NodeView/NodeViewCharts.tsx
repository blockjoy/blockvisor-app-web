import { FC, PropsWithChildren, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { styles } from './NodeViewCharts.styles';

let iframe;

const Iframe: FC<PropsWithChildren> = ({ children }) => {
  const containerEl = useRef(null);

  useEffect(() => {}, []);

  return (
    <iframe title="iframe" ref={(el) => (iframe = el)}>
      {ReactDOM.createPortal(children, document.body)}
    </iframe>
  );
};

type Props = {
  nodeId: string;
};

export const NodeViewCharts: FC<Props> = ({ nodeId }) => {
  return (
    <iframe
      css={styles.iframe}
      width="100%"
      height="150px"
      src={`http://127.0.0.1:5555/index.html?node_id=${nodeId}`}
    />
  );
};
