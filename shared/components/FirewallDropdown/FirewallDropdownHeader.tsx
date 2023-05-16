import { Dispatch, FC, SetStateAction } from 'react';
import { SvgIcon } from '../SvgIcon/SvgIcon';
import { styles } from './FirewallDropdownHeader.styles';
import IconClose from '@public/assets/icons/close.svg';
import { Button } from '@shared/components';

type Props = {
  activeTabIndex: number;
  setActiveTabIndex: Dispatch<SetStateAction<number>>;
};

const tabs = ['Allow', 'Deny'];

export const FirewallDropdownHeader: FC<Props> = ({
  activeTabIndex,
  setActiveTabIndex,
}) => {
  return (
    <header css={styles.tabs}>
      {tabs?.map((tab, index) => (
        <button
          key={tab}
          onClick={() => setActiveTabIndex(index)}
          css={[
            styles.tabButton,
            index === activeTabIndex && styles.tabButtonActive,
          ]}
        >
          {tab}
        </button>
      ))}

      <div
        css={styles.tabsUnderline}
        style={{
          translate: activeTabIndex > 0 ? `${activeTabIndex * 60 + 5}px` : 0,
        }}
      ></div>
    </header>
  );
};
