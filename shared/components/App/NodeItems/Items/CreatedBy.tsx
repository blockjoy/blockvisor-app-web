import { useRecoilValue } from 'recoil';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { nodeSelectors } from '@modules/node';
import { display } from 'styles/utils.display.styles';

type Props = Partial<Pick<Node, 'createdBy'>>;

export const CreatedBy = ({ createdBy }: Props) => {
  const nodesCreatedBy = useRecoilValue(nodeSelectors.nodesCreatedBy);

  const createdByUser = nodesCreatedBy.find(
    (user) => user.userId === createdBy?.resourceId,
  );

  return <span css={display.ellipsis}>{createdByUser?.name ?? 'Unknown'}</span>;
};
