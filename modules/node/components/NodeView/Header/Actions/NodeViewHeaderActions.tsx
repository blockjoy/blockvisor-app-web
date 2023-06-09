import { DropdownMenu, DropdownItem, SvgIcon } from '@shared/components';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { useRef, useState } from 'react';
import { styles } from './NodeViewHeaderActions.styles';
import { useNodeView } from '@modules/node';
import IconCog from '@public/assets/icons/common/Cog.svg';
import IconArrow from '@public/assets/icons/common/ArrowRight.svg';
import IconDelete from '@public/assets/icons/common/Trash.svg';
import IconStop from '@public/assets/icons/app/NodeStop.svg';
import IconStart from '@public/assets/icons/app/NodeStart.svg';

type Props = {
  onDeleteClicked: VoidFunction;
};

export const NodeViewHeaderActions = ({ onDeleteClicked }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { node, stopNode, startNode } = useNodeView();

  const handleClick = () => setIsOpen(!isOpen);
  const handleClickOutside = () => setIsOpen(false);

  useClickOutside<HTMLDivElement>(dropdownRef, handleClickOutside);

  const handleStop = () => {
    setIsOpen(false);
    stopNode(node?.id);
  };
  const handleStart = () => {
    setIsOpen(false);
    startNode(node?.id);
  };

  const handleDeleteClicked = () => {
    setIsOpen(false);
    onDeleteClicked();
  };

  return (
    <div css={styles.wrapper} ref={dropdownRef}>
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
          <li>
            <DropdownItem
              onButtonClick={handleStop}
              size="medium"
              type="button"
            >
              <SvgIcon size="12px">
                <IconStop />
              </SvgIcon>
              <p css={styles.dropdownText}>Stop</p>
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onButtonClick={handleStart}
              size="medium"
              type="button"
            >
              <SvgIcon size="12px">
                <IconStart />
              </SvgIcon>
              <p css={styles.dropdownText}>Start</p>
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onButtonClick={handleDeleteClicked}
              size="medium"
              type="button"
            >
              <SvgIcon size="12px">
                <IconDelete />
              </SvgIcon>
              <p css={styles.dropdownText}>Delete</p>
            </DropdownItem>
          </li>
        </ul>
      </DropdownMenu>
    </div>
  );
};
