import { AppLayout } from "@modules/layout";
import NodesModule from "@modules/app/components/nodes/Nodes";

const Nodes = () => <NodesModule />

Nodes.getLayout = function getLayout(page: any) {
  return <AppLayout breadcrumb={["Nodes", "All"]}>{page}</AppLayout>
}

export default Nodes;

