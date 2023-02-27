import {
  ReactNode,
  useRef,
  useState,
  isValidElement,
  cloneElement,
  ReactElement,
} from 'react';
import { styles } from './ButtonWithDropdown.styles';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { Dropdown } from '../Dropdown/Dropdown';

type Props = {
  children?: ReactNode;
  button: ReactNode;
};

export function ButtonWithDropdown({ children, button }: Props) {
  const [isOpen, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => setOpen(!isOpen);
  const handleClickOutside = () => setOpen(false);
  useClickOutside<HTMLDivElement>(dropdownRef, handleClickOutside);

  return (
    <div ref={dropdownRef} css={[styles.base]}>
      {isValidElement<HTMLButtonElement>(button) &&
        cloneElement(button as ReactElement, { onClick: handleClick })}
      <Dropdown isOpen={isOpen} additionalStyles={styles.dropdown}>
        {children}
      </Dropdown>
    </div>
  );
}
