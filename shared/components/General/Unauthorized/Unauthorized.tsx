import { ReactNode } from 'react';
import { Alert } from '@shared/components';
import { containers } from 'styles/containers.styles';
import { SerializedStyles } from '@emotion/react';

type UnauthorizedProps = {
  children: ReactNode;
  additionalStyles?: SerializedStyles[];
};

export const Unauthorized = ({
  children,
  additionalStyles,
}: UnauthorizedProps) => {
  return (
    <div css={containers.medium}>
      <Alert {...(additionalStyles && { additionalStyles })}>{children}</Alert>
    </div>
  );
};
