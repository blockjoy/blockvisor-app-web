import { TextareaHTMLAttributes, useEffect } from 'react';
import { isMobileSafari } from 'react-device-detect';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { styles } from './Textarea.styles';

type Props = {
  name: string;
  shouldAutoFocus?: boolean;
  validationOptions?: RegisterOptions;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = ({
  name,
  validationOptions,
  shouldAutoFocus,
  ...rest
}: Props) => {
  const {
    register,
    formState: { errors },
    setFocus,
  } = useFormContext();

  useEffect(() => {
    if (shouldAutoFocus && !isMobileSafari) {
      setFocus(name);
    }
  }, [shouldAutoFocus]);

  return (
    <textarea
      css={styles.textarea}
      {...register(name, {
        ...validationOptions,
      })}
      {...rest}
    />
  );
};
