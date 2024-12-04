import { useRecoilValue } from 'recoil';
import { nodeSelectors } from '@modules/node/store/nodeSelectors';
import { List, Switch, SwitchLabel } from '@shared/components';
import {
  NodeListGroupLayoutItem,
  useNodeListLayout,
  NODE_LIST_LAYOUT_GROUPED_FIELDS,
} from '@modules/node';
import { styles } from './NodeLayout.styles';

export const NodeLayout = () => {
  const tableLayout = useRecoilValue(nodeSelectors.tableLayout);

  const { updateColumns } = useNodeListLayout();

  const handleNodeinfoGrouping = (item: NodeListGroupLayoutItem) => {
    const isGrouped = tableLayout[item.key];

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

  const renderItem = (item: NodeListGroupLayoutItem) => {
    const isGrouped = tableLayout[item.key];

    return (
      <SwitchLabel
        label={item.label}
        additionalStyles={[styles.switchLabel]}
        additionalLabelStyles={[styles.switchLabelContent]}
      >
        <Switch
          name={item.name}
          noBottomMargin
          checked={isGrouped}
          disabled={false}
          onChange={() => handleNodeinfoGrouping(item)}
          size="small"
        />
      </SwitchLabel>
    );
  };

  const items = NODE_LIST_LAYOUT_GROUPED_FIELDS.map((field) => ({
    ...field,
    id: field.key,
  }));

  return (
    <>
      <span css={styles.title}>Table Layout</span>
      <List
        items={items}
        handleClick={handleNodeinfoGrouping}
        renderItem={renderItem}
        additionalyStyles={styles.list}
      />
    </>
  );
};
