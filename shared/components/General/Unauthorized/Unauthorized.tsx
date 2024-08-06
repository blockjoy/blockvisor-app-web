import { ReactNode } from 'react';
import { Alert } from '@shared/components';
import { containers } from 'styles/containers.styles';

type UnauthorizedProps = {
  children: ReactNode;
};

export const Unauthorized = ({ children }: UnauthorizedProps) => {
  return (
    <div css={containers.medium}>
      <Alert>{children}</Alert>
    </div>
  );
};
