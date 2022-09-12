import Sidebar from './sidebar/Sidebar';
import Overlay from './overlay/Overlay';
import Topbar from './topbar/Topbar';
import Profile from './profile/Profile';
import HostAdd from './hostAdd/HostAdd';
import Page from './page/Page';
import Breadcrumb from './breadcrumb/Breadcrumb';
import { NodeAdd } from '.';
import { useRecoilState } from 'recoil';
import { appState } from '@modules/app/store';
import { GrpcClient } from '@modules/app/store/stub_client';
import { useEffect } from 'react';

type LayoutType = {
  children: React.ReactNode;
  breadcrumb?: string[];
};

export const AppLayout: React.FC<LayoutType> = ({ children, breadcrumb }) => {
  const [app, setApp] = useRecoilState(appState);

  useEffect(() => {
    const grpcClient = new GrpcClient('http://localhost:8080');
    setApp({
      ...app,
      grpcClient,
    });
  }, []);

  return (
    <>
      <Sidebar />
      <Overlay />
      <Topbar />
      <Profile />
      <NodeAdd />
      <HostAdd />
      <Breadcrumb breadcrumb={breadcrumb} />
      <Page>{children}</Page>
    </>
  );
};
