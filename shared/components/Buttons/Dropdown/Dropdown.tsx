import { ReactNode, useRef } from 'react';
import { styles } from './Dropdown.styles';
import { useAccessibleDropdown } from '@shared/index';
import { escapeHtml } from '@shared/utils/escapeHtml';
import {
  DropdownItem,
  DropdownWrapper,
  DropdownButton,
  DropdownMenu,
  DropdownCreate,
  Scrollbar,
} from '@shared/components';
import { colors } from 'styles/utils.colors.styles';

export type DropdownProps<T = any> = {
  items: T[];
  itemKey?: string;
  selectedItem: T | null;
  handleSelected: (item: T | null) => void;
  defaultText?: string | ReactNode;
  searchQuery?: string;
  isTouchedQuery?: boolean;
  renderSearch?: (isOpen: boolean) => ReactNode;
  isEmpty?: boolean;
  noBottomMargin?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  error?: string;
  isOpen: boolean;
  size?: 'small' | 'medium' | 'large';
  buttonType?: 'input' | 'default';
  handleOpen: (open?: boolean) => void;
  checkDisabledItem?: (item?: T) => boolean;
  renderItem?: (item: T) => ReactNode;
  renderItemLabel?: (item?: T) => ReactNode;
  newItem?: {
    title: string;
    onClick: VoidFunction;
  };
};

export const Dropdown = <T extends { id?: string; name?: string }>({
  items,
  itemKey = 'name',
  selectedItem,
  handleSelected,
  defaultText,
  searchQuery,
  isTouchedQuery,
  renderSearch,
  isEmpty = true,
  noBottomMargin = false,
  isLoading,
  disabled,
  error,
  isOpen,
  size = 'medium',
  buttonType = 'default',
  handleOpen,
  checkDisabledItem,
  renderItem,
  renderItemLabel,
  newItem,
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
    isTouchedQuery,
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
        type={buttonType}
        text={
          isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <div css={[colors.warning]}>{error}</div>
          ) : (
            <p>
              {selectedItem
                ? renderItem
                  ? renderItem(selectedItem)
                  : escapeHtml(selectedItem[itemKey]!)
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
                    isAccessible
                    additionalStyles={[styles.dropdownItem]}
                  >
                    {renderItem ? (
                      renderItem(item)
                    ) : (
                      <>
                        <p>{escapeHtml(item[itemKey])}</p>
                        {renderItemLabel && renderItemLabel(item)}
                      </>
                    )}
                  </DropdownItem>
                </li>
              );
            })}
          </ul>
        </Scrollbar>
        {newItem && (
          <DropdownCreate title={newItem.title} handleClick={newItem.onClick} />
        )}
      </DropdownMenu>
    </DropdownWrapper>
  );
};
