export const openGraphanaUrl = (
  key: string,
  folder: 'nodes' | 'node-logs' = 'nodes',
) =>
  window.open(
    `https://blockjoy.grafana.net/d/${folder}/linux-node-overview?var-instance=${key}`,
  );
