import { useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import Sidebar from './sidebar/Sidebar';
import { Burger } from './burger/Burger';
import Page from './page/Page';
import {
  useIdentityRepository,
  useRefreshToken,
  useUserSubscription,
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
import {
  billingSelectors,
  useCustomer,
  usePaymentMethods,
  useSubscription,
} from '@modules/billing';

export type LayoutProps = {
  children: React.ReactNode;
  isPageFlex?: boolean;
  pageTitle?: string;
};

export const AppLayout = ({ children, isPageFlex, pageTitle }: LayoutProps) => {
  const repository = useIdentityRepository();
  const user = repository?.getIdentity();

  const currentOrg = useRef<string>();

  const billingId = useRecoilValue(billingSelectors.billingId);
  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );

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
  const { customer, getCustomer } = useCustomer();
  const { fetchPaymentMethods } = usePaymentMethods();
  const { fetchSubscription, setSubscriptionLoadingState } = useSubscription();
  const { getUserSubscription } = useUserSubscription();

  usePageVisibility({
    onVisible: refreshToken,
  });

  useEffect(() => {
    if (!customer && billingId) getCustomer(billingId);
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
    const fetchOrganizationSubscription = async () => {
      setSubscriptionLoadingState('initializing');

      const userSubscription = await getUserSubscription(
        defaultOrganization?.id!,
      );

      await fetchSubscription(userSubscription?.externalId);
    };

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
      fetchOrganizationSubscription();
      loadNodes();
      loadHosts();
      getPermissions();
      if (mqttClient?.connected) updateMqttSubscription();
    }
  }, [defaultOrganization?.id]);

  useEffect(() => {
    fetchPaymentMethods();
  }, [customer]);

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
