import { AppLayout } from '@modules/layout';
import { OrganizationView } from '@modules/organization';
import type { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';

const OrganizationPage = () => <OrganizationView />;

OrganizationPage.getLayout = function getLayout(page: any) {
  return <AppLayout pageTitle="Organization">{page}</AppLayout>;
};

export const getServerSideProps = <
  Q extends ParsedUrlQuery,
  D extends PreviewData,
>(
  context: GetServerSidePropsContext<Q, D>,
) => {
  let { slug } = context.query;
  if (!slug) {
    slug = undefined;
  }

  return { props: { slug: slug || null } };
};

export default OrganizationPage;
