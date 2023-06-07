import {
  BackButton,
  DetailsView,
  EmptyColumn,
  PageHeader,
  PageSection,
  PageTitle,
  ROUTES,
  Skeleton,
  SkeletonGrid,
  TableSkeleton,
  formatters,
} from '@shared/index';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './InvoiceView.styles';
import IconCalendar from '@public/assets/icons/calendar-12.svg';

import {
  BillingAddressPreview,
  InvoiceDownload,
  Services,
  useInvoices,
} from '@modules/billing';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const InvoiceView = () => {
  const { invoice, getInvoice, invoiceLoadingState, unloadInvoice } =
    useInvoices();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (router.isReady) {
      getInvoice(id);
    }

    return () => unloadInvoice();
  }, [router.isReady]);

  return (
    <>
      <PageTitle title="Invoice" />
      <PageSection bottomBorder={false} topPadding={false}>
        <div css={spacing.top.medium}>
          <PageHeader>
            <BackButton backUrl={`${ROUTES.BILLING}?tab=4`} />
          </PageHeader>
        </div>
        <div css={spacing.top.medium}>
          {invoiceLoadingState === 'finished' ? (
            <>
              {invoice ? (
                <>
                  <div css={styles.headerWrapper}>
                    <div css={styles.header}>
                      <h2 css={styles.headline}>
                        Invoice <b>{`${invoice.id}`}</b>
                      </h2>
                      <div css={styles.info}>
                        <IconCalendar />
                        <span>{formatters.formatDate(invoice.date)}</span>
                      </div>
                    </div>
                    <InvoiceDownload invoice={invoice} />
                  </div>
                  <div css={styles.details}>
                    <DetailsView headline="Invoice recepient">
                      <BillingAddressPreview
                        billingAddress={invoice.billing_address}
                      />
                    </DetailsView>
                    <DetailsView headline="Services">
                      <Services
                        services={invoice.line_items}
                        total={invoice.total}
                      />
                    </DetailsView>
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
