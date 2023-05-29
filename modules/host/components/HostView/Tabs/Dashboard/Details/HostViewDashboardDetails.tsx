import { DetailsTable, DetailsWrapper } from '@shared/components';
import { useHostView, mapHostToDashboardDetails } from '@modules/host';
import { ROUTES } from '@shared/index';

export const HostViewDashboardDetails = () => {
  const { host } = useHostView();

  const details = mapHostToDashboardDetails(host!);

  const linkHref = `${ROUTES.HOST(host?.id!)}/details`;

  return (
    <DetailsWrapper title="Details" href={linkHref}>
      <DetailsTable bodyElements={details} />
    </DetailsWrapper>
  );
};
