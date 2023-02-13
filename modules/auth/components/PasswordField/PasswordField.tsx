import { usePasswordStrength } from '@modules/auth/hooks/usePasswordStrength';
import { Input } from '@shared/components';
import { useState } from 'react';
import { display } from 'styles/utils.display.styles';
import { position } from 'styles/utils.position.styles';
import { PasswordToggle, PasswordMeter } from '@modules/auth';
import { typo } from 'styles/utils.typography.styles';

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
};

export const PasswordField = ({
  loading,
  tabIndex,
  label,
  name,
  placeholder,
}: PasswordFieldProps) => {
  const [activeType, setActiveType] = useState<PasswordFieldType>(
    PasswordFieldType.password,
  );

  const {
    meter,
    passwordStrength,
    passwordTracker,
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

  return (
    <div css={[position.relative]}>
      <Input
        tabIndex={tabIndex}
        labelStyles={[Boolean(label) ? typo.base : display.visuallyHidden]}
        disabled={loading}
        label={label}
        name={name}
        placeholder={placeholder}
        type={activeType}
        onFocus={() => setMeter(true)}
        onBlur={() => setMeter(false)}
        onChange={(e) => setPassword(e.target.value)}
        validationOptions={{
          required: 'This is a mandatory field',
          minLength: {
            value: 8,
            message: 'Password should be at least 8 characters long',
          },
        }}
        rightIcon={
          <PasswordToggle
            tabIndex={tabIndex + 1}
            activeType={activeType}
            onClick={handleIconClick}
          />
        }
      />
      <PasswordMeter
        meter={meter}
        isLabeled={Boolean(label)}
        passwordStrength={passwordStrength}
        passwordTracker={passwordTracker}
        passwordMessage={passwordMessage}
      />
    </div>
  );
};
