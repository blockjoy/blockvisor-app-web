import { useEffect } from 'react';
import { Skeleton } from '@shared/components';
import { useWalletPayments } from '@modules/billing';
import { styles } from './WalletPayments.styles';

export const WalletPayments = () => {
  const {
    initApplePay,
    initGooglePay,
    applePayLoadingState,
    googlePayLoadingState,
  } = useWalletPayments();

  useEffect(() => {
    initApplePay();
    initGooglePay();
  }, []);

  const isLoading =
    applePayLoadingState !== 'finished' || googlePayLoadingState !== 'finished';

  return (
    <div css={styles.wrapper}>
      {isLoading && <Skeleton width="160px" height="40px" />}

      <div css={styles.container} id="gpay-button"></div>
      <div css={styles.container} id="apple-pay-button"></div>
    </div>
  );
};
