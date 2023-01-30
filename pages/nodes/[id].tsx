import { AppLayout } from '@modules/layout';
import { NodeView } from '@modules/node/';
import type { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';

const Node = () => <NodeView />;

Node.getLayout = function getLayout(page: any) {
  return <AppLayout pageTitle="Node">{page}</AppLayout>;
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

export default Node;
