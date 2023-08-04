import { DropdownMenu, DropdownItem, SvgIcon } from '@shared/components';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { ReactNode, useRef, useState } from 'react';
import { styles } from './ActionsDropdown.styles';
import IconCog from '@public/assets/icons/common/Cog.svg';
import IconArrow from '@public/assets/icons/common/ArrowRight.svg';
import { flex } from 'styles/utils.flex.styles';

type Item = {
  title: string;
  icon: ReactNode;
  method: VoidFunction;
};

type Props = {
  items: Item[];
  align?: 'left' | 'right';
};

export const ActionsDropdown = ({ items, align = 'left' }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => setIsOpen(!isOpen);
  const handleClickOutside = () => setIsOpen(false);

  const handleDropdownItemClicked = (method: VoidFunction) => {
    setIsOpen(false);
    method();
  };

  useClickOutside<HTMLDivElement>(dropdownRef, handleClickOutside);

  return (
    <div
      css={[styles.wrapper, align === 'right' && flex.justify.end]}
      ref={dropdownRef}
    >
      <button css={styles.dropdownButton} onClick={handleClick}>
        <SvgIcon>
          <IconCog />
        </SvgIcon>
        <p>Actions</p>
        <span css={[styles.icon, isOpen && styles.iconActive]}>
          <IconArrow />
        </span>
      </button>
      <DropdownMenu isOpen={isOpen} additionalStyles={styles.dropdown}>
        <ul>
          {items.map((item) => (
            <li key={item.title}>
              <DropdownItem
                onButtonClick={() => handleDropdownItemClicked(item.method)}
                size="medium"
                type="button"
              >
                <SvgIcon isDefaultColor size="12px">
                  {item.icon}
                </SvgIcon>
                <p css={styles.dropdownText}>{item.title}</p>
              </DropdownItem>
            </li>
          ))}
        </ul>
      </DropdownMenu>
    </div>
  );
};
