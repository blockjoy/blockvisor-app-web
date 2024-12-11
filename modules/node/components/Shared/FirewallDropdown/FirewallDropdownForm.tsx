import {
  FirewallAction,
  FirewallRule,
  IpName,
} from '@modules/grpc/library/blockjoy/common/v1/config';
import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { styles } from './FirewallDropdownForm.styles';

type Props = {
  isOpen: boolean;
  activeTabIndex: number;
  fullIpList: IpName[];
  onRuleAdded: (params: FirewallRule) => void;
};

type FirewallRuleSimple = {
  ip: string;
  comment: string;
};

export const FirewallDropdownForm = ({
  isOpen,
  activeTabIndex,
  fullIpList,
  onRuleAdded,
}: Props) => {
  const ipRef = useRef<HTMLInputElement>(null);

  const [isValidIp, setIsValidIp] = useState(true);

  const [ipAlreadyAdded, setIpAlreadyAdded] = useState(false);

  const [rule, setRule] = useState<FirewallRuleSimple>({
    ip: '',
    comment: '',
  });

  const isFormValid = isValidIp && rule.ip && !ipAlreadyAdded;

  const handleInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'ip') {
      const pattern =
        /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))?$/gm;

      const result = pattern.test(e.target.value);
      setIsValidIp(e.target.value === '' || result);
      setIpAlreadyAdded(fullIpList.some((item) => item.ip === e.target.value));
    }

    setRule({
      ...rule,
      [e.target.name]: e.target.value,
    });
  };

  const handleRuleAdded = (rule: FirewallRuleSimple) => {
    console.log('onRuleAdded', rule);

    // onRuleAdded({
    //   action: FirewallAction.
    // })
  };

  const handleSubmit = (e?: KeyboardEvent<HTMLInputElement>) => {
    if ((!e || e?.key === 'Enter') && isFormValid) {
      if (ipAlreadyAdded) setIpAlreadyAdded(false);
      handleRuleAdded(rule);
      setRule({
        ip: '',
        comment: '',
      });
      ipRef?.current?.focus();
    }
  };

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (isOpen) ipRef?.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen]);

  useLayoutEffect(() => {
    ipRef?.current?.focus();
  }, [activeTabIndex]);

  return (
    <>
      <form css={styles.wrapper}>
        <input
          style={{ width: '35%' }}
          ref={ipRef}
          name="ip"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChanged(e)}
          onKeyUp={handleSubmit}
          placeholder="IP"
          value={rule.ip}
          {...(!isOpen && { tabIndex: -1 })}
        />
        <input
          style={{ width: '50%' }}
          name="description"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChanged(e)}
          onKeyUp={handleSubmit}
          placeholder="Comment"
          value={rule.comment}
          {...(!isOpen && { tabIndex: -1 })}
        />
        <button
          style={{ width: '15%', minWidth: '70px' }}
          disabled={!isFormValid}
          css={styles.submit}
          onClick={() => handleSubmit()}
          {...(!isOpen && { tabIndex: -1 })}
        >
          Add
        </button>
      </form>
      {!isValidIp && (
        <div css={styles.validation}>Please enter a valid CIDR IP</div>
      )}
      {ipAlreadyAdded && (
        <div css={styles.validation}>You've already added this IP</div>
      )}
    </>
  );
};
