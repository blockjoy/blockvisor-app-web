import Head from 'next/head';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
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
import { useGetBlockchains, useNodeList } from '@modules/node';
import { MqttUIProvider } from '@modules/mqtt';

export type LayoutProps = {
  children: React.ReactNode;
  isPageFlex?: boolean;
  pageTitle?: string;
};

export const AppLayout = ({ children, isPageFlex, pageTitle }: LayoutProps) => {
  const repository = useIdentityRepository();
  const userEmail = repository?.getIdentity()?.email;

  console.log('userEmail', userEmail);

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
    getReceivedInvitations(userEmail!);
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
      <MqttUIProvider>
        <Page isFlex={isPageFlex}>{children}</Page>
      </MqttUIProvider>
    </>
  );
};
