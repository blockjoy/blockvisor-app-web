import { useEffect, useRef, useState } from 'react';
import { styles } from './DetailsTableTabs.styles';

type Props = {
  tabs: DetailsTableTab[];
  showTabHeader?: boolean;
};

export const DetailsTableTabs = ({ tabs, showTabHeader = true }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const [isTransitionEnabled, setIsTransitionEnabled] = useState(false);

  const [listHeight, setListHeight] = useState(0);

  const tabContentRefs = useRef(new Array());

  const handleChange = (nextIndex: number) => setActiveIndex(nextIndex);

  const inputId = (inputIndex: number) => `detailsTableTab${inputIndex}`;

  useEffect(() => {
    const newListHeight = tabContentRefs.current[activeIndex]?.clientHeight;

    setListHeight(newListHeight!);

    if (activeIndex === 0 && !isTransitionEnabled) {
      setIsTransitionEnabled(true);
    }
  }, [activeIndex, tabContentRefs]);

  return (
    <div css={styles.wrapper}>
      {showTabHeader && (
        <ul css={styles.tabHeader}>
          {tabs.map((tab, index) => (
            <li key={tab.name}>
              <input
                onChange={() => handleChange(index)}
                checked={index === activeIndex}
                autoComplete="off"
                type="radio"
                id={inputId(index)}
                name="listType"
              />
              <label htmlFor={inputId(index)}>{tab.name}</label>
            </li>
          ))}
        </ul>
      )}
      <div
        css={styles.tabContent}
        style={{
          height: isTransitionEnabled ? `${listHeight}px` : undefined,
          transition: isTransitionEnabled ? '0.4s ease' : '',
        }}
      >
        {tabs.map((tab, index) => (
          <div
            key={tab.name}
            ref={(element) => (tabContentRefs.current[index] = element)}
            css={[
              styles.tabContentItem,
              index === activeIndex && styles.tabContentItemVisible,
            ]}
            style={{
              position: isTransitionEnabled ? 'absolute' : 'static',
            }}
          >
            {tab.items}
          </div>
        ))}
      </div>
    </div>
  );
};
