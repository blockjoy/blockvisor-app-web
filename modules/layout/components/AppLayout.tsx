import Sidebar from './sidebar/Sidebar';
import Overlay from './overlay/Overlay';
import { Topbar } from './topbar/Topbar';
import { Burger } from './burger/Burger';
import Page from './page/Page';
import Breadcrumb from './breadcrumb/Breadcrumb';
import { PrivateRoute } from '@modules/auth';
import { OrganizationAdd } from '@modules/organizations';
import { NodeWizard } from '@modules/node';

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
        <Topbar />
        <NodeWizard />
        <OrganizationAdd />

        <Breadcrumb breadcrumb={breadcrumb} />
        <Page>{children}</Page>
      </PrivateRoute>
    </>
  );
};
