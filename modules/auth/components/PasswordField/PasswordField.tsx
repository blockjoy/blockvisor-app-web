import { usePasswordStrength } from '@modules/auth/hooks/usePasswordStrength';
import { Input } from '@shared/components';
import { useState } from 'react';
import { display } from 'styles/utils.display.styles';
import { PasswordToggle } from './PasswordTogle/PasswordToggle';
import { PasswordMeter } from './PasswordMeter/PasswordMeter';

export enum PasswordFieldType {
  password = 'password',
  text = 'text',
}

export type PasswordFieldProps = {
  loading: boolean;
};

export const PasswordField = ({ loading }: PasswordFieldProps) => {
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
    <>
      <Input
        tabIndex={4}
        labelStyles={[display.visuallyHidden]}
        disabled={loading}
        name="password"
        placeholder="Password"
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
            tabIndex={4}
            activeType={activeType}
            onClick={handleIconClick}
          />
        }
      />
      <PasswordMeter
        meter={meter}
        passwordStrength={passwordStrength}
        passwordTracker={passwordTracker}
        passwordMessage={passwordMessage}
      />
    </>
  );
};
