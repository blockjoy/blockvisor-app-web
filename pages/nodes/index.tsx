import { AppLayout } from "@modules/layout";
import NodesModule from "@modules/app/nodes/Nodes";

const Nodes = () => <NodesModule />

Nodes.getLayout = function getLayout(page: any) {
  return <AppLayout breadcrumb={["Nodes", "Status"]}>{page}</AppLayout>
}

export default Nodes;

