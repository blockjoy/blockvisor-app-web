import Sidebar from './sidebar/Sidebar';
import Overlay from './overlay/Overlay';
import { Burger } from './burger/Burger';
import { NodeLauncherFab } from './nodeLauncherFab/NodeLauncherFab';
import Page from './page/Page';
import { PrivateRoute } from '@modules/auth';
import { OrganizationAdd, useGetOrganizations } from '@modules/organization';
import { NodeWizard } from '@modules/node';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useEffect } from 'react';

type LayoutType = {
  children: React.ReactNode;
  isPageFlex?: boolean;
};

export const AppLayout: React.FC<LayoutType> = ({ children, isPageFlex }) => {
  const { getOrganizations } = useGetOrganizations();

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
        <NodeWizard />
        <OrganizationAdd />
        <Page isFlex={isPageFlex}>{children}</Page>
      </PrivateRoute>
    </>
  );
};
