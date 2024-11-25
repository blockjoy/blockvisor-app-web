import { useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { Dropdown, SvgIcon } from '@shared/components';
import { styles } from './Sorting.styles';
import IconSort from '@public/assets/icons/common/Sort.svg';

export type SortingItem<T> = {
  id: string;
  name: string;
  field: T;
  order: SortOrder;
};

type SortingProps<T> = {
  items: SortingItem<T>[];
  selectedItem: SortingItem<T>;
  handleSelect: (item: SortingItem<T> | null) => void;
  disabled?: boolean;
  size?: SortingSize;
};

export const Sorting = <T extends {}>({
  items,
  selectedItem,
  handleSelect,
  disabled = false,
  size = 'large',
}: SortingProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (open: boolean = true) => setIsOpen(open);

  return (
    <div css={styles.wrapper}>
      <Dropdown
        items={items}
        isOpen={isOpen}
        handleOpen={handleOpen}
        handleSelected={handleSelect}
        selectedItem={selectedItem}
        disabled={disabled}
        noBottomMargin
        renderButtonText={
          <>
            <SvgIcon size="14px">
              <IconSort />
            </SvgIcon>
            <p css={styles.buttonText}>{selectedItem.name}</p>
          </>
        }
        dropdownButtonStyles={[styles.dropdownButton(size)]}
        hideDropdownIcon={isMobile || isTablet}
        dropdownMenuStyles={[styles.dropdownMenu]}
      />
    </div>
  );
};
