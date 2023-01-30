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
import { useGetBlockchains } from '@modules/node';
import { apiClient } from '@modules/client';

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
  const { getBlockchains, blockchains } = useGetBlockchains();

  useEffect(() => {
    getReceivedInvitations(userId!);
  }, []);

  useEffect(() => {
    getOrganizations();
  }, []);

  useEffect(() => {
    apiClient.getUpdates();
  }, []);

  useEffect(() => {
    if (!blockchains?.length) {
      getBlockchains();
      console.log('getting blockchains in layout');
    }
  }, []);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Burger />
      <Sidebar />
      <Overlay />
      <OrganizationAdd />
      <Page isFlex={isPageFlex}>{children}</Page>
    </>
  );
};
