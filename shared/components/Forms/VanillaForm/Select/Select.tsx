import { ReactNode, useState } from 'react';
import {
  DropdownMenu,
  DropdownButton,
  DropdownItem,
  Scrollbar,
  DropdownWrapper,
  DropdownCreate,
} from '@shared/components';
import { styles } from './Select.styles';

type MenuItem = {
  name: string;
  element?: ReactNode;
  onClick: VoidFunction;
};

type Props = {
  disabled?: boolean;
  items: MenuItem[];
  buttonText: string | ReactNode;
  newItem?: {
    title: string;
    onClick: VoidFunction;
  };
};

export const Select = ({ disabled, items, buttonText, newItem }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => setIsOpen(!isOpen);

  const handleMenuItemClicked = (onClick: VoidFunction) => {
    setIsOpen(false);
    onClick();
  };

  return (
    <DropdownWrapper
      isEmpty={true}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <DropdownButton
        disabled={disabled}
        text={buttonText}
        onClick={handleClick}
        isOpen={isOpen}
      />
      <DropdownMenu isOpen={isOpen} additionalStyles={styles.dropdown}>
        <Scrollbar additionalStyles={[styles.dropdownInner]}>
          <ul>
            {items?.map((item) => (
              <li key={item.name}>
                <DropdownItem
                  size="medium"
                  type="button"
                  onButtonClick={() => handleMenuItemClicked(item.onClick)}
                >
                  {item.element ? (
                    item.element
                  ) : (
                    <p css={styles.menuItemText}>{item.name}</p>
                  )}
                </DropdownItem>
              </li>
            ))}
          </ul>
        </Scrollbar>
        {newItem && (
          <DropdownCreate title={newItem.title} handleClick={newItem.onClick} />
        )}
      </DropdownMenu>
    </DropdownWrapper>
  );
};
