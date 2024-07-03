import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { ROUTES, formatters } from '@shared/index';
import {
  BackButton,
  Badge,
  EmptyColumn,
  PageHeader,
  PageSection,
  PageTitle,
  Skeleton,
  SkeletonGrid,
  TableSkeleton,
  SvgIcon,
} from '@shared/components';
import {
  InvoiceDownload,
  InvoiceLineItems,
  getInvoiceStatusColor,
  getInvoiceStatusText,
  billingSelectors,
  billingAtoms,
  InvoiceTotal,
} from '@modules/billing';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './InvoiceView.styles';
import IconCalendar from '@public/assets/icons/common/Calendar.svg';
import IconBilling from '@public/assets/icons/common/Billing.svg';

export const InvoiceView = () => {
  const router = useRouter();
  const { id } = router.query;

  const invoicesLoadingState = useRecoilValue(
    billingAtoms.invoicesLoadingState,
  );
  const invoice = useRecoilValue(billingSelectors.invoice(id as string));

  const handleBillingClicked = () => {
    router.push(
      {
        pathname: ROUTES.BILLING,
        query: {
          tab: 4,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <>
      <PageTitle
        title="Billing"
        icon={<IconBilling />}
        onTitleClick={handleBillingClicked}
        isLoading={true}
        childTitle={invoice?.id ? `Invoice (${invoice?.id})` : undefined}
      />
      <PageSection bottomBorder={false} topPadding={false}>
        <div css={spacing.top.medium}>
          <PageHeader>
            <BackButton
              backUrl={`${ROUTES.BILLING}/subscription?tab=invoices`}
            />
          </PageHeader>
        </div>
        <div css={spacing.top.medium}>
          {invoicesLoadingState === 'finished' ? (
            <>
              {invoice ? (
                <>
                  <div css={styles.headerWrapper}>
                    <div css={styles.header}>
                      <h2 css={styles.headline}>
                        <span>
                          Invoice #<b>{`${invoice.id}`}</b>
                        </span>
                        <Badge
                          color={getInvoiceStatusColor(invoice.status)}
                          style="outline"
                        >
                          {getInvoiceStatusText(invoice.status)}
                        </Badge>
                      </h2>
                      {invoice?.created && (
                        <div css={styles.info}>
                          <SvgIcon size="10px" isDefaultColor>
                            <IconCalendar />
                          </SvgIcon>
                          <span>
                            {formatters.formatTimestamp(invoice?.created)}
                          </span>
                        </div>
                      )}
                    </div>
                    <InvoiceDownload invoicePdf={invoice.invoice_pdf} />
                  </div>
                  {invoice?.customer_address && (
                    <div css={styles.sectionWrapper}>
                      <h3 css={styles.subheadline}>Billed to</h3>
                      <div css={styles.address}>
                        <span>{invoice.customer_name}</span>
                        <span>
                          {`${invoice.customer_address.line1}${
                            invoice.customer_address.line2
                              ? ` ${invoice.customer_address.line2}`
                              : ''
                          }`}
                        </span>
                        <span>
                          {`${invoice.customer_address.city}${
                            invoice.customer_address.state
                              ? ` ${invoice.customer_address.state}`
                              : ''
                          }${
                            invoice.customer_address.postal_code
                              ? ` ${invoice.customer_address.postal_code}`
                              : ''
                          }${
                            invoice.customer_address.country
                              ? ` ${invoice.customer_address.country}`
                              : ''
                          }`}
                        </span>
                      </div>
                    </div>
                  )}
                  {invoice.lines && invoice?.total !== undefined && (
                    <>
                      <div css={styles.sectionWrapper}>
                        <h3 css={styles.subheadline}>Details</h3>
                        <InvoiceLineItems items={invoice.lines.data} />
                        <div css={styles.total}>
                          <InvoiceTotal
                            total={invoice.total}
                            subtotal={invoice.subtotal}
                            amountDue={invoice.amount_due}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <EmptyColumn
                  title="Invoice Not Found"
                  description="No invoice exists with this ID"
                />
              )}
            </>
          ) : (
            <>
              <SkeletonGrid padding="10px 0 70px">
                <Skeleton width="260px" />
                <Skeleton width="180px" />
              </SkeletonGrid>
              <TableSkeleton />
            </>
          )}
        </div>
      </PageSection>
    </>
  );
};
