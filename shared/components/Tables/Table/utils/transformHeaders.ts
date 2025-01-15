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
    .map((header, index) => {
      const currentHeader = columnSettings.get(header.key);

      return {
        ...header,
        width: currentHeader?.width || header.width,
        isVisible: currentHeader?.isVisible ?? header.isVisible,
        order: currentHeader?.order || index,
      };
    })
    .sort((a, b) => {
      const orderA = a.order || 0;
      const orderB = b.order || 0;

      return orderA - orderB;
    });

  return headers;
};
