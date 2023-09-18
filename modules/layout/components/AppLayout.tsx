import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import Sidebar from './sidebar/Sidebar';
import { Burger } from './burger/Burger';
import Page from './page/Page';
import { Toast } from './toast/Toast';
import { useIdentityRepository, useUserSubscription } from '@modules/auth';
import {
  useDefaultOrganization,
  useGetOrganizations,
  useInvitations,
  useProvisionToken,
} from '@modules/organization';
import { useGetBlockchains, useNodeList } from '@modules/node';
import { MqttUIProvider, useMqtt } from '@modules/mqtt';
import { useHostList } from '@modules/host';
import {
  billingSelectors,
  useCustomer,
  usePaymentMethods,
  useSubscription,
} from '@modules/billing';
import { usePermissions } from '@modules/auth';

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

  const { connect: mqttConnect } = useMqtt();
  const { getPermissions } = usePermissions();
  const { getReceivedInvitations } = useInvitations();
  const { getOrganizations, organizations } = useGetOrganizations();
  const { getBlockchains, blockchains } = useGetBlockchains();
  const { loadNodes } = useNodeList();
  const { loadHosts } = useHostList();
  const { getProvisionToken, provisionToken } = useProvisionToken();
  const { defaultOrganization } = useDefaultOrganization();
  const { customer, getCustomer } = useCustomer();
  const { fetchPaymentMethods } = usePaymentMethods();
  const { fetchSubscription, setSubscriptionLoadingState } = useSubscription();
  const { getUserSubscription } = useUserSubscription();

  useEffect(() => {
    if (!customer && billingId) getCustomer(billingId);
  }, []);

  useEffect(() => {
    (async () => {
      if (!organizations.length) await getOrganizations(true);
      await getReceivedInvitations(user?.email!);
      mqttConnect();
    })();
  }, []);

  useEffect(() => {
    const fetchOrganizationSubscription = async () => {
      setSubscriptionLoadingState('initializing');

      const userSubscription = await getUserSubscription(
        defaultOrganization?.id!,
      );

      await fetchSubscription(userSubscription?.externalId);
    };

    if (
      defaultOrganization?.id !== currentOrg.current &&
      defaultOrganization?.id
    )
      fetchOrganizationSubscription();
  }, [defaultOrganization?.id]);

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
      mqttConnect();
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
      <Toast />
      <MqttUIProvider>
        {defaultOrganization?.id && <Page isFlex={isPageFlex}>{children}</Page>}
      </MqttUIProvider>
    </>
  );
};
