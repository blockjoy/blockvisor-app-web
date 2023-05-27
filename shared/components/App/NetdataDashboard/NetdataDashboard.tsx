import { styles } from './NetdataDashboard.styles';

export const NetdataDashboard = () => {
  return (
    <iframe
      css={styles.iframe}
      width="100%"
      height="100%"
      src="/dashboards/node.html"
    />
  );
};
