import { useNodeView } from '@modules/node/hooks/useNodeView';
import { mapNodeToDashboardDetails } from '@modules/node/utils/mapNodeToDashboardDetails';
import { DetailsTable } from '@shared/components';
import { NodeViewFormHeader } from '../../../NodeViewFormHeader';

export const NodeViewDashboardDetails = () => {
  const { node } = useNodeView();

  return (
    <>
      <NodeViewFormHeader>Details</NodeViewFormHeader>
      <DetailsTable bodyElements={mapNodeToDashboardDetails(node!)} />
    </>
  );
};
