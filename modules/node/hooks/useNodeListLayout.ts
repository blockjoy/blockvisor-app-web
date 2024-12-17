import { useRecoilValue } from 'recoil';
import { updateTableColumns, getUpdatedHeaders } from '@shared/index';
import { nodeSelectors } from '@modules/node';
import { useSettings } from '@modules/settings';
import { layoutSelectors } from '@modules/layout';

export const useNodeListLayout = () => {
  const tableColumns = useRecoilValue(layoutSelectors.tableColumns);
  const nodeListHeaders = useRecoilValue(nodeSelectors.nodeListHeaders);

  const { updateSettings } = useSettings();

  const updateColumns = (columns: TableColumn[]) => {
    updateTableColumns(
      tableColumns,
      columns,
      (updatedColumns: TableColumn[]) => {
        updateSettings('layout', {
          'nodes.table.columns': updatedColumns,
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

  const updatePosition = (key?: string, direction?: TableHeaderMoveAction) => {
    if (!key || !direction) return;

    const filteredHeaders =
      nodeListHeaders?.filter((header) => header.isVisible ?? true) ?? [];

    const movingIndex = filteredHeaders.findIndex(
      (header) => header.key === key,
    );

    let targetIndex = movingIndex;
    switch (direction) {
      case 'start':
        targetIndex = 0;
        break;
      case 'left':
        targetIndex = movingIndex - 1;
        break;
      case 'right':
        targetIndex = movingIndex + 1;
        break;
      case 'end':
        targetIndex = filteredHeaders.length - 1;
        break;
      default:
        break;
    }

    const updatedColumns = getUpdatedHeaders(
      nodeListHeaders,
      filteredHeaders,
      movingIndex,
      targetIndex,
    );

    updateColumns?.(updatedColumns);
  };

  return {
    updateColumns,

    updateColumnVisibility,
    updatePosition,
  };
};
