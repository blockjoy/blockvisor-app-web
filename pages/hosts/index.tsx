import { AppLayout } from "@modules/layout";
import HostsModule from "@modules/app/components/hosts/Hosts";

const Hosts = () => <HostsModule />

Hosts.getLayout = function getLayout(page: any) {
  return <AppLayout breadcrumb={["Hosts", "Status"]}>{page}</AppLayout>
}

export default Hosts;

