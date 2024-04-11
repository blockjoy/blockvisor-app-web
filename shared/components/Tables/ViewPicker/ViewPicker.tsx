import { useState } from 'react';
import { styles } from './ViewPicker.styles';
import IconTable from '@public/assets/icons/common/Table.svg';
import IconGrid from '@public/assets/icons/common/Grid.svg';
import { Dropdown, SvgIcon } from '@shared/components';

const VIEW_TYPES: ViewItem[] = [
  { name: 'table', icon: <IconTable /> },
  { name: 'grid', icon: <IconGrid /> },
];

type ViewPickerProps = {
  type?: 'list' | 'dropdown';
  activeView?: View;
  handleActiveView?: (view: View) => void;
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

  return type === 'dropdown' ? (
    <div css={styles.dropdownView}>
      <Dropdown
        items={VIEW_TYPES}
        selectedItem={selectedView}
        handleOpen={handleOpen}
        isOpen={isOpen}
        handleSelected={(view) => handleActiveView?.(view?.name ?? 'table')}
        renderItem={(view) => <SvgIcon size="14px">{view.icon}</SvgIcon>}
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
