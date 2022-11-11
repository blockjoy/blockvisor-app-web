import { MouseEventHandler, ReactNode } from 'react';
import { display } from 'styles/utils.display.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './Toggle.styles';
import { RegisterOptions, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  children?: ReactNode;
  description?: ReactNode;
  active?: boolean;
  onClick: MouseEventHandler<HTMLLabelElement>;
  validationOptions?: RegisterOptions;
};

export function Toggle({
  children,
  description,
  active,
  onClick,
  name,
  validationOptions,
}: Props) {
  const { register } = useFormContext();

  const handle: MouseEventHandler<HTMLLabelElement> = (e) => {
    console.log('execute');
    onClick(e);
  };
  return (
    <>
      <input css={[display.visuallyHidden]} />
      <label
        {...register(name, validationOptions)}
        onClick={handle}
        css={[styles.base, active && styles.active]}
      >
        <div css={[styles.label]}>
          {children}
          {description && (
            <small css={[typo.tiny, styles.description]}>{description}</small>
          )}
        </div>
      </label>
    </>
  );
}
