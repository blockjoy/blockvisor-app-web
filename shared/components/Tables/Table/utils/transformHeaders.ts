import { NodeListItem } from '@modules/node';

export const transformHeaders = (
  currentHeaders: NodeListItem[],
  columns: TableColumn[],
) => {
  const columnSettings = new Map<string, Omit<TableColumn, 'key'>>();

  columns?.forEach((column) => {
    const { key, ...rest } = column;
    columnSettings.set(key!, { ...rest });
  });

  const headers = currentHeaders
    .map((header) => ({
      ...header,
      width: columnSettings.get(header.key)?.width || header.width,
      isVisible: columnSettings.get(header.key)?.isVisible ?? header.isVisible,
    }))
    .sort((a, b) => {
      const orderA = columnSettings.get(a.key)?.order || 0;
      const orderB = columnSettings.get(b.key)?.order || 0;

      return orderA - orderB;
    });

  return headers;
};
