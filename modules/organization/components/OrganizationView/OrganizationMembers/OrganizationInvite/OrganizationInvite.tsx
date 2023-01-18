import { Button } from '@shared/components';
import { ChangeEvent, FC } from 'react';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './OrganizationInvite.styles';

type Props = {
  hasTextareaValue: boolean;
  onInviteClicked: VoidFunction;
  onCancelClicked: VoidFunction;
  onTextareaChanged: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const OrganizationInvite: FC<Props> = ({
  hasTextareaValue,
  onInviteClicked,
  onCancelClicked,
  onTextareaChanged,
}) => {
  const handleInviteClicked = () => {
    onInviteClicked();
  };

  return (
    <div css={spacing.bottom.large}>
      <input
        autoFocus
        onChange={(e: ChangeEvent<HTMLInputElement>) => onTextareaChanged(e)}
        placeholder="Insert new member email address here"
        css={styles.textarea}
      />
      <div css={styles.buttons}>
        <Button
          disabled={!hasTextareaValue}
          onClick={handleInviteClicked}
          display="block"
          size="small"
          style="secondary"
        >
          Add Member
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
