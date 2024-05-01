import { useState } from 'react';
import { styles } from './AdminDetailHeaderDelete.styles';
import { AdminHeaderButton } from '@modules/admin/components';
import { ButtonSpinner } from '@shared/components';
import IconDelete from '@public/assets/icons/common/Trash.svg';

type Props = {
  onDelete: VoidFunction;
};

export const AdminDetailHeaderDelete = ({ onDelete }: Props) => {
  const [step, setStep] = useState<1 | 2>(1);

  const [isDeleting, setIsDeleting] = useState(false);

  const toggleStep = () => {
    const nextStep = step === 1 ? 2 : 1;
    setStep(nextStep);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    onDelete();
  };

  return (
    <div css={styles.wrapper}>
      {step === 1 ? (
        <AdminHeaderButton
          isDanger
          icon={<IconDelete />}
          onClick={toggleStep}
          tooltip="Delete"
        />
      ) : (
        <>
          <p css={styles.text}>Delete?</p>
          <button
            disabled={isDeleting}
            css={[styles.button, isDeleting && styles.buttonLoading]}
            type="button"
            onClick={handleDelete}
          >
            {isDeleting ? <ButtonSpinner size="small" /> : 'Yes'}
          </button>
          <button
            disabled={isDeleting}
            css={styles.button}
            type="button"
            onClick={toggleStep}
          >
            No
          </button>
        </>
      )}
    </div>
  );
};
