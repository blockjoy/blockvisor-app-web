import { useState } from 'react';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { Dropdown, SvgIcon } from '@shared/components';
import { styles } from './Sorting.styles';
import IconSort from '@public/assets/icons/common/Sort.svg';
import { isMobile } from 'react-device-detect';

export type SortingItem = {
  id: string;
  name: string;
  field: any;
  order: SortOrder;
};

type SortingProps = {
  items: SortingItem[];
  selectedItem: SortingItem;
  handleSelect: (item: SortingItem | null) => void;
};

export const Sorting = ({
  items,
  selectedItem,
  handleSelect,
}: SortingProps) => {
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
        noBottomMargin
        renderButtonText={
          <>
            <SvgIcon size="14px">
              <IconSort />
            </SvgIcon>
            <p css={styles.buttonText}>{selectedItem.name}</p>
          </>
        }
        {...(isMobile
          ? {
              dropdownButtonStyles: [styles.dropdownButton],
            }
          : null)}
        hideDropdownIcon={isMobile}
        dropdownMenuStyles={[styles.dropdownMenu]}
      />
    </div>
  );
};
