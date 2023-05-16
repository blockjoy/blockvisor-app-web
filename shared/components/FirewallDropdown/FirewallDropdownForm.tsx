import { ChangeEvent, FC, useLayoutEffect, useRef, useState } from 'react';
import { styles } from './FirewallDropdownForm.styles';

type Props = {
  isOpen: boolean;
  activeTabIndex: number;
  onRuleAdded: (params: FilteredIpAddr) => void;
};

export const FirewallDropdownForm: FC<Props> = ({
  isOpen,
  activeTabIndex,
  onRuleAdded,
}) => {
  const ipRef = useRef<HTMLInputElement>(null);

  const [state, setState] = useState<FilteredIpAddr>({
    ip: '',
    description: '',
  });

  const handleInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleKeyUp = (e: any) => {
    if (e.keyCode === 13) {
      onRuleAdded(state);
      setState({
        ip: '',
        description: '',
      });
      ipRef?.current?.focus();
    }
  };

  useLayoutEffect(() => {
    if (isOpen) {
      console.log('toggling is open');
      ipRef?.current?.focus();
    }
  }, [isOpen]);

  useLayoutEffect(() => {
    ipRef?.current?.focus();
  }, [activeTabIndex]);

  return (
    <div css={styles.wrapper}>
      <input
        ref={ipRef}
        name="ip"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChanged(e)}
        onKeyUp={handleKeyUp}
        placeholder="IP"
        value={state.ip}
      />
      <input
        name="description"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChanged(e)}
        onKeyUp={handleKeyUp}
        placeholder="Comment"
        value={state.description}
      />
      {/* <button onClick={() => onRuleAdded()}>Go</button> */}
    </div>
  );
};
