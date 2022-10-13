import Sidebar from './sidebar/Sidebar';
import Overlay from './overlay/Overlay';
import { Topbar } from './topbar/Topbar';
import Profile from './profile/Profile';
import Page from './page/Page';
import Breadcrumb from './breadcrumb/Breadcrumb';
import { NodeAdd } from '@modules/node/components/nodeAdd/NodeAdd';
import { PrivateRoute } from '@modules/auth';
import {
  EditOrganization,
  organisationAtoms,
  OrganizationAdd,
} from '@modules/organizations';
import { useEffect, useState } from 'react';
import { getDefaultOrgFromStorage } from '@shared/utils/browserStorage';
import { useRecoilState } from 'recoil';

type LayoutType = {
  children: React.ReactNode;
  breadcrumb?: string[];
};

export const AppLayout: React.FC<LayoutType> = ({ children, breadcrumb }) => {
  const [gotDefaultOrg, setGotDefaultOrg] = useState<boolean>(false);

  const [, setDefaultOrganization] = useRecoilState(
    organisationAtoms.defaultOrganization,
  );

  useEffect(() => {
    const defaultOrg = getDefaultOrgFromStorage();
    setDefaultOrganization({
      id: defaultOrg?.id!,
      name: defaultOrg?.name!,
    });
    setGotDefaultOrg(true);
  }, []);

  return !gotDefaultOrg ? null : (
    <>
      <PrivateRoute>
        <Sidebar />
        <Overlay />
        <Topbar />
        <Profile />
        <NodeAdd />
        <OrganizationAdd />
        <EditOrganization />
        <Breadcrumb breadcrumb={breadcrumb} />
        <Page>{children}</Page>
      </PrivateRoute>
    </>
  );
};
