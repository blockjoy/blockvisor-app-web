import Sidebar from './sidebar/Sidebar';
import Overlay from './overlay/Overlay';
import { Burger } from './burger/Burger';
import Page from './page/Page';
import { useIdentityRepository } from '@modules/auth';
import {
  OrganizationAdd,
  useGetOrganizations,
  useInvitations,
} from '@modules/organization';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useEffect, useRef } from 'react';
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

  const hasGotUpdates = useRef<boolean>(false);

  const { getReceivedInvitations } = useInvitations();
  const { getOrganizations, organizations } = useGetOrganizations();
  const { getBlockchains, blockchains } = useGetBlockchains();

  useEffect(() => {
    getReceivedInvitations(userId!);
  }, []);

  useEffect(() => {
    if (!organizations.length) getOrganizations();
    if (!blockchains?.length) getBlockchains();
  }, []);

  useEffect(() => {
    if (!hasGotUpdates.current) {
      console.log('subscribing to updates');
      apiClient.getUpdates();
      hasGotUpdates.current = true;
    }
  }, []);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <script
          defer
          data-domain="app.blockjoy.com"
          src="https://plausible.io/js/script.js"
        ></script>
      </Head>
      <Burger />
      <Sidebar />
      <Overlay />
      <OrganizationAdd />
      <Page isFlex={isPageFlex}>{children}</Page>
    </>
  );
};
