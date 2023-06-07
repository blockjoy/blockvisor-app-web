import { useNodeView } from '@modules/node';
import { FormHeaderCaps } from '@shared/components';
import { mapNodeToDashboardDetails } from '@modules/node/utils/mapNodeToDashboardDetails';
import { DetailsTable } from '@shared/components';
import { ROUTES } from '@shared/constants/routes';

export const NodeViewDashboardDetails = () => {
  const { node } = useNodeView();

  return (
    <>
      <FormHeaderCaps
        noBottomMargin
        viewAllLink={`${ROUTES.NODE(node!.id)}/details`}
      >
        Details
      </FormHeaderCaps>
      <DetailsTable bodyElements={mapNodeToDashboardDetails(node!)} />
    </>
  );
};
