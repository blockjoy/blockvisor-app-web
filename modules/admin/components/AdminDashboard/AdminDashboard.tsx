import { useAdminGetTotals } from '@modules/admin';
import { useRouter } from 'next/router';
import { styles } from './AdminDashboard.styles';
import { AdminDashboardCard } from './AdminDashboardCard/AdminDashboardCard';
import { AdminDashboardNodeReports } from './AdminDashboardNodeReports/AdminDashboardNodeReports';
import { AdminDashboardFinances } from './AdminDashboardFinances/AdminDashboardFinances';

import IconHost from '@public/assets/icons/app/Host.svg';
import IconNode from '@public/assets/icons/app/Node.svg';
import IconOrg from '@public/assets/icons/app/Organization.svg';
import IconUser from '@public/assets/icons/common/Person.svg';
import IconBlockchain from '@public/assets/icons/app/Blockchain.svg';
import { NextLink } from '@shared/components';

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
      <h2 css={styles.sectionHeader}>
        Finances
        <NextLink href="/admin?name=finances">View All</NextLink>
      </h2>
      <div css={styles.grid}>
        <AdminDashboardFinances />
      </div>
      <h2>Totals</h2>
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
      <h2>Issues</h2>
      <AdminDashboardNodeReports />
    </section>
  );
};
