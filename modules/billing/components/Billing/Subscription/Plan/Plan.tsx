import { useRecoilValue } from 'recoil';
import { EmptyColumn } from '@shared/components';
import { styles } from './Plan.styles';
import { authSelectors } from '@modules/auth';
// import { PlanConfiguration, PlanItem } from '@modules/billing';

export const Plan = () => {
  // const [activeView, setActiveView] =
  //   useState<'default' | 'preview'>('default');

  // const handleSelect = () => setActiveView('preview');
  // const handleCancel = () => setActiveView('default');

  const canGetBillingDetails = useRecoilValue(
    authSelectors.hasPermission('org-billing-get-billing-details'),
  );

  return (
    <>
      {/* {activeView === 'default' && ( */}
      <EmptyColumn
        title="You Have No Active Plans."
        description={
          <div>
            <p style={{ marginBottom: '10px' }}>
              {canGetBillingDetails
                ? "To unlock BlockVisor's features, add your payment and billing information, then go to the NodeLauncher and simply launch your desired node."
                : 'There are no plans available for your organization.'}
            </p>
          </div>
        }
      />
      {/* )} */}
      {/* {canCreateSubscription &&
        (activeView === 'default' ? (
          <PlanItem handleSelect={handleSelect} />
        ) : (
          <PlanConfiguration handleCancel={handleCancel} />
        ))} */}
    </>
  );
};
