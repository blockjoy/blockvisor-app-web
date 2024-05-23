import { useState } from 'react';
import { css } from '@emotion/react';
import { SvgIcon, Dropdown } from '@shared/components';
import { styles } from './ActionsDropdown.styles';
import IconCog from '@public/assets/icons/common/Cog.svg';
import IconArrow from '@public/assets/icons/common/ChevronDown.svg';

export type ActionsDropdownItem = {
  name: string;
  icon: React.ReactNode;
  onClick: VoidFunction;
  hasBorderTop?: boolean;
};

type Props = {
  items: ActionsDropdownItem[];
  isLoading?: boolean;
};

export const ActionsDropdown = ({ items, isLoading = false }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderItem = (item: ActionsDropdownItem) => (
    <>
      <SvgIcon isDefaultColor size="12px">
        {item.icon}
      </SvgIcon>
      <p css={styles.dropdownText}>{item.name}</p>
    </>
  );

  const handleOpen = (open: boolean = true) => setIsOpen(open);
  const handleSelect = (item: ActionsDropdownItem | null) => item?.onClick();

  const dropdownItemStyles = (item: ActionsDropdownItem) => {
    const additionalStyles = [styles.dropdownItem];

    if (item.hasBorderTop) {
      additionalStyles.push(css`
        border-top: 1px solid rgb(255 255 255 / 20%);
      `);
    }

    return additionalStyles;
  };

  return (
    <div css={styles.wrapper}>
      <Dropdown
        items={items}
        handleOpen={handleOpen}
        handleSelected={handleSelect}
        isOpen={isOpen}
        selectedItem={null}
        noBottomMargin={true}
        renderItem={renderItem}
        renderButtonText={
          <>
            <SvgIcon
              {...(isLoading && {
                additionalStyles: [styles.cogIcon],
              })}
            >
              <IconCog />
            </SvgIcon>
            <p>Actions</p>
            <span css={[styles.icon, isOpen && styles.iconActive]}>
              <SvgIcon size="12px">
                <IconArrow />
              </SvgIcon>
            </span>
          </>
        }
        hideDropdownIcon={true}
        dropdownMenuStyles={[styles.dropdown]}
        dropdownButtonStyles={styles.dropdownButton}
        dropdownItemStyles={dropdownItemStyles}
        dropdownScrollbarStyles={[styles.scrollbar]}
      />
    </div>
  );
};
