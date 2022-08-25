import { Button, Input } from '@shared/components';
import { display } from 'styles/utils.display.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { reset } from 'styles/utils.reset.styles';

export function LoginForm() {
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
        <li css={[spacing.bottom.medium]}></li>
      </ul>
      <Button size="medium" display="block" style="primary" type="submit">
        Login
      </Button>
    </form>
  );
}
