import Sidebar from './sidebar/Sidebar';
import Overlay from './overlay/Overlay';
import Topbar from './topbar/Topbar';
import Profile from './profile/Profile';
import Page from './page/Page';
import Breadcrumb from './breadcrumb/Breadcrumb';
import { NodeAdd, HostAdd } from '.';
import { PrivateRoute } from '@modules/auth';
import { OrganisationAdd } from './organization/OrganisationAdd';

type LayoutType = {
  children: React.ReactNode;
  breadcrumb?: string[];
};

export const AppLayout: React.FC<LayoutType> = ({ children, breadcrumb }) => {
  return (
    <>
      <PrivateRoute>
        <Sidebar />
        <Overlay />
        <Topbar />
        <Profile />
        <NodeAdd />
        <HostAdd />
        <OrganisationAdd />
        <Breadcrumb breadcrumb={breadcrumb} />
        <Page>{children}</Page>
      </PrivateRoute>
    </>
  );
};
