import { useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import Sidebar from './sidebar/Sidebar';
import { Burger } from './burger/Burger';
import Page from './page/Page';
import {
  useIdentityRepository,
  useRefreshToken,
  useUserSettings,
} from '@modules/auth';
import {
  organizationAtoms,
  organizationSelectors,
  useGetOrganizations,
  useInvitations,
  useProvisionToken,
} from '@modules/organization';
import { useGetBlockchains, useNodeList } from '@modules/node';
import { useMqtt } from '@modules/mqtt';
import { useHostList } from '@modules/host';
import { usePermissions } from '@modules/auth';
import { usePageVisibility } from '@shared/index';
import { useBilling } from '@modules/billing';
import { useSettings } from '@modules/settings';

export type LayoutProps = {
  children: React.ReactNode;
  isPageFlex?: boolean;
  pageTitle?: string;
};

export const AppLayout = ({ children, isPageFlex, pageTitle }: LayoutProps) => {
  const repository = useIdentityRepository();
  const user = repository?.getIdentity();

  const currentOrg = useRef<string>();

  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );
  const settingsDefaultOrg = useRecoilValue(
    organizationSelectors.settingsDefaultOrg,
  );

  const { refreshToken, removeRefreshTokenCall } = useRefreshToken();
  const { getUserSettings } = useUserSettings();
  const { updateSettings } = useSettings();
  const {
    client: mqttClient,
    connect: mqttConnect,
    reconnect: mqttReconnect,
    updateSubscription: updateMqttSubscription,
  } = useMqtt();
  const { getReceivedInvitations } = useInvitations();
  const { getOrganizations, organizations } = useGetOrganizations();
  const { loadNodes } = useNodeList();
  const { loadHosts } = useHostList();
  const { getProvisionToken, provisionToken } = useProvisionToken();

  usePageVisibility({
    onVisible: refreshToken,
  });

  usePermissions();
  useGetBlockchains();
  useBilling();

  useEffect(() => {
    getUserSettings();
  }, []);

  useEffect(() => {
    const fetchReceivedInvitations = async () => {
      if (!organizations.length) await getOrganizations(true);
      await getReceivedInvitations(user?.email!);
    };

    fetchReceivedInvitations();
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
    if (
      defaultOrganization?.id !== currentOrg.current &&
      defaultOrganization?.id
    ) {
      currentOrg.current = defaultOrganization!.id;
      if (settingsDefaultOrg?.id !== defaultOrganization?.id)
        updateSettings('organization', { default: defaultOrganization });
      loadNodes();
      loadHosts();
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
