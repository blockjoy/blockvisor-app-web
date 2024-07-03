import { useRecoilValue } from 'recoil';
import {
  useEstimates,
  mapEstimatesToRows,
  billingSelectors,
  billingAtoms,
} from '@modules/billing';
import { Alert, Table, TableSkeleton } from '@shared/components';
import { containers } from 'styles/containers.styles';
import { styles } from './Estimates.styles';

export const Estimates = () => {
  const subscription = useRecoilValue(billingSelectors.subscription);
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );

  const { estimates, estimatesLoadingState } = useEstimates();

  const { headers, rows } = mapEstimatesToRows(estimates);

  if (
    estimatesLoadingState !== 'finished' ||
    subscriptionLoadingState !== 'finished'
  )
    return <TableSkeleton />;

  return (
    <>
      {/* {subscription?.status === 'active' ? ( */}
      {subscription ? (
        <Table
          isLoading={'finished'}
          headers={headers}
          rows={rows}
          additionalStyles={[styles.totalWrapper]}
        />
      ) : (
        <div css={containers.medium}>
          <Alert>
            Unlock the full potential of our platform by ensuring your
            subscription is active. Only then can you view subscription
            estimates.
          </Alert>
        </div>
      )}
    </>
  );
};
