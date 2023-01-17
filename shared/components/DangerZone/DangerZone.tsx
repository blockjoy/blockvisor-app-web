import { useRouter } from 'next/router';
import { Button, Input } from '@shared/components';
import { FC, useState } from 'react';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { display } from 'styles/utils.display.styles';
import { styles } from './DangerZone.styles';
import { FormProvider, useForm } from 'react-hook-form';

interface Props {
  handleDelete: () => Promise<void>;
  elementName: string | 'Node' | 'Host';
  elementNameToCompare: string;
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
  handleDelete,
  elementName = 'Node',
  elementNameToCompare,
}) => {
  const router = useRouter();
  const [step, setStep] = useState<number | 1 | 2>(1);
  const form = useForm<DeleteForm>({ mode: 'onChange' });
  const { isValid } = form.formState;

  const gotoStep = (step: number) => setStep(step);

  const doNamesMatch = (name: string) => {
    return name === elementNameToCompare;
  };

  const handleRedirect = () => router.push(redirects[elementName]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await handleDelete();
    handleRedirect();
  };

  return (
    <section css={[spacing.top.large, spacing.bottom.xLarge]}>
      <h2 css={[typo.large, spacing.bottom.large]}>Danger Zone</h2>
      {step === 1 && (
        <>
          <div css={spacing.bottom.medium}>
            <p>No longer need this {elementName}?</p>
            <small>Click the button below to delete it.</small>
          </div>
          <Button size="small" style="warning" onClick={() => gotoStep(2)}>
            Delete
          </Button>
        </>
      )}
      {step === 2 && (
        <div css={spacing.bottom.medium}>
          <p css={spacing.bottom.medium}>
            To delete, type the name of your {elementName} and then click
            "confirm".
          </p>
          <FormProvider {...form}>
            <form onSubmit={(e) => onSubmit(e)}>
              <Input
                style={{ maxWidth: '320px' }}
                labelStyles={[display.visuallyHidden]}
                name="elementNameToDelete"
                placeholder={`Enter your ${elementName} name here`}
                type="text"
                validationOptions={{
                  required: 'This is a mandatory field',
                  validate: (name) => doNamesMatch(name),
                }}
              />
              <div css={[styles.actions, spacing.top.medium]}>
                <Button
                  disabled={!isValid}
                  type="submit"
                  size="small"
                  style="warning"
                >
                  Confirm
                </Button>
                <Button
                  type="submit"
                  onClick={() => gotoStep(1)}
                  size="small"
                  style="outline"
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
