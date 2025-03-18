import { AppLayout } from '@modules/layout';
import { PaymentMethods } from '@modules/billing';
import { SettingsWrapper } from '@modules/settings';

const Component = () => <PaymentMethods />;

Component.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <AppLayout isPageFlex>
      <SettingsWrapper scope="org">{page}</SettingsWrapper>
    </AppLayout>
  );
};

export async function getServerSideProps() {
  if (!process.env.NEXT_PUBLIC_STRIPE_KEY) {
    return {
      notFound: true,
    };
  }
  return { props: {} };
}

export default Component;
