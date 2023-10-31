import { css } from '@emotion/react';
import { useNodeView } from '@modules/node/hooks/useNodeView';
import {
  BlockchainIcon,
  Button,
  Input,
  Modal,
  Textarea,
} from '@shared/components';
import { ReactNode, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { display } from 'styles/utils.display.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './NodeViewReportProblem.styles';

type Props = {
  onHide: VoidFunction;
  onSubmit: (message: string) => void;
};

export const NodeViewReportProblem = ({ onHide, onSubmit }: Props) => {
  const form = useForm<{ message: string }>({ mode: 'onChange' });
  const { isValid } = form.formState;
  const [isDeleting, setIsDeleting] = useState(false);
  const { node } = useNodeView();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsDeleting(true);
    onSubmit(form.getValues().message);
  };

  return (
    <Modal portalId="nodeViewReportProblem" isOpen={true} handleClose={onHide}>
      <h2 css={styles.header}>Report Problem On Node ({node?.name})</h2>
      <p></p>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit}>
          <Textarea
            shouldAutoFocus
            name="message"
            placeholder="Explain the problem here"
            rows={6}
            spellCheck="false"
            validationOptions={{
              required: 'This is a mandatory field',
            }}
          />
          <div css={[styles.actions, spacing.top.medium]}>
            <Button
              disabled={!isValid}
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
              Submit
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
        </form>
      </FormProvider>
    </Modal>
  );
};
