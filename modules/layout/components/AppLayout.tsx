import Sidebar from './sidebar/Sidebar';
import Overlay from './overlay/Overlay';
import { Burger } from './burger/Burger';
import { NodeLauncherFab } from './nodeLauncherFab/NodeLauncherFab';
import Page from './page/Page';
import { PrivateRoute, useIdentityRepository } from '@modules/auth';
import {
  OrganizationAdd,
  useGetOrganizations,
  useInvitations,
} from '@modules/organization';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useEffect } from 'react';

type LayoutType = {
  children: React.ReactNode;
  isPageFlex?: boolean;
};

export const AppLayout: React.FC<LayoutType> = ({ children, isPageFlex }) => {
  const repository = useIdentityRepository();
  const userId = repository?.getIdentity()?.id;

  const { getReceivedInvitations } = useInvitations();
  const { getOrganizations } = useGetOrganizations();

  useEffect(() => {
    getReceivedInvitations(userId!);
  }, []);

  useEffect(() => {
    getOrganizations();
  }, []);

  return (
    <>
      <PrivateRoute>
        <NodeLauncherFab />
        <Burger />
        <Sidebar />
        <Overlay />
        <OrganizationAdd />
        <Page isFlex={isPageFlex}>{children}</Page>
      </PrivateRoute>
    </>
  );
};
