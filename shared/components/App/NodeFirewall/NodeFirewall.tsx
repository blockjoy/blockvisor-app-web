import { sortIpStringArray } from '@modules/admin/utils/sortIpStringArray';
import { DetailsTableTabs, DetailsTableTabsList } from '@shared/components';

type Props = { allowIps: FilteredIpAddr[]; denyIps: FilteredIpAddr[] };

export const NodeFirewall = ({ allowIps, denyIps }: Props) => {
  const renderFirewallRules = (ips: string[]) => {
    return (
      <DetailsTableTabsList>
        {ips?.length ? ips.map((ip) => <li>{ip}</li>) : <li>None</li>}
      </DetailsTableTabsList>
    );
  };

  return (
    <DetailsTableTabs
      tabs={[
        {
          name: 'Allow',
          items: renderFirewallRules(
            sortIpStringArray(allowIps.map((ip) => ip.ip)),
          ),
        },
        {
          name: 'Deny',
          items: renderFirewallRules(
            sortIpStringArray(denyIps.map((ip) => ip.ip)),
          ),
        },
      ]}
    />
  );
};
