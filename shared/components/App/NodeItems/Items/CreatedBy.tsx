import { SerializableParam, useRecoilValue } from 'recoil';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { nodeSelectors } from '@modules/node';
import { display } from 'styles/utils.display.styles';

type Props = Partial<
  Pick<Node, 'createdBy' | 'hostId' | 'hostDisplayName' | 'hostNetworkName'>
>;

export const CreatedBy = ({
  createdBy,
  hostId,
  hostDisplayName,
  hostNetworkName,
}: Props) => {
  const createdBySerializedParam: Readonly<SerializableParam> =
    JSON.stringify(createdBy);

  const nodeCreatedBy = useRecoilValue(
    nodeSelectors.nodeCreatedBy({
      createdBySerializedParam,
      hostId,
      hostDisplayName,
      hostNetworkName,
    }),
  );

  return <span css={display.ellipsis}>{nodeCreatedBy ?? 'Unknown'}</span>;
};
