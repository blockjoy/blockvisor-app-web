import { DetailsTable, FormHeaderCaps } from '@shared/components';
import { useHostView, mapHostToDashboardDetails } from '@modules/host';
import { ROUTES } from '@shared/index';

export const HostViewDashboardDetails = () => {
  const { host } = useHostView();

  const details = mapHostToDashboardDetails(host!);

  const viewAllLink = `${ROUTES.HOST(host?.id!)}/details`;

  return (
    <section>
      <FormHeaderCaps noBottomMargin viewAllLink={viewAllLink}>
        Details
      </FormHeaderCaps>
      <DetailsTable bodyElements={details} />
    </section>
  );
};
