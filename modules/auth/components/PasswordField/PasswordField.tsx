import { usePasswordStrength } from '@modules/auth/hooks/usePasswordStrength';
import { Input } from '@shared/components';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { display } from 'styles/utils.display.styles';
import { PasswordToggle, PasswordMeter } from '@modules/auth';
import { typo } from 'styles/utils.typography.styles';
import { useClickOutside } from '@shared/index';
import { styles } from './PasswordField.styles';
import { isMobile } from 'react-device-detect';

export enum PasswordFieldType {
  password = 'password',
  text = 'text',
}

export type PasswordFieldProps = {
  loading: boolean;
  tabIndex: number;
  label?: string;
  name: string;
  placeholder: string;
  isCompact?: boolean;
  isSubmitted?: boolean;
};

export const PasswordField = ({
  loading,
  tabIndex,
  label,
  name,
  placeholder,
  isCompact = false,
  isSubmitted = false,
}: PasswordFieldProps) => {
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const [activeType, setActiveType] = useState<PasswordFieldType>(
    PasswordFieldType.password,
  );

  const {
    meter,
    passwordStrength,
    passwordTracker,
    isPasswordRare,
    passwordMessage,
    setMeter,
    setPassword,
  } = usePasswordStrength();

  const handleIconClick = () => {
    const type =
      activeType === PasswordFieldType.password
        ? PasswordFieldType.text
        : PasswordFieldType.password;
    setActiveType(type);
  };

  const handleClickOutside = () => setMeter(false);

  useClickOutside<HTMLDivElement>(fieldRef, handleClickOutside);

  useEffect(() => {
    if (isSubmitted) {
      setPassword('');
    }
  }, [isSubmitted]);

  return (
    <div css={styles.wrapper} ref={fieldRef}>
      <Input
        tabIndex={tabIndex}
        labelStyles={[Boolean(label) ? typo.base : display.visuallyHidden]}
        disabled={loading}
        label={label}
        name={name}
        placeholder={placeholder}
        type={activeType}
        onInput={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        // onChange={(e) => setPassword(e.target.value)}
        onFocus={() => setMeter(true)}
        validationOptions={{
          required: 'This is a mandatory field',
          minLength: {
            value: 8,
            message: 'Password should be at least 8 characters long',
          },
        }}
        rightIcon={
          <PasswordToggle
            tabIndex={tabIndex + 10}
            activeType={activeType}
            onClick={handleIconClick}
          />
        }
      />
      <PasswordMeter
        meter={meter || isMobile || isCompact}
        isLabeled={Boolean(label)}
        passwordStrength={passwordStrength}
        passwordTracker={passwordTracker}
        passwordMessage={passwordMessage}
        isPasswordRare={isPasswordRare}
        isCompact={isCompact}
      />
    </div>
  );
};
