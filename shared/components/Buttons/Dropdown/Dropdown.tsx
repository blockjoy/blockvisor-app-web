import { ReactNode, useRef } from 'react';
import { styles } from './Dropdown.styles';
import { useAccessibleDropdown } from '@shared/index';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { DropdownItem, DropdownWrapper, Scrollbar } from '@shared/components';
import { DropdownButton } from './DropdownButton/DropdownButton';
import { DropdownMenu } from './DropdownMenu/DropdownMenu';
import { colors } from 'styles/utils.colors.styles';

export type DropdownProps<T = any> = {
  items: T[];
  itemKey?: string;
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
  size?: 'small' | 'medium' | 'large';
  handleOpen: (open?: boolean) => void;
  checkDisabledItem?: (item?: T) => boolean;
  renderItemLabel?: (item?: T) => ReactNode;
};

export const Dropdown = <T extends { id?: string; name?: string }>({
  items,
  itemKey = 'name',
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
  size = 'medium',
  handleOpen,
  checkDisabledItem,
  renderItemLabel,
}: DropdownProps<T>) => {
  const dropdownRef = useRef<HTMLUListElement>(null);

  const handleClose = () => handleOpen(false);

  const handleSelect = (item: T) => {
    if (!item) return;
    const isDisabled = checkDisabledItem ? checkDisabledItem(item) : false;
    if (isDisabled) return;

    handleSelected(item);
    handleClose();
  };

  const {
    activeIndex,
    handleItemRef,
    handleFocus,
    handleBlur,
    handleSelectAccessible,
  } = useAccessibleDropdown({
    items,
    selectedItem,
    handleSelect,
    isOpen,
    handleOpen,
    searchQuery,
    dropdownRef,
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
            <p>
              {selectedItem
                ? escapeHtml(selectedItem[itemKey]!)
                : defaultText || 'Select'}
            </p>
          )
        }
        {...(disabled && { disabled })}
        onClick={() => handleOpen(!isOpen)}
        {...(handleFocus && { onFocus: handleFocus })}
        {...(handleBlur && { onBlur: handleBlur })}
      />
      <DropdownMenu isOpen={isOpen} additionalStyles={styles.dropdown}>
        {renderSearch ? renderSearch(isOpen) : null}
        <Scrollbar additionalStyles={[styles.dropdownInner]}>
          <ul ref={dropdownRef}>
            {items?.map((item: T, index: number) => {
              const isDisabled: boolean = checkDisabledItem
                ? checkDisabledItem(item)
                : false;

              return (
                <li
                  key={item.id || item.name}
                  ref={(el: HTMLLIElement) => handleItemRef(el, index)}
                  css={[
                    selectedItem?.id === item.id ? styles.active : null,
                    activeIndex === index ? styles.focus : null,
                  ]}
                >
                  <DropdownItem
                    size={size}
                    type="button"
                    onButtonClick={() => handleSelectAccessible(item)}
                    tabIndex={-1}
                    isDisabled={isDisabled}
                    additionalStyles={[styles.dropdownItem]}
                  >
                    <p>{escapeHtml(item[itemKey])}</p>
                    {renderItemLabel && renderItemLabel(item)}
                  </DropdownItem>
                </li>
              );
            })}
          </ul>
        </Scrollbar>
      </DropdownMenu>
    </DropdownWrapper>
  );
};
