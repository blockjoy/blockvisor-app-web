import { ReactNode, useState } from 'react';
import {
  DropdownMenu,
  DropdownButton,
  DropdownItem,
  Scrollbar,
  DropdownWrapper,
} from '@shared/components';
import { styles } from './Select.styles';

type MenuItem = {
  name: string;
  onClick: VoidFunction;
};

type Props = {
  disabled?: boolean;
  items: MenuItem[];
  buttonText: string | ReactNode;
  noBottomMargin?: boolean;
};

export const Select = ({
  disabled,
  items,
  buttonText,
  noBottomMargin = false,
}: Props) => {
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
      noBottomMargin={noBottomMargin}
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
                  <p css={styles.menuItemText}>{item.name}</p>
                </DropdownItem>
              </li>
            ))}
          </ul>
        </Scrollbar>
      </DropdownMenu>
    </DropdownWrapper>
  );
};
