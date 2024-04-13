import { useCallback, useState } from 'react';
import { Dropdown, SvgIcon } from '@shared/components';
import { capitalized } from '@modules/admin';
import { styles } from './ViewPicker.styles';
import IconTable from '@public/assets/icons/common/Table.svg';
import IconGrid from '@public/assets/icons/common/Grid.svg';

const VIEW_TYPES: ViewItem[] = [
  { id: 'table', name: 'table', icon: <IconTable /> },
  { id: 'grid', name: 'grid', icon: <IconGrid /> },
];

type ViewPickerProps = {
  type?: 'list' | 'dropdown';
  activeView?: View;
  handleActiveView?: (item: View) => void;
};

export const ViewPicker = ({
  type = 'list',
  activeView,
  handleActiveView,
}: ViewPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (open: boolean = true) => setIsOpen(open);

  const selectedView =
    VIEW_TYPES.find((view) => view.name === activeView) ?? null;

  const renderItem = useCallback((viewItem: ViewItem) => {
    return (
      <>
        <SvgIcon size="14px">{viewItem.icon}</SvgIcon>
        <span css={styles.itemLabel}>{capitalized(viewItem.name)}</span>
      </>
    );
  }, []);

  return type === 'dropdown' ? (
    <div css={styles.dropdownView}>
      <Dropdown
        items={VIEW_TYPES}
        selectedItem={selectedView}
        handleOpen={handleOpen}
        isOpen={isOpen}
        handleSelected={(view) => handleActiveView?.(view?.name ?? 'grid')}
        renderItem={renderItem}
        renderButtonText={<SvgIcon size="14px">{selectedView?.icon}</SvgIcon>}
        dropdownButtonStyles={[styles.dropdownButton]}
        dropdownMenuStyles={[styles.dropdownMenu]}
        hideDropdownIcon
        noBottomMargin
      />
    </div>
  ) : (
    <div css={[styles.listView]}>
      {VIEW_TYPES.map((view) => (
        <button
          key={view.name}
          onClick={() => handleActiveView?.(view.name!)}
          css={styles.iconButton}
          className={selectedView?.name === view.name ? 'active' : ''}
        >
          <SvgIcon size="14px">{view.icon}</SvgIcon>
        </button>
      ))}
    </div>
  );
};
