import { AdminHeader } from '../AdminHeader/AdminHeader';
import { styles } from './AdminSettings.styles';
import { AdminBilling } from './AdminBilling/AdminBilling';
import { AdminSettingsCard } from './AdminSettingsCard/AdminSettingsCard';
import { AdminLayoutSettings } from './AdminLayoutSettings/AdminLayoutSettings';
import IconBilling from '@public/assets/icons/common/Billing.svg';
import IconLayout from '@public/assets/icons/common/Layout.svg';

export const AdminSettings = () => {
  const cards = [
    {
      name: 'layout',
      icon: <IconLayout />,
      component: <AdminLayoutSettings />,
    },
    { name: 'billing', icon: <IconBilling />, component: <AdminBilling /> },
  ];

  return (
    <section css={styles.wrapper}>
      <AdminHeader name="Settings">Settings</AdminHeader>
      <div css={styles.list}>
        {cards.map((card) => (
          <AdminSettingsCard key={card.name} icon={card.icon} name={card.name}>
            {card.component}
          </AdminSettingsCard>
        ))}
      </div>
    </section>
  );
};
