import Sidebar from './sidebar/Sidebar';
import Overlay from './overlay/Overlay';
import { Topbar } from './topbar/Topbar';
import Page from './page/Page';
import Breadcrumb from './breadcrumb/Breadcrumb';
import { PrivateRoute } from '@modules/auth';
import { OrganizationAdd } from '@modules/organizations';
import { NodeWizard } from '@modules/node';
import { useRecoilValue } from 'recoil';
import { layoutState } from '../store/layoutAtoms';

type LayoutType = {
  children: React.ReactNode;
  breadcrumb?: string[];
};

export const AppLayout: React.FC<LayoutType> = ({ children, breadcrumb }) => {
  const layout = useRecoilValue(layoutState);

  return (
    <>
      <PrivateRoute>
        <Sidebar />
        <Overlay />
        <Topbar />
        <NodeWizard />
        <OrganizationAdd />

        {layout === 'sidebar' && <Breadcrumb breadcrumb={breadcrumb} />}
        <Page>{children}</Page>
      </PrivateRoute>
    </>
  );
};
