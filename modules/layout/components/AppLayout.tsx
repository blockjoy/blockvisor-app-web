import Head from 'next/head';
import { useEffect, useRef } from 'react';
import Sidebar from './sidebar/Sidebar';
import { Burger } from './burger/Burger';
import Page from './page/Page';
import { Toast } from './toast/Toast';
import { useIdentityRepository } from '@modules/auth';
import {
  useDefaultOrganization,
  useGetOrganizations,
  useInvitations,
  useProvisionToken,
} from '@modules/organization';
import { useGetBlockchains, useNodeList } from '@modules/node';
import { MqttUIProvider, useMqtt } from '@modules/mqtt';
import { useHostList } from '@modules/host';
import { authClient } from '@modules/grpc';

export type LayoutProps = {
  children: React.ReactNode;
  isPageFlex?: boolean;
  pageTitle?: string;
};

export const AppLayout = ({ children, isPageFlex, pageTitle }: LayoutProps) => {
  const repository = useIdentityRepository();
  const userEmail = repository?.getIdentity()?.email;

  const currentOrg = useRef<string>();

  const { connect: mqttConnect } = useMqtt();
  const { getReceivedInvitations } = useInvitations();
  const { getOrganizations, organizations } = useGetOrganizations();
  const { getBlockchains, blockchains } = useGetBlockchains();
  const { loadNodes } = useNodeList();
  const { loadHosts } = useHostList();
  const { getProvisionToken, provisionToken } = useProvisionToken();
  const { defaultOrganization } = useDefaultOrganization();

  useEffect(() => {
    (async () => {
      if (!organizations.length) await getOrganizations(true);
      await getReceivedInvitations(userEmail!);

      const permissions = await authClient.listPermissions(
        repository?.getIdentity()?.id!,
        defaultOrganization?.id!,
      );

      console.log('permissions', permissions);

      mqttConnect();
    })();
  }, []);

  useEffect(() => {
    if (!provisionToken && defaultOrganization?.id) {
      getProvisionToken(defaultOrganization?.id);
    }
    if (!blockchains?.length && defaultOrganization?.id) {
      getBlockchains();
    }
    if (
      defaultOrganization?.id !== currentOrg.current &&
      defaultOrganization?.id
    ) {
      currentOrg.current = defaultOrganization!.id;
      loadNodes();
      loadHosts();
      mqttConnect();
    }
  }, [defaultOrganization?.id]);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Burger />
      <Sidebar />
      <Toast />
      <MqttUIProvider>
        {defaultOrganization?.id && <Page isFlex={isPageFlex}>{children}</Page>}
      </MqttUIProvider>
    </>
  );
};
