import { AppLayout } from '@modules/layout';
import { NodeLauncher } from '@modules/node/';
import { fetchItemPrices } from 'utils/billing/fetchItems';
import { ItemPriceSimple } from '@modules/billing';

type NodeProps = {
  itemPrices: ItemPriceSimple[];
};

const Node = ({ itemPrices }: NodeProps) => (
  <NodeLauncher itemPrices={itemPrices} />
);

Node.getLayout = function getLayout(page: any) {
  return (
    <AppLayout pageTitle="Launch Node" isPageFlex>
      {page}
    </AppLayout>
  );
};

export async function getStaticProps() {
  try {
    const { itemPrices } = await fetchItemPrices();
    return { props: { itemPrices } };
  } catch (error) {
    console.error('Failed to fetch item prices:', error);
    return { props: { itemPrices: [] } };
  }
}

export default Node;
