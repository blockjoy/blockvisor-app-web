import { PropsWithChildren } from 'react';

export const PortalContainer = ({ children }: PropsWithChildren) => {
  return <div className="portal-container">{children}</div>;
};
