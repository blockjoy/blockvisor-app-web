import { inputUtil, inputUtilLeft, inputUtilRight } from './InputUtil.styles';

type Props = {
  position?: 'left' | 'right';
} & React.PropsWithChildren;

export function InputUtil({ position = 'left', children }: Props) {
  return (
    <span
      css={[inputUtil, position === 'left' ? inputUtilLeft : inputUtilRight]}
    >
      {children}
    </span>
  );
}
