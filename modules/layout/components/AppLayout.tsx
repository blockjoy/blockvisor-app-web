import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import Sidebar from './sidebar/Sidebar';
import { Burger } from './burger/Burger';
import Page from './page/Page';
import { Toast } from './toast/Toast';
import { useIdentityRepository } from '@modules/auth';
import {
  organizationAtoms,
  useDefaultOrganization,
  useGetOrganizations,
  useInvitations,
  useProvisionToken,
} from '@modules/organization';
import { useGetBlockchains, useNodeList } from '@modules/node';
import { MqttUIProvider } from '@modules/mqtt';
import { useHostList } from '@modules/host';

export type LayoutProps = {
  children: React.ReactNode;
  isPageFlex?: boolean;
  pageTitle?: string;
};

export const AppLayout = ({ children, isPageFlex, pageTitle }: LayoutProps) => {
  const repository = useIdentityRepository();
  const userEmail = repository?.getIdentity()?.email;

  const currentOrg = useRef<string>();

  const { getReceivedInvitations } = useInvitations();
  const { getOrganizations, organizations } = useGetOrganizations();
  const { getBlockchains, blockchains } = useGetBlockchains();
  const { loadNodes } = useNodeList();
  const { loadHosts } = useHostList();
  const { getProvisionToken, provisionToken } = useProvisionToken();

  const { defaultOrganization, getDefaultOrganization } =
    useDefaultOrganization();

  useEffect(() => {
    if (!organizations.length) getOrganizations();
    if (!defaultOrganization?.id) getDefaultOrganization(organizations);
    getReceivedInvitations(userEmail!);
  }, []);

  useEffect(() => {
    if (!provisionToken) {
      getProvisionToken();
    }
    if (!blockchains?.length) {
      getBlockchains();
    }
    if (defaultOrganization?.id !== currentOrg.current) {
      currentOrg.current = defaultOrganization!.id;
      loadNodes();
      loadHosts();
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
