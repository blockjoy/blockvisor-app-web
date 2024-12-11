import { useState } from 'react';
import { styles } from './NodeFirewallRuleConfigDropdown.styles';
import {
  DropdownItem,
  DropdownMenu,
  DropdownWrapper,
  Scrollbar,
  SvgIcon,
} from '@shared/components';
import { ConfigDropdownItem } from '../NodeFirewallRuleConfig';
import IconArrowDown from '@public/assets/icons/common/ChevronDown.svg';

type ConfigDropdownProps = {
  name: string;
  selectedItem: ConfigDropdownItem;
  items: ConfigDropdownItem[];
  onConfigChanged: (name: string, value: number) => void;
};

export const NodeFirewallRuleConfigDropdown = ({
  name,
  selectedItem,
  items,
  onConfigChanged,
}: ConfigDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownItemClicked = (item: ConfigDropdownItem) => {
    onConfigChanged(name, item.value);
    setIsOpen(false);
  };

  return (
    <DropdownWrapper
      noBottomMargin
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        css={styles.dropdownButton}
        type="button"
      >
        {selectedItem.name}
        <SvgIcon size="10px" isDefaultColor>
          <IconArrowDown />
        </SvgIcon>
      </button>
      <DropdownMenu additionalStyles={styles.menu} isOpen={isOpen}>
        <Scrollbar additionalStyles={[styles.scrollbar]}>
          {items.map((item) => (
            <DropdownItem
              isDisabled={item.name === selectedItem.name}
              key={item.name}
              onButtonClick={() => handleDropdownItemClicked(item)}
              type="button"
              size="medium"
            >
              <div>{item.name}</div>
            </DropdownItem>
          ))}
        </Scrollbar>
      </DropdownMenu>
    </DropdownWrapper>
  );
};
