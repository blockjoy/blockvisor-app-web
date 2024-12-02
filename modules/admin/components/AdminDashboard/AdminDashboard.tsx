import { useAdminGetTotals } from '@modules/admin';
import { useRouter } from 'next/router';
import { styles } from './AdminDashboard.styles';
import { AdminDashboardCard } from './AdminDashboardCard/AdminDashboardCard';
import { AdminDashboardNodeReports } from './AdminDashboardNodeReports/AdminDashboardNodeReports';

import IconHost from '@public/assets/icons/app/Host.svg';
import IconNode from '@public/assets/icons/app/Node.svg';
import IconOrg from '@public/assets/icons/app/Organization.svg';
import IconUser from '@public/assets/icons/common/Person.svg';
import IconBlockchain from '@public/assets/icons/app/Blockchain.svg';

type Card = {
  name: 'Nodes' | 'Hosts' | 'Users' | 'Orgs' | 'Protocols';
  getTotal: () => Promise<number>;
  icon: React.ReactNode;
};

export const AdminDashboard = () => {
  const router = useRouter();

  const {
    getTotalUsers,
    getTotalHosts,
    getTotalNodes,
    getTotalOrgs,
    getTotalProtocols,
  } = useAdminGetTotals();

  const cards: Card[] = [
    {
      name: 'Nodes',
      getTotal: getTotalNodes,
      icon: <IconNode />,
    },
    {
      name: 'Hosts',
      getTotal: getTotalHosts,
      icon: <IconHost />,
    },
    {
      name: 'Protocols',
      getTotal: getTotalProtocols,
      icon: <IconBlockchain />,
    },
    {
      name: 'Orgs',
      getTotal: getTotalOrgs,
      icon: <IconOrg />,
    },
    {
      name: 'Users',
      getTotal: getTotalUsers,
      icon: <IconUser />,
    },
  ];

  return (
    <section css={styles.wrapper}>
      <div css={styles.grid}>
        {cards.map((card) => (
          <AdminDashboardCard
            key={card.name}
            name={card.name}
            icon={card.icon}
            getTotal={card.getTotal}
          />
        ))}
      </div>
      <AdminDashboardNodeReports />
    </section>
  );
};
