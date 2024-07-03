import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Dropdown } from '@shared/components';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { styles } from './BillingPeriodSelect.styles';
import { BILLING_PERIOD, billingSelectors } from '@modules/billing';

type BillingPeriodSelectProps = {
  value: string;
  onChange: (billingPeriod: BillingPeriod) => void;
  disabled?: boolean;
};

export const BillingPeriodSelect = ({
  value,
  onChange,
  disabled = false,
}: BillingPeriodSelectProps) => {
  const subscription = useRecoilValue(billingSelectors.subscription);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const activePeriod =
    BILLING_PERIOD.find(
      (billingPeriod: BillingPeriod) => billingPeriod.id === value,
    ) ?? BILLING_PERIOD[0];

  const handleOpen = (open: boolean = true) => setIsOpen(open);
  const handleSelect = (billingPeriod: BillingPeriod | null) => {
    if (billingPeriod) onChange(billingPeriod);
    setIsOpen(false);
  };

  const renderItem = (billingPeriod: BillingPeriod) => {
    return <p css={styles.dropdownItem}>{escapeHtml(billingPeriod?.name!)}</p>;
  };

  return (
    <Dropdown
      items={BILLING_PERIOD}
      isOpen={isOpen}
      handleOpen={handleOpen}
      selectedItem={activePeriod}
      handleSelected={handleSelect}
      renderItem={renderItem}
      disabled={disabled}
      noBottomMargin
    />
  );
};
