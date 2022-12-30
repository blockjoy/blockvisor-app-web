import { Button } from '@shared/components';
import { ChangeEvent, FC } from 'react';
import { styles } from './OrganizationInvite.styles';

type Props = {
  onInviteClicked: VoidFunction;
  onCancelClicked: VoidFunction;
  onTextareaChanged: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export const OrganizationInvite: FC<Props> = ({
  onInviteClicked,
  onCancelClicked,
  onTextareaChanged,
}) => {
  return (
    <>
      <textarea
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onTextareaChanged(e)}
        placeholder="Insert new member email addresses here"
        css={styles.textarea}
        rows={10}
      />
      <div css={styles.buttons}>
        <Button onClick={onInviteClicked} display="block" size="small">
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
    </>
  );
};
