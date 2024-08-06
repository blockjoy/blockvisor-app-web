import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { COUNTRIES, ROUTES } from '@shared/index';
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
  DateTime,
  Heading,
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
  const invoice = useRecoilValue(billingSelectors.invoiceById(id as string));
  const billingAddress = useRecoilValue(billingAtoms.billingAddress);

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
        childTitle={
          invoice?.number ? `Invoice (${invoice?.number})` : undefined
        }
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
                          Invoice #<b>{`${invoice.number}`}</b>
                        </span>
                        <Badge
                          color={getInvoiceStatusColor(invoice.status)}
                          style="outline"
                        >
                          {getInvoiceStatusText(invoice.status)}
                        </Badge>
                      </h2>
                      {invoice?.createdAt && (
                        <div css={styles.info}>
                          <SvgIcon size="10px" isDefaultColor>
                            <IconCalendar />
                          </SvgIcon>
                          <DateTime date={invoice.createdAt!} />
                        </div>
                      )}
                    </div>
                    {invoice.pdfUrl && (
                      <InvoiceDownload invoicePdf={invoice.pdfUrl} />
                    )}
                  </div>
                  {billingAddress && (
                    <div css={styles.sectionWrapper}>
                      <Heading>Billed to</Heading>
                      <div css={styles.address}>
                        <span>
                          {`${billingAddress.line1}${
                            billingAddress.line2
                              ? ` ${billingAddress.line2}`
                              : ''
                          }`}
                        </span>
                        <span>
                          {`${billingAddress.city}${
                            billingAddress.state
                              ? ` ${billingAddress.state}`
                              : ''
                          }${
                            billingAddress.postalCode
                              ? ` ${billingAddress.postalCode}`
                              : ''
                          }${
                            billingAddress.country
                              ? ` ${COUNTRIES[billingAddress.country]}`
                              : ''
                          }`}
                        </span>
                      </div>
                    </div>
                  )}
                  <div css={styles.sectionWrapper}>
                    <Heading>Details</Heading>
                    {invoice.lineItems && (
                      <InvoiceLineItems items={invoice.lineItems} />
                    )}
                    {invoice.total && invoice.subtotal && (
                      <div css={styles.total}>
                        <InvoiceTotal
                          total={invoice.total}
                          subtotal={invoice.subtotal}
                          discounts={invoice.discounts}
                        />
                      </div>
                    )}
                  </div>
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
