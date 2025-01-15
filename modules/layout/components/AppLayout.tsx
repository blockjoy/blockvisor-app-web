import { ReactNode, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import { Elements } from '@stripe/react-stripe-js';
import Sidebar from './sidebar/Sidebar';
import { Burger } from './burger/Burger';
import Page from './page/Page';
import { useIdentityRepository } from '@modules/auth';
import {
  organizationSelectors,
  useInvitations,
  useProvisionToken,
} from '@modules/organization';
import { useGetProtocols, useNodeList } from '@modules/node';
import { useMqtt } from '@modules/mqtt';
import { useHostList } from '@modules/host';
import { useBilling, useStripeSetup } from '@modules/billing';
import { MasterLayout } from '@modules/layout';
import { ProgressBar } from '@shared/components';

export type LayoutProps = {
  children: ReactNode;
  isPageFlex?: boolean;
  pageTitle?: string;
};

const Layout = ({ children, isPageFlex, pageTitle }: LayoutProps) => {
  const repository = useIdentityRepository();
  const user = repository?.getIdentity();

  const currentOrg = useRef<string>();

  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );

  const {
    client: mqttClient,
    connect: mqttConnect,
    reconnect: mqttReconnect,
    updateSubscription: updateMqttSubscription,
  } = useMqtt();
  const { getReceivedInvitations } = useInvitations();
  const { loadNodes } = useNodeList();
  const { loadHosts } = useHostList();
  const { getProvisionToken, provisionToken } = useProvisionToken();

  useBilling();
  useGetProtocols();

  useEffect(() => {
    (async () => {
      await getReceivedInvitations(user?.email!);
    })();
  }, []);

  useEffect(() => {
    if (!mqttClient) mqttConnect();
    else mqttReconnect();
  }, [user?.accessToken]);

  useEffect(() => {
    if (!provisionToken && defaultOrganization?.orgId) {
      getProvisionToken(defaultOrganization?.orgId);
    }
    if (
      defaultOrganization?.orgId !== currentOrg.current &&
      defaultOrganization?.orgId
    ) {
      currentOrg.current = defaultOrganization!.orgId;
      loadNodes();
      loadHosts();
      if (mqttClient?.connected) updateMqttSubscription();
    }
  }, [defaultOrganization?.orgId]);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <ProgressBar />
      <Burger />
      <Sidebar />
      <Page isFlex={isPageFlex}>{children}</Page>
    </>
  );
};

export const AppLayout = (props: LayoutProps) => {
  const { stripe } = useStripeSetup();

  return (
    <MasterLayout>
      <Elements stripe={stripe}>
        <Layout {...props} />
      </Elements>
    </MasterLayout>
  );
};
