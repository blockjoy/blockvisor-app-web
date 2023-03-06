import {
  BackButton,
  PageHeader,
  PageSection,
  PageTitle,
  ROUTES,
} from '@shared/index';
import { spacing } from 'styles/utils.spacing.styles';

export const InvoiceView = () => {
  return (
    <>
      <PageTitle title="Invoice" hasOrgPicker />
      <PageSection bottomBorder={false} topPadding={false}>
        <div css={spacing.top.medium}>
          <PageHeader>
            <BackButton backUrl={`${ROUTES.BILLING}?tab=4`} />
          </PageHeader>
        </div>
      </PageSection>
    </>
  );
};
