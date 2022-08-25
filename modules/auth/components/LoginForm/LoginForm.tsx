import { useState } from 'react';
import { Button, Input } from '@shared/components';
import { display } from 'styles/utils.display.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { reset } from 'styles/utils.reset.styles';
import { PasswordToggle } from '../PasswordTogle';

export function LoginForm() {
  const [activeType, setActiveType] = useState<'password' | 'text'>('password');

  const handleIconClick = () => {
    const type = activeType === 'password' ? 'text' : 'password';
    setActiveType(type);
  };
  return (
    <form>
      <ul css={[reset.list]}>
        <li css={[spacing.bottom.mediumSmall]}>
          <Input
            labelStyles={[display.visuallyHidden]}
            name="email"
            placeholder="Email"
          />
        </li>
        <li css={[spacing.bottom.medium]}>
          <Input
            labelStyles={[display.visuallyHidden]}
            name="password"
            placeholder="Password"
            type={activeType}
            rightIcon={
              <PasswordToggle
                activeType={activeType}
                onClick={handleIconClick}
              />
            }
          />
        </li>
      </ul>
      <Button size="medium" display="block" style="primary" type="submit">
        Login
      </Button>
    </form>
  );
}
