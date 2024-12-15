import React, { ReactNode, RefObject, useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import { SerializedStyles } from '@emotion/react';
import { ITheme } from 'types/theme';
import { useAccessibleDropdown } from '@shared/index';
import { escapeHtml } from '@shared/utils/escapeHtml';
import {
  DropdownItem,
  DropdownWrapper,
  DropdownButton,
  DropdownMenu,
  DropdownCreate,
  Scrollbar,
  Portal,
} from '@shared/components';
import { colors } from 'styles/utils.colors.styles';
import { styles } from './Dropdown.styles';

export type DropdownProps<T = any> = {
  items: T[];
  idKey?: string;
  itemKey?: string;
  selectedItem: T | null;
  handleSelected: (item: T) => void;
  defaultText?: string | ReactNode;
  searchQuery?: string;
  isTouchedQuery?: boolean;
  renderSearch?: (isOpen: boolean) => ReactNode;
  renderHeader?: ReactNode;
  renderButtonText?: ReactNode;
  dropdownButtonStyles?: ((theme: ITheme) => SerializedStyles)[];
  dropdownMenuStyles?: SerializedStyles[];
  dropdownMenuPosition?: SerializedStyles[];
  dropdownItemStyles?: (item: T) => SerializedStyles[];
  dropdownScrollbarStyles?: SerializedStyles[];
  hideDropdownIcon?: boolean;
  hideSearch?: boolean;
  excludeSelectedItem?: boolean;
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
  dropdownButtonRef?: RefObject<HTMLButtonElement>;
};

export const Dropdown = <T extends { id?: string; name?: string }>({
  items,
  idKey,
  itemKey = 'name',
  selectedItem,
  handleSelected,
  defaultText,
  searchQuery,
  isTouchedQuery,
  renderSearch,
  renderHeader,
  renderButtonText,
  dropdownButtonStyles,
  dropdownMenuStyles,
  dropdownMenuPosition,
  dropdownItemStyles,
  dropdownScrollbarStyles,
  hideDropdownIcon,
  hideSearch,
  excludeSelectedItem = false,
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
  dropdownButtonRef,
}: DropdownProps<T>) => {
  const dropdownRef = useRef<HTMLUListElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  const handleClose = () => handleOpen(false);

  const handleSelect = (item: T) => {
    if (!item) return;
    const isDisabled = checkDisabledItem ? checkDisabledItem(item) : false;
    if (isDisabled) return;

    handleSelected(item);
    handleClose();
  };

  let filteredItems = items.filter(
    (item) => !excludeSelectedItem || item.id !== selectedItem?.id,
  );

  const {
    activeIndex,
    setActiveIndex,
    handleItemRef,
    handleFocus,
    handleBlur,
    handleSelectAccessible,
  } = useAccessibleDropdown({
    items: filteredItems,
    selectedItem: !excludeSelectedItem ? selectedItem : null,
    handleSelect,
    isOpen,
    handleOpen,
    searchQuery,
    isTouchedQuery,
    dropdownRef,
  });

  const dropdownButtonRect =
    dropdownButtonRef?.current?.getBoundingClientRect();

  const dropdownStyles = [styles.dropdown];
  const scrollbarStyles = [styles.dropdownInner];

  if (dropdownMenuStyles) {
    dropdownStyles.push(...dropdownMenuStyles);
  }

  if (dropdownMenuPosition && dropdownButtonRect) {
    dropdownStyles.push(...dropdownMenuPosition);
  }

  if (dropdownScrollbarStyles) {
    scrollbarStyles.push(...dropdownScrollbarStyles);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (excludeSelectedItem) setActiveIndex(0);
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen, excludeSelectedItem]);

  const isPortal = Boolean(dropdownButtonRect && dropdownMenuPosition);

  const DropdownMenuElement = (
    <DropdownMenu
      isOpen={isOpen}
      additionalStyles={dropdownStyles}
      handleClose={handleClose}
      isInPortal={isPortal}
      dropdownMenuRef={dropdownMenuRef}
    >
      {Boolean(renderHeader) ? renderHeader : null}
      {!hideSearch && renderSearch ? renderSearch(isOpen) : null}
      <Scrollbar additionalStyles={scrollbarStyles}>
        <ul ref={dropdownRef}>
          {filteredItems?.map((item: T, index: number) => {
            const isDisabled = checkDisabledItem
              ? checkDisabledItem(item)
              : isEqual(item, selectedItem);

            return (
              <li
                key={item?.[idKey!] || item.id || item.name}
                ref={(el: HTMLLIElement) => handleItemRef(el, index)}
                css={[
                  selectedItem?.id === (item?.[idKey!] || item.id)
                    ? styles.active
                    : null,
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
                  {...(dropdownItemStyles && {
                    additionalStyles: dropdownItemStyles(item),
                  })}
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
  );

  const DropdownButtonElement = (
    <DropdownButton
      ref={dropdownButtonRef}
      isOpen={isOpen}
      isLoading={isLoading}
      type={buttonType}
      {...(dropdownButtonStyles
        ? { buttonStyles: dropdownButtonStyles }
        : null)}
      hideDropdownIcon={hideDropdownIcon}
      text={
        Boolean(renderButtonText) && !isLoading ? (
          renderButtonText
        ) : isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <div css={[colors.warning]}>{error}</div>
        ) : (
          <>
            {selectedItem ? (
              renderItem ? (
                renderItem(selectedItem)
              ) : (
                <p>{escapeHtml(selectedItem[itemKey]!)}</p>
              )
            ) : (
              <p css={styles.placeholder}>{defaultText || 'Select'}</p>
            )}
          </>
        )
      }
      {...(disabled && { disabled })}
      onClick={() => handleOpen(!isOpen)}
      {...(handleFocus && { onFocus: handleFocus })}
      {...(handleBlur && { onBlur: handleBlur })}
    />
  );

  return (
    <DropdownWrapper
      isEmpty={isEmpty}
      isOpen={isOpen}
      onClose={handleClose}
      {...(noBottomMargin && { noBottomMargin })}
      isInPortal={isPortal}
    >
      {DropdownButtonElement}
      {isPortal ? (
        <>
          {isOpen && (
            <Portal wrapperId={`dropdown-${itemKey}`} inContainer>
              {DropdownMenuElement}
            </Portal>
          )}
        </>
      ) : (
        <>{DropdownMenuElement}</>
      )}
    </DropdownWrapper>
  );
};
