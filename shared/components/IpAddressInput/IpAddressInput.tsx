import { styles } from './IpAddressInput.styles';
import { FC, useState, useRef, forwardRef } from 'react';

type Props = {
  onChange: (newValue: string) => void;
  label: string;
};

type InputProps = {
  ip: string;
  handleChange: (e: any) => void;
};

type Ref = HTMLInputElement;

const Input = forwardRef<Ref, InputProps>(({ ip, handleChange }, ref) => (
  <input
    ref={ref}
    size={ip?.length === 0 ? 1 : ip?.length}
    style={{ width: 'auto' }}
    css={styles.input}
    type="tel"
    placeholder="0"
    onChange={handleChange}
    maxLength={3}
  />
));

export const IpAddressInput: FC<Props> = ({ onChange, label }) => {
  const [ipFirst, setIpFirst] = useState('');
  const [ipSecond, setIpSecond] = useState('');
  const [ipThird, setIpThird] = useState('');
  const [ipFourth, setIpFourth] = useState('');

  const inputSecondRef = useRef<Ref>(null);
  const inputThirdRef = useRef<Ref>(null);
  const inputFourthRef = useRef<Ref>(null);

  const handleAllChanged = (newValue: string) => {
    onChange(newValue);
  };

  const handleFirstChanged = (e: any) => {
    const newValue = e.target.value;
    setIpFirst(newValue);
    handleAllChanged(`${newValue}.${ipSecond}.${ipThird}.${ipFourth}`);
    if (inputSecondRef?.current && newValue.length === 3) {
      inputSecondRef?.current?.focus();
    }
  };

  const handleSecondChanged = (e: any) => {
    const newValue = e.target.value;
    setIpSecond(newValue);
    handleAllChanged(`${ipFirst}.${newValue}.${ipThird}.${ipFourth}`);
    if (inputThirdRef?.current && newValue.length === 3) {
      inputThirdRef?.current?.focus();
    }
  };

  const handleThirdChanged = (e: any) => {
    const newValue = e.target.value;
    setIpThird(newValue);
    handleAllChanged(`${ipFirst}.${ipSecond}.${newValue}.${ipFourth}`);
    if (inputFourthRef?.current && newValue.length === 3) {
      inputFourthRef?.current?.focus();
    }
  };

  const handleFourthChanged = (e: any) => {
    const newValue = e.target.value;
    setIpFourth(newValue);
    handleAllChanged(`${ipFirst}.${ipSecond}.${ipThird}.${newValue}`);
  };

  return (
    <>
      <label css={styles.label}>{label}</label>
      <div css={styles.wrapper}>
        <div css={styles.inputWrapper}>
          <Input ip={ipFirst} handleChange={handleFirstChanged} />
          <span css={styles.dot}>.</span>
        </div>
        <div css={styles.inputWrapper}>
          <Input
            ref={inputSecondRef}
            ip={ipSecond}
            handleChange={handleSecondChanged}
          />
          <span css={styles.dot}>.</span>
        </div>
        <div css={styles.inputWrapper}>
          <Input
            ref={inputThirdRef}
            ip={ipThird}
            handleChange={handleThirdChanged}
          />
          <span css={styles.dot}>.</span>
        </div>
        <Input
          ref={inputFourthRef}
          ip={ipFourth}
          handleChange={handleFourthChanged}
        />
      </div>
    </>
  );
};
