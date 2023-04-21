import { useRouter } from 'next/router';
import { Alert, Button, Input } from '@shared/components';
import { FC, useState } from 'react';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { display } from 'styles/utils.display.styles';
import { styles } from './DangerZone.styles';
import { FormProvider, useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { escapeHtml } from '@shared/utils/escapeHtml';

export enum Action {
  leave = 'leave',
  delete = 'delete',
}

interface Props {
  handleAction: () => void;
  elementName: string | 'Node' | 'Host';
  elementNameToCompare: string;
  activeAction?: string | 'delete' | 'leave';
  isLoading?: boolean;
  isDisabled?: boolean;
}

type DeleteForm = {
  elementNameToDelete: string;
};

const redirects = {
  Node: '/nodes',
  Host: '/hosts',
  Organization: '/organizations',
};

export const DangerZone: FC<Props> = ({
  handleAction,
  elementName = 'Node',
  elementNameToCompare,
  activeAction = 'delete',
  isLoading = false,
  isDisabled = false,
}) => {
  const router = useRouter();
  const [step, setStep] = useState<number | 1 | 2>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const form = useForm<DeleteForm>({ mode: 'onChange' });
  const { isValid } = form.formState;

  const gotoStep = (step: number) => setStep(step);

  const doNamesMatch = (name: string) =>
    name === escapeHtml(elementNameToCompare);

  const handleRedirect = () => router.push(redirects[elementName]);

  const onSubmit = async (e: any) => {
    setIsSubmitted(true);
    e.preventDefault();
    handleAction();
    handleRedirect();
  };

  const messages = {
    [Action.leave]: {
      btn: 'Leave',
    },
    [Action.delete]: {
      btn: 'Delete',
    },
  };

  return (
    <section css={[spacing.top.large, spacing.bottom.xLarge]}>
      <h2 css={[typo.large, spacing.bottom.medium]}>Danger Zone</h2>
      {step === 1 && (
        <>
          <div css={spacing.bottom.medium}>
            <p>No longer need this {elementName}?</p>
            <small>Click the button below to {activeAction} it.</small>
          </div>
          <Button
            disabled={isDisabled}
            size="small"
            style="warning"
            onClick={() => gotoStep(2)}
          >
            {messages[activeAction].btn}
          </Button>
          {isDisabled && (
            <div css={spacing.top.medium}>
              <Alert width="420px">
                You cannot delete an {elementName} that has Nodes.
              </Alert>
            </div>
          )}
        </>
      )}
      {step === 2 && (
        <div css={spacing.bottom.medium}>
          <p css={spacing.bottom.medium}>
            To {activeAction}, type the name of your {elementName} and then
            click "confirm".
          </p>
          <FormProvider {...form}>
            <form onSubmit={(e) => onSubmit(e)}>
              <Input
                style={{ maxWidth: '320px' }}
                labelStyles={[display.visuallyHidden]}
                name="elementNameToDelete"
                placeholder={`Type ${elementName} name`}
                type="text"
                validationOptions={{
                  required: 'This is a mandatory field',
                  validate: (name) => doNamesMatch(name),
                }}
              />
              <div css={[styles.actions, spacing.top.medium]}>
                <Button
                  disabled={!isValid || isSubmitted}
                  type="submit"
                  size="small"
                  style="warning"
                  loading={isLoading}
                  customCss={[
                    css`
                      min-width: 92px;
                    `,
                  ]}
                >
                  Confirm
                </Button>
                <Button
                  type="submit"
                  onClick={() => gotoStep(1)}
                  size="small"
                  style="outline"
                  customCss={[
                    css`
                      min-width: 92px;
                    `,
                  ]}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      )}
    </section>
  );
};
