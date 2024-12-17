import { useRecoilValue } from 'recoil';
import { Switch, SwitchLabel } from '@shared/components';
import { layoutSelectors } from '@modules/layout';
import {
  NodeListLayoutGroupItem,
  NODE_LIST_LAYOUT_GROUPED_FIELDS,
  useNodeListLayout,
} from '@modules/node';
import { styles } from './NodeGroups.styles';

export const NodeGroups = () => {
  const tableColumnGroups = useRecoilValue(layoutSelectors.tableColumnGroups);

  const { updateColumns } = useNodeListLayout();

  const handleGrouping = (item: NodeListLayoutGroupItem) => {
    const isGrouped = tableColumnGroups[item.key];

    const columnsToUpdate: TableColumn[] =
      item.dependencies?.map((dep) => ({
        key: dep,
        isVisible: isGrouped,
      })) ?? [];

    updateColumns?.([
      {
        key: item.key,
        isVisible: !isGrouped,
      },
      ...columnsToUpdate,
    ]);
  };

  return (
    <>
      {NODE_LIST_LAYOUT_GROUPED_FIELDS.map((item) => {
        const isGrouped = tableColumnGroups[item.key];

        return (
          <div key={item?.key} onClick={() => handleGrouping(item)}>
            <SwitchLabel
              label={item.label}
              additionalStyles={[styles.item]}
              additionalLabelStyles={[styles.label]}
            >
              <Switch
                name={item.name}
                noBottomMargin
                checked={isGrouped}
                disabled={false}
                onChange={() => handleGrouping(item)}
                size="small"
              />
            </SwitchLabel>
          </div>
        );
      })}
    </>
  );
};
