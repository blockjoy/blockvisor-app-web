import { DropdownMenu, DropdownItem, SvgIcon } from '@shared/components';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { ReactNode, useRef, useState } from 'react';
import { styles } from './ActionsDropdown.styles';
import IconCog from '@public/assets/icons/common/Cog.svg';
import IconArrow from '@public/assets/icons/common/ChevronDown.svg';
import { css } from '@emotion/react';

type Item = {
  title: string;
  icon: ReactNode;
  method: VoidFunction;
  hasBorderTop?: boolean;
};

type Props = {
  items: Item[];
};

export const ActionsDropdown = ({ items }: Props) => {
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
    <div css={styles.wrapper} ref={dropdownRef}>
      <button css={styles.dropdownButton} onClick={handleClick}>
        <SvgIcon>
          <IconCog />
        </SvgIcon>
        <p>Actions</p>
        <span css={[styles.icon, isOpen && styles.iconActive]}>
          <SvgIcon size="12px">
            <IconArrow />
          </SvgIcon>
        </span>
      </button>
      <DropdownMenu isOpen={isOpen} additionalStyles={styles.dropdown}>
        <ul>
          {items.map((item) => {
            const additionalStyles = [
              css`
                padding-left: 18px;
                padding-right: 20px;
                gap: 12px;
              `,
            ];

            if (item.hasBorderTop) {
              additionalStyles.push(css`
                border-top: 1px solid rgb(255 255 255 / 20%);
              `);
            }

            return (
              <li key={item.title}>
                <DropdownItem
                  onButtonClick={() => handleDropdownItemClicked(item.method)}
                  size="medium"
                  type="button"
                  additionalStyles={additionalStyles}
                >
                  <SvgIcon isDefaultColor size="12px">
                    {item.icon}
                  </SvgIcon>
                  <p css={styles.dropdownText}>{item.title}</p>
                </DropdownItem>
              </li>
            );
          })}
        </ul>
      </DropdownMenu>
    </div>
  );
};
