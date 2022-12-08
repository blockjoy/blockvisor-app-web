import Sidebar from './sidebar/Sidebar';
import Overlay from './overlay/Overlay';
import { Burger } from './burger/Burger';
import Page from './page/Page';
import { PrivateRoute } from '@modules/auth';
import { OrganizationAdd } from '@modules/organizations';
import { NodeWizard } from '@modules/node';
import 'react-perfect-scrollbar/dist/css/styles.css';

type LayoutType = {
  children: React.ReactNode;
  breadcrumb?: string[];
};

export const AppLayout: React.FC<LayoutType> = ({ children, breadcrumb }) => {
  return (
    <>
      <PrivateRoute>
        <Burger />
        <Sidebar />
        <Overlay />
        <NodeWizard />
        <OrganizationAdd />
        <Page>{children}</Page>
      </PrivateRoute>
    </>
  );
};
