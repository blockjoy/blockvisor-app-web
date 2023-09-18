import { useState } from 'react';
import { Item, ItemPrice } from 'chargebee-typescript/lib/resources';
import { EmptyColumn } from '@shared/components';
import { styles } from './Plan.styles';
import { usePermissions } from '@modules/auth';
import { PlanConfiguration, PlanItem } from '@modules/billing';

type PlanProps = {
  item: Item;
  itemPrices: ItemPrice[];
};

export const Plan = ({ item, itemPrices }: PlanProps) => {
  const [activeView, setActiveView] =
    useState<'default' | 'preview'>('default');
  const [activeItem, setActiveItem] = useState<Item | null>(item);

  const handleSelect = (plan: Item) => {
    setActiveView('preview');
    setActiveItem(plan);
  };

  const handleCancel = () => setActiveView('default');

  const { hasPermission } = usePermissions();
  const canCreateSubscription = hasPermission('subscription-create');

  return (
    <>
      {activeView === 'default' && (
        <EmptyColumn
          title="You Have No Active Plans."
          description={
            <div>
              <p style={{ marginBottom: '10px' }}>
                {canCreateSubscription
                  ? 'You are currently on a free plan. To access BlockVisor features add a paid plan.'
                  : 'There are no plans available for your organization.'}
              </p>
            </div>
          }
          align="left"
          additionalStyles={styles.emptyColumn}
        />
      )}
      {item &&
        canCreateSubscription &&
        (activeView === 'default' ? (
          <PlanItem item={item} handleSelect={handleSelect} />
        ) : (
          <PlanConfiguration
            item={activeItem}
            handleCancel={handleCancel}
            itemPrices={itemPrices}
          />
        ))}
    </>
  );
};
