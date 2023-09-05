import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  DropdownMenu,
  DropdownButton,
  DropdownItem,
  Scrollbar,
  DropdownWrapper,
} from '@shared/components';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { styles } from './BillingPeriodSelect.styles';
import { BILLING_PERIOD, billingSelectors } from '@modules/billing';

type BillingPeriodSelectProps = {
  value: string;
  onChange: (billingPeriod: BillingPeriod) => void;
};

export const BillingPeriodSelect = ({
  value,
  onChange,
}: BillingPeriodSelectProps) => {
  const subscription = useRecoilValue(billingSelectors.subscription);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => setIsOpen(!isOpen);
  const handleChange = (billingPeriod: BillingPeriod) => {
    onChange(billingPeriod);
    setIsOpen(false);
  };

  const activePeriod = BILLING_PERIOD.find(
    (billingPeriod: BillingPeriod) => billingPeriod.id === value,
  );

  return (
    <DropdownWrapper
      isEmpty={true}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      noBottomMargin
    >
      <DropdownButton
        text={<p>{activePeriod?.title}</p>}
        onClick={handleClick}
        isOpen={isOpen}
        disabled={
          subscription?.billing_period_unit === 'year' ||
          subscription?.status !== 'active'
        }
      />
      <DropdownMenu isOpen={isOpen} additionalStyles={styles.dropdown}>
        <Scrollbar additionalStyles={[styles.dropdownInner]}>
          <ul>
            {BILLING_PERIOD?.map((billingPeriod: BillingPeriod) => (
              <li key={billingPeriod?.id}>
                <DropdownItem
                  size="medium"
                  type="button"
                  onButtonClick={() => handleChange(billingPeriod)}
                >
                  <p css={styles.active}>{escapeHtml(billingPeriod?.title!)}</p>
                </DropdownItem>
              </li>
            ))}
          </ul>
        </Scrollbar>
      </DropdownMenu>
    </DropdownWrapper>
  );
};
