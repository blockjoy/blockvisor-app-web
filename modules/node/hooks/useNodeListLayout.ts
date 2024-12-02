import { useRecoilValue } from 'recoil';
import { getOrderedColumns } from '@shared/components';
import { updateTableColumns } from '@shared/index';
import { nodeSelectors } from '@modules/node';
import { useSettings } from '@modules/settings';

export const useNodeListLayout = () => {
  const tableColumns = useRecoilValue(nodeSelectors.tableColumns);
  const nodeListHeaders = useRecoilValue(nodeSelectors.nodeListHeaders);

  const { updateSettings } = useSettings();

  const updateColumns = (columns: TableColumn[]) => {
    updateTableColumns(
      tableColumns,
      columns,
      (updatedColumns: TableColumn[]) => {
        updateSettings('nodes', {
          columns: updatedColumns,
        });
      },
    );
  };

  const updateColumnVisibility = (key?: string) => {
    if (!key) return;

    const header = nodeListHeaders.find((header) => header.key === key);

    updateColumns([
      {
        key,
        isVisible: !header?.isVisible,
      },
    ]);
  };

  const updatePosition = (key?: string, direction?: 'left' | 'right') => {
    if (!key || !direction) return;

    const filteredHeaders =
      nodeListHeaders?.filter((header) => header.isVisible ?? true) ?? [];

    const movingIndex = filteredHeaders.findIndex(
      (header) => header.key === key,
    );

    const targetIndex =
      direction === 'left' ? movingIndex - 1 : movingIndex + 1;

    const updatedColumns = [...(filteredHeaders ?? [])];
    const [movedColumn] = updatedColumns.splice(movingIndex, 1);

    updatedColumns.splice(targetIndex, 0, movedColumn);

    const sortedColumns = getOrderedColumns(filteredHeaders, updatedColumns);

    updateColumns?.(sortedColumns);
  };

  return {
    updateColumns,

    updateColumnVisibility,
    updatePosition,
  };
};
