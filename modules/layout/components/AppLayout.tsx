import Sidebar from './sidebar/Sidebar';
import { Burger } from './burger/Burger';
import Page from './page/Page';
import { Toast } from './toast/Toast';
import { useIdentityRepository } from '@modules/auth';
import {
  organizationAtoms,
  useGetOrganizations,
  useInvitations,
} from '@modules/organization';
import { useEffect, useRef } from 'react';
import Head from 'next/head';
import { useGetBlockchains, useNodeList } from '@modules/node';
import { useRecoilValue } from 'recoil';
import { useMqttUpdates } from '@modules/node/hooks/useMqttUpdates';

export type LayoutProps = {
  children: React.ReactNode;
  isPageFlex?: boolean;
  pageTitle: string;
};

export const AppLayout = ({ children, isPageFlex, pageTitle }: LayoutProps) => {
  const repository = useIdentityRepository();
  const userId = repository?.getIdentity()?.id;

  useMqttUpdates();

  const { getReceivedInvitations } = useInvitations();
  const { getOrganizations, organizations } = useGetOrganizations();
  const { getBlockchains, blockchains } = useGetBlockchains();
  const { loadNodes } = useNodeList();

  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );
  useEffect(() => {
    if (!organizations.length) getOrganizations();
    if (!blockchains?.length) getBlockchains();
    getReceivedInvitations(userId!);
    loadNodes();
  }, []);

  useEffect(() => {
    if (defaultOrganization?.id) {
      loadNodes();
    }
  }, [defaultOrganization?.id]);

  useEffect(() => {
    if (!blockchains?.length) {
      getBlockchains();
      console.log('getting blockchains in layout');
    }
  }, [defaultOrganization?.id]);

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
      <Toast />
      <Page isFlex={isPageFlex}>{children}</Page>
    </>
  );
};
