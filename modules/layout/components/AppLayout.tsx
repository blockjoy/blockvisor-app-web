import { useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import Sidebar from './sidebar/Sidebar';
import { Burger } from './burger/Burger';
import Page from './page/Page';
import {
  authAtoms,
  useIdentityRepository,
  useRefreshToken,
} from '@modules/auth';
import {
  organizationAtoms,
  useGetOrganizations,
  useInvitations,
  useProvisionToken,
} from '@modules/organization';
import { useGetBlockchains, useNodeList } from '@modules/node';
import { useMqtt } from '@modules/mqtt';
import { useHostList } from '@modules/host';
import { usePermissions } from '@modules/auth';
import { usePageVisibility } from '@shared/index';

export type LayoutProps = {
  children: React.ReactNode;
  isPageFlex?: boolean;
  pageTitle?: string;
};

export const AppLayout = ({ children, isPageFlex, pageTitle }: LayoutProps) => {
  const repository = useIdentityRepository();
  const userEmail = repository?.getIdentity()?.email;

  const currentOrg = useRef<string>();

  const { refreshToken, removeRefreshTokenCall } = useRefreshToken();
  const {
    client: mqttClient,
    connect: mqttConnect,
    reconnect: mqttReconnect,
    updateSubscription: updateMqttSubscription,
  } = useMqtt();
  const { getPermissions } = usePermissions();
  const { getReceivedInvitations } = useInvitations();
  const { getOrganizations, organizations } = useGetOrganizations();
  const { getBlockchains, blockchains } = useGetBlockchains();
  const { loadNodes } = useNodeList();
  const { loadHosts } = useHostList();
  const { getProvisionToken, provisionToken } = useProvisionToken();

  const user = useRecoilValue(authAtoms.user);

  usePageVisibility({
    onVisible: refreshToken,
  });

  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );

  useEffect(() => {
    (async () => {
      if (!organizations.length) await getOrganizations(true);
      await getReceivedInvitations(userEmail!);
    })();
  }, []);

  useEffect(() => {
    try {
      refreshToken();
    } catch (error: any) {
      console.error('Error while refreshing the token');
    }

    return () => {
      removeRefreshTokenCall();
    };
  }, []);

  useEffect(() => {
    if (!mqttClient) mqttConnect();
    else mqttReconnect();
  }, [user?.accessToken]);

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
      getPermissions();
      if (mqttClient?.connected) updateMqttSubscription();
    }
  }, [defaultOrganization?.id]);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Burger />
      <Sidebar />
      {defaultOrganization?.id && <Page isFlex={isPageFlex}>{children}</Page>}
    </>
  );
};
