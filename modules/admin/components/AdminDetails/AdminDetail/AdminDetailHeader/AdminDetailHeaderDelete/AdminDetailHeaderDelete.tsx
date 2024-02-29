import { useState } from 'react';
import { styles } from './AdminDetailHeaderDelete.styles';
import { AdminHeaderButton } from '@modules/admin';
import IconDelete from '@public/assets/icons/common/Trash.svg';

type Props = {
  onDelete: VoidFunction;
};

export const AdminDetailHeaderDelete = ({ onDelete }: Props) => {
  const [step, setStep] = useState<1 | 2>(1);

  const toggleStep = () => {
    const nextStep = step === 1 ? 2 : 1;
    setStep(nextStep);
  };

  return (
    <div css={styles.wrapper}>
      {step === 1 ? (
        <AdminHeaderButton isDanger icon={<IconDelete />} onClick={toggleStep}>
          Delete
        </AdminHeaderButton>
      ) : (
        <>
          <p css={styles.text}>Delete?</p>
          <button css={styles.button} type="button" onClick={onDelete}>
            Yes
          </button>
          <button css={styles.button} type="button" onClick={toggleStep}>
            No
          </button>
        </>
      )}
    </div>
  );
};
