import { Button } from '@shared/components';
import { ChangeEvent, FC, useState } from 'react';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './OrganizationInvite.styles';

type Props = {
  hasTextareaValue: boolean;
  onInviteClicked: VoidFunction;
  onCancelClicked: VoidFunction;
  onTextareaChanged: (e: ChangeEvent<HTMLTextAreaElement>) => void;
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
      <textarea
        autoFocus
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          onTextareaChanged(e)
        }
        placeholder="Insert new member email addresses here"
        css={styles.textarea}
        rows={10}
      />
      <div css={styles.buttons}>
        <Button
          disabled={!hasTextareaValue}
          onClick={handleInviteClicked}
          display="block"
          size="small"
          style="secondary"
        >
          Add Members
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
