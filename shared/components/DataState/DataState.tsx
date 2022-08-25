import { FC } from "react"
import { StateIcon } from "../StateIcon/StateIcon";
import { styles } from "./DataState.styles"

export interface Props {
    status: HostState | NodeState;
}

export const DataState: FC<Props> = ({status}) => {
    return (<div css={styles.base}>
    <StateIcon {status} />
    {status}
</div>)
}