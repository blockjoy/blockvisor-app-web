import Sidebar from './sidebar/Sidebar';
import Overlay from './overlay/Overlay';
import { Burger } from './burger/Burger';
import Page from './page/Page';
import { PrivateRoute, useIdentityRepository } from '@modules/auth';
import {
  OrganizationAdd,
  useGetOrganizations,
  useInvitations,
} from '@modules/organization';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useEffect } from 'react';
import Head from 'next/head';

type LayoutType = {
  children: React.ReactNode;
  isPageFlex?: boolean;
  pageTitle: string;
};

export const AppLayout: React.FC<LayoutType> = ({
  children,
  isPageFlex,
  pageTitle,
}) => {
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
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <PrivateRoute>
        <Burger />
        <Sidebar />
        <Overlay />
        <OrganizationAdd />
        <Page isFlex={isPageFlex}>{children}</Page>
      </PrivateRoute>
    </>
  );
};
