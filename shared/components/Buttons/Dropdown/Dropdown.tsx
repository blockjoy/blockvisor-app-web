import { ReactNode, useRef } from 'react';
import { styles } from './Dropdown.styles';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { DropdownItem, DropdownWrapper, Scrollbar } from '@shared/components';
import { DropdownButton } from './DropdownButton/DropdownButton';
import { DropdownMenu } from './DropdownMenu/DropdownMenu';
import { colors } from 'styles/utils.colors.styles';
import { useAccessibleDropdown } from '@shared/index';

export type DropdownProps<T = any> = {
  items: T[];
  selectedItem: T | null;
  handleSelected: (item: T | null) => void;
  defaultText?: string;
  searchQuery?: string;
  renderSearch?: (isOpen: boolean) => ReactNode;
  isEmpty?: boolean;
  noBottomMargin?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  error?: string;
  isOpen: boolean;
  handleOpen: (open?: boolean) => void;
};

export const Dropdown = <T extends { id?: string; name?: string }>({
  items,
  selectedItem,
  handleSelected,
  defaultText,
  searchQuery,
  renderSearch,
  isEmpty = true,
  noBottomMargin = false,
  isLoading,
  disabled,
  error,
  isOpen,
  handleOpen,
}: DropdownProps<T>) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClose = () => handleOpen(false);

  useClickOutside<HTMLDivElement>(dropdownRef, handleClose);

  const handleSelect = (item: T) => {
    handleSelected(item);
    handleClose();
  };

  const { activeIndex, handleItemRef, handleFocus, handleBlur } =
    useAccessibleDropdown({
      items,
      selectedItem,
      handleSelect,
      isOpen,
      handleOpen,
      searchQuery,
    });

  return (
    <DropdownWrapper
      isEmpty={isEmpty}
      isOpen={isOpen}
      onClose={handleClose}
      {...(noBottomMargin && { noBottomMargin })}
    >
      <DropdownButton
        isOpen={isOpen}
        isLoading={isLoading}
        text={
          isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <div css={[colors.warning]}>{error}</div>
          ) : (
            <p>{escapeHtml(selectedItem?.name || defaultText || 'Select')}</p>
          )
        }
        {...(disabled && { disabled })}
        onClick={() => handleOpen(!isOpen)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <DropdownMenu isOpen={isOpen} additionalStyles={styles.dropdown}>
        {renderSearch ? renderSearch(isOpen) : null}
        <Scrollbar additionalStyles={[styles.dropdownInner]}>
          <ul>
            {items?.map((item: T, index: number) => (
              <li
                key={item.id || item.name}
                ref={(el: HTMLLIElement) => handleItemRef(el, index)}
                css={[
                  selectedItem?.id === item.id ? styles.active : null,
                  activeIndex === index ? styles.focus : null,
                ]}
              >
                <DropdownItem
                  size="medium"
                  type="button"
                  onButtonClick={() => handleSelect(item)}
                  tabIndex={-1}
                >
                  <p>{escapeHtml(item.name!)}</p>
                </DropdownItem>
              </li>
            ))}
          </ul>
        </Scrollbar>
      </DropdownMenu>
    </DropdownWrapper>
  );
};
