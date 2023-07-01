import { Button, Input, Modal } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { display } from 'styles/utils.display.styles';
import { css } from '@emotion/react';
import { styles } from './OrganizationViewHeaderDelete.styles';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import { useDeleteOrganization } from '@modules/organization/hooks/useDeleteOrganization';
import { useDefaultOrganization } from '@modules/organization/hooks/useDefaultOrganization';
import { useGetOrganizations } from '@modules/organization/hooks/useGetOrganizations';

export type Props = {
  onHide: VoidFunction;
  handleAction: VoidFunction;
  isDelete: boolean;
};

type DeleteForm = {
  elementNameToDelete: string;
};

export const OrganizationViewHeaderDelete = ({
  onHide,
  handleAction,
  isDelete,
}: Props) => {
  const { defaultOrganization } = useDefaultOrganization();

  const form = useForm<DeleteForm>({ mode: 'onChange' });
  const { isValid } = form.formState;
  const [isDeleting, setIsDeleting] = useState(false);
  const doNamesMatch = (name: string) => name === defaultOrganization!.name;

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsDeleting(true);
    handleAction();
  };

  const type = isDelete ? 'Delete' : 'Leave';

  return (
    <Modal portalId="modal-root" isOpen={true} handleClose={onHide}>
      <h2 css={styles.header}>
        {type} Organization ({defaultOrganization!.name})
      </h2>

      <p css={spacing.bottom.medium}>
        To {type?.toLowerCase()}, type the name of your Organization and then
        click "confirm".
      </p>
      <FormProvider {...form}>
        <form onSubmit={(e) => onSubmit(e)}>
          <Input
            autoFocus
            style={{ maxWidth: '380px' }}
            labelStyles={[display.visuallyHidden]}
            name="elementNameToDelete"
            placeholder={`Type Node name`}
            type="text"
            validationOptions={{
              required: 'This is a mandatory field',
              validate: (name) => doNamesMatch(name),
            }}
          />
          <div css={[styles.actions, spacing.top.medium]}>
            <Button
              disabled={!isValid || isDeleting}
              type="submit"
              size="small"
              style="warning"
              loading={isDeleting}
              customCss={[
                css`
                  min-width: 92px;
                `,
              ]}
            >
              Confirm
            </Button>
            <Button
              onClick={onHide}
              type="submit"
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
    </Modal>
  );
};
