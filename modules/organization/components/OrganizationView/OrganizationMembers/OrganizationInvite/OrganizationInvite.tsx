import { Button } from '@shared/components';
import { ChangeEvent, FC, useState } from 'react';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './OrganizationInvite.styles';

type Props = {
  hasTextareaValue: boolean;
  onAddMembersClicked: VoidFunction;
  onInviteClicked: VoidFunction;
  onCancelClicked: VoidFunction;
  onTextareaChanged: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export const OrganizationInvite: FC<Props> = ({
  hasTextareaValue,
  onAddMembersClicked,
  onInviteClicked,
  onCancelClicked,
  onTextareaChanged,
}) => {
  const [hasInvited, setHasInvited] = useState<boolean>(false);

  const handleInviteClicked = () => {
    setHasInvited(true);
    onInviteClicked();
  };

  const handleAddMembersClicked = () => {
    setHasInvited(false);
    onAddMembersClicked();
  };

  return (
    <>
      {!hasInvited && (
        <>
          <textarea
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
        </>
      )}
      {hasInvited && (
        <>
          <h2 css={spacing.bottom.medium}>Great News!</h2>
          <p css={spacing.bottom.medium}>
            We have sent an email to all new members with instructions on how to
            get started.
          </p>
          <div css={styles.buttons}>
            <Button
              disabled={!hasTextareaValue}
              onClick={handleAddMembersClicked}
              display="block"
              size="small"
            >
              Add Members
            </Button>
            <Button
              onClick={onCancelClicked}
              display="block"
              size="small"
              style="outline"
            >
              Back To List
            </Button>
          </div>
        </>
      )}
    </>
  );
};
