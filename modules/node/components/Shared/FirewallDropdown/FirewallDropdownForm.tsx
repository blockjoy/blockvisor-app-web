import { ChangeEvent, FC, useLayoutEffect, useRef, useState } from 'react';
import { styles } from './FirewallDropdownForm.styles';

type Props = {
  isOpen: boolean;
  activeTabIndex: number;
  fullIpList: FilteredIpAddr[];
  onRuleAdded: (params: FilteredIpAddr) => void;
};

export const FirewallDropdownForm: FC<Props> = ({
  isOpen,
  activeTabIndex,
  fullIpList,
  onRuleAdded,
}) => {
  const ipRef = useRef<HTMLInputElement>(null);

  const [isValidIp, setIsValidIp] = useState(true);

  const [ipAlreadyAdded, setIpAlreadyAdded] = useState(false);

  const [state, setState] = useState<FilteredIpAddr>({
    ip: '',
    description: '',
  });

  const handleInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'ip') {
      const pattern =
        /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))?$/gm;

      const result = pattern.test(e.target.value);
      setIsValidIp(e.target.value === '' || result);
      setIpAlreadyAdded(fullIpList.some((item) => item.ip === e.target.value));
    }

    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleKeyUp = (e: any) => {
    if (e.keyCode === 13 && isValidIp && state.ip && !ipAlreadyAdded) {
      if (ipAlreadyAdded) setIpAlreadyAdded(false);
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
    <>
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
      {!isValidIp && (
        <div css={styles.validation}>Please enter a valid CIDR IP</div>
      )}
      {ipAlreadyAdded && (
        <div css={styles.validation}>You've already added this IP</div>
      )}
    </>
  );
};
