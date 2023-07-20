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
  SvgIcon,
} from '@shared/index';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './InvoiceView.styles';
import IconCalendar from '@public/assets/icons/common/Calendar.svg';
import IconBilling from '@public/assets/icons/common/Billing.svg';
import {
  InvoiceDownload,
  InvoiceInfo,
  Services,
  useInvoice,
} from '@modules/billing';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const InvoiceView = () => {
  const router = useRouter();
  const { id } = router.query;

  const { invoice, getInvoice, invoiceLoadingState, unloadInvoice } =
    useInvoice();

  useEffect(() => {
    if (router.isReady) {
      getInvoice(id as string);
    }

    return () => unloadInvoice();
  }, [router.isReady]);

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
        childTitle={invoice?.id ? `Invoice (#${invoice?.id})` : undefined}
      />
      <PageSection bottomBorder={false} topPadding={false}>
        <div css={spacing.top.medium}>
          <PageHeader>
            <BackButton backUrl={`${ROUTES.BILLING}/?tab=4`} />
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
                        Invoice #<b>{`${invoice.id}`}</b>
                      </h2>
                      {invoice?.date && (
                        <div css={styles.info}>
                          <SvgIcon size="10px" isDefaultColor>
                            <IconCalendar />
                          </SvgIcon>
                          <span>{formatters.formatDate(invoice?.date)}</span>
                        </div>
                      )}
                    </div>
                    <InvoiceDownload invoice={invoice} />
                  </div>
                  <div css={styles.details}>
                    <DetailsView headline="Invoice info">
                      <InvoiceInfo invoice={invoice} />
                    </DetailsView>
                    <DetailsView headline="Services">
                      {invoice?.line_items && invoice?.total !== undefined && (
                        <Services
                          services={invoice.line_items}
                          total={invoice.total}
                        />
                      )}
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
