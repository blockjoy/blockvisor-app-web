import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { Switch, SwitchLabel, DraggableList } from '@shared/components';
import { getUpdatedHeaders } from '@shared/index';
import {
  nodeSelectors,
  useNodeListLayout,
  NODE_LIST_LAYOUT_GROUPED_FIELDS,
} from '@modules/node';
import { layoutSelectors } from '@modules/layout';
import { styles } from './NodeColumns.styles';

export const NodeColumns = () => {
  const headers = useRecoilValue(nodeSelectors.nodeListHeaders);
  const tableColumnGroups = useRecoilValue(layoutSelectors.tableColumnGroups);

  const { updateColumns, updateColumnVisibility } = useNodeListLayout();

  const [visibleHeaders, hiddenHeaders] = useMemo(() => {
    const visible = [];
    const hidden = [];

    for (const header of headers) {
      if (header.isVisible) visible.push(header);
      else hidden.push({ ...header, id: header.key });
    }

    return [visible, hidden];
  }, [headers]);

  const handleOrder = (movingIndex?: number, targetIndex?: number) => {
    const updatedColumns = getUpdatedHeaders(
      headers,
      visibleHeaders,
      movingIndex ?? 0,
      targetIndex ?? 0,
    );

    updateColumns?.(updatedColumns);
  };

  const disabledFields = NODE_LIST_LAYOUT_GROUPED_FIELDS.reduce(
    (acc, field) => {
      const savedIsGrouped = tableColumnGroups[field.key];

      acc[field.key] = !(savedIsGrouped ?? field.isGrouped);

      field.dependencies?.forEach((dependency) => {
        acc[dependency] = savedIsGrouped ?? field.isGrouped;
      });

      return acc;
    },
    [],
  );

  const renderItem = (header: TableHeader) => {
    const isDisabled = disabledFields[header.key] ?? false;

    return (
      <SwitchLabel
        key={header.key}
        label={header.label}
        additionalStyles={[styles.switchLabel]}
        additionalLabelStyles={[styles.switchLabelContent]}
      >
        <Switch
          name={header.key}
          noBottomMargin
          checked={header.isVisible}
          disabled={header.alwaysVisible || isDisabled}
          onChange={() => updateColumnVisibility(header.key)}
          size="small"
        />
      </SwitchLabel>
    );
  };

  return (
    <>
      <span css={styles.title}>Shown</span>
      <DraggableList
        items={visibleHeaders}
        onChange={handleOrder}
        renderItem={renderItem}
      />
      {Boolean(hiddenHeaders.length) && (
        <>
          <span css={styles.title}>Hidden</span>
          <ul css={styles.list}>
            {hiddenHeaders.map((header) => {
              const isDisabled = disabledFields[header.key];

              return (
                <li
                  key={header.key}
                  css={styles.listItem(isDisabled)}
                  onClick={
                    !isDisabled
                      ? () => updateColumnVisibility(header.key)
                      : undefined
                  }
                >
                  {renderItem(header)}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
};
