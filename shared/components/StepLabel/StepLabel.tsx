import { FC, PropsWithChildren } from 'react';
import { typo } from 'styles/utils.typography.styles';
import { styles } from '../ActionTitleHeader/ActionTitleHeader.styles';
import CheckIcon from '@public/assets/icons/check-empty-12.svg';
import { reset } from 'styles/utils.reset.styles';

interface Props extends PropsWithChildren {
  step: number;
  currentStep: number;
  setStep: (stepNumber: number) => void;
}

export const StepLabel: FC<Props> = ({
  step,
  currentStep,
  setStep,
  children,
}) => {
  const stepLabel =
    currentStep === step
      ? 'current'
      : currentStep > step
      ? 'completed'
      : 'disabled';

  const handleClick = () => {
    setStep(step);
  };

  return (
    <button
      css={[reset.button, typo.label, styles[stepLabel]]}
      disabled={currentStep <= step}
      type="button"
      onClick={handleClick}
    >
      <span className="step__number t-base">
        {currentStep > step ? <CheckIcon /> : step}
      </span>
      <span className="step__content">{children}</span>
    </button>
  );
};
