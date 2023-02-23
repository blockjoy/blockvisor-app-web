import { Button } from '@shared/components';
import { checkIfValidEmail } from '@shared/utils/validation';
import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  KeyboardEventHandler,
  useState,
} from 'react';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './OrganizationInvite.styles';

type Props = {
  inviteeEmail: string;
  isInviting: boolean;
  onInviteClicked: VoidFunction;
  onCancelClicked: VoidFunction;
  onInviteeEmailChanged: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const OrganizationInvite: FC<Props> = ({
  inviteeEmail,
  isInviting,
  onInviteClicked,
  onCancelClicked,
  onInviteeEmailChanged,
}) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const handleInviteClicked = () => {
    onInviteClicked();
  };

  const handleInviteeEmailChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const isValid = checkIfValidEmail(e.target.value);
    if (isValid) {
      setIsDisabled(false);
      onInviteeEmailChanged(e);
    } else {
      setIsDisabled(true);
    }
  };

  return (
    <div css={spacing.bottom.large}>
      <input
        type="email"
        autoFocus
        onChange={handleInviteeEmailChanged}
        onKeyUp={(e: KeyboardEvent<HTMLInputElement>) =>
          e.key === 'Enter' && handleInviteClicked()
        }
        placeholder="New member email address"
        css={styles.textarea}
      />
      <div css={styles.buttons}>
        <Button
          loading={isInviting}
          disabled={isDisabled}
          onClick={handleInviteClicked}
          display="block"
          size="small"
          style="secondary"
        >
          Add
        </Button>
        <Button
          onClick={onCancelClicked}
          display="block"
          size="small"
          style="outline"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
