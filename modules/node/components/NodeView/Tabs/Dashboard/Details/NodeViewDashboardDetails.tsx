import { useNodeView, NodeFormHeader } from '@modules/node';
import { mapNodeToDashboardDetails } from '@modules/node/utils/mapNodeToDashboardDetails';
import { DetailsTable } from '@shared/components';

export const NodeViewDashboardDetails = () => {
  const { node } = useNodeView();

  return (
    <>
      <NodeFormHeader>Details</NodeFormHeader>
      <DetailsTable bodyElements={mapNodeToDashboardDetails(node!)} />
    </>
  );
};
