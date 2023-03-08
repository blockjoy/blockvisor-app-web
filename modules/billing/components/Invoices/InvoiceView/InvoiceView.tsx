import {
  BackButton,
  PageHeader,
  PageSection,
  PageTitle,
  ROUTES,
} from '@shared/index';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './InvoiceView.styles';
import IconCalendar from '@public/assets/icons/calendar-12.svg';
import { DetailsView } from '@shared/components/DetailsView/DetailsView';
import { BillingPreview, InvoiceDownload, Services } from '@modules/billing';
import { INVOICES } from '@modules/billing/mocks/invoices';
import { BILLING_ADDRESS } from '@modules/billing/mocks/billingAddress';

export const InvoiceView = () => {
  const invoice = INVOICES[0];

  return (
    <>
      <PageTitle title="Invoice" hasOrgPicker />
      <PageSection bottomBorder={false} topPadding={false}>
        <div css={spacing.top.medium}>
          <PageHeader>
            <BackButton backUrl={`${ROUTES.BILLING}?tab=4`} />
          </PageHeader>
        </div>
        <div css={styles.header}>
          <div>
            <h2 css={styles.headline}>
              {`Invoice ${invoice.id}/${new Date().getFullYear()}`}
            </h2>
            <div css={styles.info}>
              <IconCalendar />
              <span>{new Date(invoice.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <InvoiceDownload invoice={invoice} />
        </div>
        <div>
          <DetailsView headline="Invoice recepient">
            <BillingPreview billingAddress={BILLING_ADDRESS} />
          </DetailsView>
          <DetailsView headline="Services">
            <Services services={invoice.services} />
          </DetailsView>
        </div>
      </PageSection>
    </>
  );
};
