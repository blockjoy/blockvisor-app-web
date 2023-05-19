import { useNodeView } from '@modules/node';
import { FormHeaderCaps } from '@shared/components';
import { mapNodeToDashboardDetails } from '@modules/node/utils/mapNodeToDashboardDetails';
import { DetailsTable } from '@shared/components';

export const NodeViewDashboardDetails = () => {
  const { node } = useNodeView();

  return (
    <>
      <FormHeaderCaps>Details</FormHeaderCaps>
      <DetailsTable bodyElements={mapNodeToDashboardDetails(node!)} />
    </>
  );
};
