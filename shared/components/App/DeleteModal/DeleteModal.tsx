import { ReactNode, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { Button, FormError, Input, Modal } from '@shared/components';
import { display } from 'styles/utils.display.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './DeleteModal.styles';

type Props = {
  portalId: string;
  type?: string;
  elementType?: string;
  elementName: string;
  elementPlaceholder?: string;
  entityName: string;
  isDisabled?: boolean;
  isDisabledMessage?: string | ReactNode;
  onHide: VoidFunction;
  onSubmit: VoidFunction;
  error?: string;
};

export const DeleteModal = ({
  portalId,
  type = 'Delete',
  elementType = 'name',
  elementName,
  elementPlaceholder,
  entityName,
  isDisabled,
  isDisabledMessage,
  onHide,
  onSubmit,
  error,
}: Props) => {
  const form = useForm<{ name: string }>({ mode: 'onChange' });
  const { isValid } = form.formState;
  const [isDeleting, setIsDeleting] = useState(false);
  const doNamesMatch = (name: string) => name === elementName;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsDeleting(true);
    onSubmit();
  };

  useEffect(() => {
    if (error) setIsDeleting(false);
  }, [error]);

  return (
    <Modal portalId={portalId} isOpen={true} handleClose={onHide}>
      <h2 css={styles.header}>
        {type} {entityName} (
        {elementPlaceholder ? elementPlaceholder : elementName})
      </h2>

      {isDisabled && isDisabledMessage && (
        <p css={spacing.bottom.medium}>{isDisabledMessage}</p>
      )}
      <>
        {!isDisabled && (
          <p css={spacing.bottom.medium}>
            To {type?.toLowerCase()}, type the {elementType} of your{' '}
            {entityName} and then click "confirm".
          </p>
        )}

        <FormProvider {...form}>
          <form onSubmit={handleSubmit}>
            {!isDisabled && (
              <Input
                autoFocus
                style={{ maxWidth: '380px' }}
                labelStyles={[display.visuallyHidden]}
                name="elementNameToDelete"
                placeholder={`Type ${entityName?.toLowerCase()} ${elementType}`}
                type="text"
                validationOptions={{
                  required: 'This is a mandatory field',
                  validate: (name) => doNamesMatch(name),
                }}
              />
            )}
            <div css={[styles.actions, spacing.top.medium]}>
              <Button
                disabled={!isValid || isDeleting || isDisabled}
                type="submit"
                size="medium"
                style="warning"
                loading={isDeleting}
                customCss={[
                  css`
                    min-width: 125px;
                  `,
                ]}
              >
                Confirm
              </Button>
              <Button
                onClick={onHide}
                type="submit"
                size="medium"
                style="outline"
                customCss={[
                  css`
                    min-width: 125px;
                  `,
                ]}
              >
                Cancel
              </Button>
            </div>
            <FormError isVisible={!!error}>{error}</FormError>
          </form>
        </FormProvider>
      </>
    </Modal>
  );
};
