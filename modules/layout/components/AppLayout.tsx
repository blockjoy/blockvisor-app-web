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
